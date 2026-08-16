import { useMemo } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import type { FormattedActivities } from '../../types/activity';
import { DEFAULT_COLOR } from '../../types/style';
import { ObjectKeys } from '../../utils/common';
import { getDatesInMonth, buildLocalDatetime } from '../../utils/date';

export function useActivityKey(date: Date, activities?: FormattedActivities) {
  const user = useUserContext();
  const { start, end } = getDatesInMonth(date);

  return useMemo(() => {
    if (!activities || !user) return {};

    const key: Record<string, [number, string]> = {};
    const seenIds: Record<string, boolean> = {};

    const localStart = buildLocalDatetime(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
      '00:00:00.000'
    ).getTime();
    const localEnd = buildLocalDatetime(
      end.getFullYear(),
      end.getMonth(),
      end.getDate(),
      '23:59:59.999'
    ).getTime();

    for (const date of ObjectKeys(activities)) {
      for (const id of activities?.[date]?.ids ?? []) {
        const activity = activities[date]?.items[id];
        if (!activity) continue;
        if (seenIds[activity.id]) continue;

        let start = new Date(activity.start).getTime();
        let end = new Date(activity.end).getTime();

        start = start < localStart ? localStart : start;
        end = end > localEnd ? localEnd : end;

        const duration = end - start;

        key[activity.title] = [
          duration + (key[activity.title]?.[0] ?? 0),
          user.activities?.[activity.title] ?? DEFAULT_COLOR
        ];
        seenIds[activity.id] = true;
      }
    }

    return key;
  }, [activities, date, user]);
}
