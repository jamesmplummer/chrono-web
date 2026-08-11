import { startOfMonth, endOfMonth } from 'date-fns';
import { useState, useEffect, useMemo } from 'react';
import type { Activity } from '../../types/activity';
import { DerivedActivities } from '../../utils/activity';
import {
  applyTZOffset,
  getYearMonthDayArray,
  buildLocalDatetime,
  getDatesInMonth
} from '../../utils/date';

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

export function useActivityData(date: Date) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [activities, setActivities] = useState<Activity[]>();

  async function getActivities(date: Date) {
    setLoading(true);
    setError(undefined);

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

    setActivities(activities);
    setLoading(false);
    setError(undefined);
  }

  useEffect(() => {
    getActivities(date);
  }, [date]);

  const derivedActivities = useMemo(() => {
    const { dates } = getDatesInMonth(date);

    if (!activities) return;
    const derrivedActivities = new DerivedActivities(dates, activities);
    return derrivedActivities;
  }, [activities]);

  return {
    loading,
    error,
    activities: derivedActivities?.activities,
    getActivities
  };
}
