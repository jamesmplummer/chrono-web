import { add, differenceInDays, startOfDay } from 'date-fns';
import type {
  Activity,
  ActivityId,
  FormattedActivities,
  FormattedActivity
} from '../types/activity';
import type { DateId } from '../types/date';
import { getDateId, timeOfDayToPercentage } from './date';
import type {
  PatchActivityPayload,
  PostActivityPayload
} from '../api/activity';
import type { User } from '../types/user';

/**
  based on the timezone of the browser, split the activity at each instance of midnight

  do not modify the start and end
  add properties required by the client to display the activity
*/
export function formatActivity(activity: Activity, tzOffset: number = 0) {
  const output: FormattedActivity[] = [];

  const start = add(new Date(activity.start), { hours: tzOffset });
  const end = add(new Date(activity.end), { hours: tzOffset });

  const dateRange = differenceInDays(startOfDay(end), startOfDay(start));

  for (let i = 0; i <= dateRange; i++) {
    const newActivity: FormattedActivity = { ...activity } as any;
    const noRange = i === 0 && dateRange === 0;

    let startPercentage: number = 0;
    let endPercentage: number = 0;
    let isStart: boolean;
    let isEnd: boolean;

    switch (i) {
      // first day
      case 0: {
        startPercentage = timeOfDayToPercentage(start);
        endPercentage = noRange ? timeOfDayToPercentage(end) : 100;
        isStart = true;
        isEnd = noRange ? true : false;
        break;
      }
      // last day
      case dateRange: {
        startPercentage = 0;
        endPercentage = timeOfDayToPercentage(end);
        isStart = false;
        isEnd = true;
        break;
      }
      // other days
      default: {
        startPercentage = 0;
        endPercentage = 100;
        isStart = false;
        isEnd = false;
        break;
      }
    }

    newActivity.dateId = getDateId(add(start, { days: i }));
    newActivity.startPercentage = startPercentage;
    newActivity.endPercentage = endPercentage;
    newActivity.width = endPercentage - startPercentage;
    newActivity.style = {
      left: `${startPercentage}%`,
      width: `${newActivity.width}%`
    };
    newActivity.isStart = isStart;
    newActivity.isEnd = isEnd;

    output.push(newActivity);
  }

  return output;
}

export function formatActivities(dates: Date[], activities: Activity[] | null) {
  const structure: any = {};

  for (const date of dates) {
    structure[getDateId(date)] = {
      ids: [],
      items: {}
    };
  }

  for (const activity of activities ?? []) {
    const formattedActivity = formatActivity(activity);

    for (const item of formattedActivity) {
      if (!structure[item.dateId]) continue;
      structure[item.dateId].ids.push(item.id);
      structure[item.dateId].items[item.id] = item;
    }
  }

  return structure;
}

export class DerivedActivities {
  activities: FormattedActivities = {};
  #idToActivity: Record<ActivityId, Activity> = {};
  #idToDateId: Record<ActivityId, DateId[]> = {};
  #user: User;
  #v: number = 1;
  constructor(dates: Date[], activities: Activity[] | undefined, user: User) {
    this.create = this.create.bind(this);
    this.replaceTempIdWithId = this.replaceTempIdWithId.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);

    for (const date of dates) {
      this.activities[getDateId(date)] = {
        ids: [],
        items: {}
      };
    }

    for (const activity of activities ?? []) {
      this.#v = Math.max(this.#v, activity.v);
      this.#idToActivity[activity.id] = activity;
      this.#internal_create(activity);
    }

    this.#user = user;
  }

  create(tempId: string, activity: PostActivityPayload) {
    const data: Activity = {
      ...activity,
      id: tempId,
      createdAt: new Date().toISOString(),
      user: this.#user.id,
      v: this.#v
    };

    this.#internal_create(data, tempId);
  }

  update(id: ActivityId, activity: PatchActivityPayload) {
    const target = this.#idToActivity[id];
    const data: Activity = {
      ...target,
      ...activity
    };

    this.#internal_delete(id);
    this.#internal_create(data);
  }

  delete(id: ActivityId) {
    this.#internal_delete(id);
  }

  replaceTempIdWithId(id: string, tempId: string) {
    const dateIds = this.#idToDateId[tempId];
    if (!dateIds) return;

    for (const dateId of dateIds) {
      const hasTarget = this.activities[dateId].items[tempId] !== undefined;
      if (hasTarget) {
        this.activities[dateId].ids = this.activities[dateId].ids.filter(
          (id_: string) => id_ !== tempId
        );
        this.activities[dateId].ids.push(id);

        this.activities[dateId].items[id] =
          this.activities[dateId].items[tempId];
        delete this.activities[dateId].items[tempId];
        this.activities[dateId].items[id].id = id;

        this.activities[dateId].ids.sort((a: string, b: string) => {
          const itemA = this.activities[dateId].items[a];
          const itemB = this.activities[dateId].items[b];

          return itemA.startPercentage - itemB.startPercentage;
        });
      }
    }

    this.#idToDateId[id] = this.#idToDateId[tempId];
    delete this.#idToDateId[tempId];
    this.#idToActivity[id] = this.#idToActivity[tempId];
    delete this.#idToActivity[tempId];
  }

  #internal_create(activity: Activity, tempId?: string) {
    if (!activity.id && tempId) activity.id = tempId;
    const formattedActivity = formatActivity(activity);

    for (const part of formattedActivity) {
      if (!this.activities[part.dateId]) continue;
      const newActivityIds = [...this.activities[part.dateId].ids];
      newActivityIds.push(activity.id);

      this.activities[part.dateId].ids = newActivityIds;
      this.activities[part.dateId].items[activity.id] = part;
      this.#idToDateId[activity.id] ??= [];
      this.#idToDateId[activity.id].push(part.dateId);

      this.activities[part.dateId].ids.sort((a: string, b: string) => {
        const itemA = this.activities[part.dateId].items[a];
        const itemB = this.activities[part.dateId].items[b];

        return itemA.startPercentage - itemB.startPercentage;
      });
    }

    this.#idToActivity[activity.id] = activity;
  }

  #internal_delete(id: ActivityId) {
    const dateIds = this.#idToDateId[id];
    if (!dateIds) return;

    for (const dateId of dateIds) {
      const hasTarget = this.activities[dateId].items[id] !== undefined;
      if (hasTarget) {
        this.activities[dateId].ids = this.activities[dateId].ids.filter(
          (id_: string) => id_ !== id
        );
        delete this.activities[dateId].items[id];
      }
    }

    delete this.#idToDateId[id];
    delete this.#idToActivity[id];
  }
}
