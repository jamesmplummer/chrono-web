import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren
} from 'react';
import type { Activity, FormattedActivities } from '../types/activity';
import { startOfMonth, endOfMonth } from 'date-fns';
import { DerivedActivities } from '../utils/activity';
import {
  applyTZOffset,
  getYearMonthDayArray,
  buildLocalDatetime,
  getDatesInMonth
} from '../utils/date';
import { useDateSelect } from '../hooks/useDateSelect';
import { useQuery } from '../hooks/useQuery';
import type {
  PostActivityPayload,
  PatchActivityParams,
  PatchActivityPayload,
  DeleteActivityParams
} from '../api/activity';
import { useSetUserContext, useUserContext } from './UserContext';

type ActivityContextType = FormattedActivities | undefined;

type ActivityDateContextType = {
  date: Date;
  datesInMonth: Date[];
  onChange: (date: Date) => void;
};

const defaultActivityDateContext = {
  date: new Date(),
  datesInMonth: [],
  onChange: () => {}
};

type ActivityDataContextType = {
  loading: boolean;
  error?: Error;
  getActivities: (date: Date) => Promise<void>;
};

const defaultActivityDataContext = {
  loading: false,
  error: undefined,
  getActivities: () => Promise.resolve()
};

type ActivityMutationContextType = {
  createActivity: (payload: PostActivityPayload) => void;
  updateActivity: (
    params: PatchActivityParams,
    payload: PatchActivityPayload
  ) => void;
  deleteActivity: (params: DeleteActivityParams) => void;
};

const defaultActivityMutationContext = {
  createActivity: () => {},
  updateActivity: () => {},
  deleteActivity: () => {}
};

const ActivityContext = createContext<ActivityContextType>(undefined);
const ActivityDateContext = createContext<ActivityDateContextType>(
  defaultActivityDateContext
);
const ActivityDataContext = createContext<ActivityDataContextType>(
  defaultActivityDataContext
);

const ActivityMutationContext = createContext<ActivityMutationContextType>(
  defaultActivityMutationContext
);

export function useActivityContext() {
  return useContext(ActivityContext);
}

export function useActivityDateContext() {
  return useContext(ActivityDateContext);
}

export function useActivityDataContext() {
  return useContext(ActivityDataContext);
}

export function useActivityMutationContext() {
  return useContext(ActivityMutationContext);
}

export function ActivityProvider(props: PropsWithChildren) {
  const user = useUserContext();
  const { updateUserActivityColor } = useSetUserContext();
  const [derivedActivities, setDerivedActivities] =
    useState<DerivedActivities>();

  const { date, onChange } = useDateSelect();

  const dates = useMemo(() => {
    return getDatesInMonth(date).dates;
  }, [date]);

  const getActivitiesQuery = useCallback(
    async (date: Date) => {
      if (!user) return;

      const rawDate = new Date(date.getFullYear(), date.getMonth());
      const startDate = applyTZOffset(startOfMonth(rawDate));
      const endDate = applyTZOffset(endOfMonth(rawDate));

      const rawStart = getYearMonthDayArray(startDate);
      const rawEnd = getYearMonthDayArray(endDate);

      const start = new Date(buildLocalDatetime(...rawStart)).toISOString();
      const end = new Date(
        buildLocalDatetime(...rawEnd, '23:59:59.999')
      ).toISOString();

      const query = { start, end };
      const activities = await mockGetActivities(query);

      setDerivedActivities(new DerivedActivities(dates, activities, user));
    },
    [dates]
  );

  const [getActivities, { loading, error }] = useQuery(getActivitiesQuery);

  const createActivity = useCallback(
    (payload: PostActivityPayload) => {
      if (!derivedActivities) return;
      const tempId = `temp-${payload.start}${payload.end}`;
      derivedActivities.create(tempId, payload);
      updateUserActivityColor(payload.title, payload.color);

      // todo: api call
      // todo: error rollback behavior
    },
    [derivedActivities]
  );

  const updateActivity = useCallback(
    (params: PatchActivityParams, payload: PatchActivityPayload) => {
      if (!derivedActivities) return;
      derivedActivities.update(params, payload);
      updateUserActivityColor(payload.title, payload.color);

      // todo: api call
      // todo: error rollback behavior
    },
    [derivedActivities]
  );

  const deleteActivity = useCallback(
    (params: DeleteActivityParams) => {
      if (!derivedActivities) return;
      derivedActivities.delete(params);

      // todo: api call
      // todo: error rollback behavior
    },
    [derivedActivities]
  );

  useEffect(() => {
    getActivities(date);
  }, [date]);

  const activityContext = useMemo(() => {
    return derivedActivities?.activities;
  }, [derivedActivities]);

  const activityDateContext = useMemo(() => {
    return {
      date,
      datesInMonth: dates,
      onChange
    };
  }, [date, dates, onChange]);

  const activityDataContext = useMemo(() => {
    return {
      loading,
      error,
      getActivities
    };
  }, [loading, error, getActivities]);

  const activityMutationContext = useMemo(() => {
    return {
      createActivity,
      updateActivity,
      deleteActivity
    };
  }, [createActivity, updateActivity, deleteActivity]);

  return (
    <ActivityContext value={activityContext}>
      <ActivityDateContext value={activityDateContext}>
        <ActivityDataContext value={activityDataContext}>
          <ActivityMutationContext value={activityMutationContext}>
            {props.children}
          </ActivityMutationContext>
        </ActivityDataContext>
      </ActivityDateContext>
    </ActivityContext>
  );
}

function mockGetActivities({
  start,
  end: _end
}: {
  start: string;
  end: string;
}): Promise<Activity[]> {
  const startDate = new Date(start);
  if (startDate.getMonth() !== 6) return Promise.resolve([]);
  return Promise.resolve([
    {
      id: '1',
      title: 'Exercise',
      variant: 'Exercise',
      group: 'exercise',
      notes: undefined,
      start: '2026-07-01T12:00:00.000',
      end: '2026-07-01T15:00:00.000',
      timezone: 0,
      createdAt: '2020-08-01T17:12:43.957Z',
      user: '5f25a17b81fad94430820f38',
      v: 0,
      exercise: [
        {
          variant: 'Cardio',
          title: 'running',
          duration: 360 * 5,
          distance: 5000,
          splits: [
            {
              idx: 0,
              distance: 1000,
              duration: 360
            }
          ]
        },
        {
          variant: 'Mobility',
          title: 'stretching',
          sets: []
        },
        {
          variant: 'Strength',
          title: 'bench press',
          sets: [
            {
              idx: 0,
              reps: 10,
              weight: 50,
              rest: undefined,
              duration: undefined
            },
            {
              idx: 1,
              reps: 10,
              weight: 50,
              rest: undefined,
              duration: undefined
            },
            {
              idx: 2,
              reps: 10,
              weight: 50,
              rest: undefined,
              duration: undefined
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'work',
      variant: 'Default',
      group: 'work',
      notes: undefined,
      start: '2026-07-01T03:00:00.000',
      end: '2026-07-01T12:00:00.000',
      timezone: 0,
      createdAt: '2020-08-01T17:12:43.957Z',
      user: '5f25a17b81fad94430820f38',
      v: 0
    }
  ]);
}
