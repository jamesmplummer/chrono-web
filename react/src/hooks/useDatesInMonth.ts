import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfYear
} from 'date-fns';
import { useMemo } from 'react';

export function useDatesInMonth(date: Date) {
  const month = startOfMonth(date);
  const year = startOfYear(date);

  const monthInt = month.getMonth();
  const yearInt = year.getFullYear();

  const start = useMemo(() => {
    return startOfMonth(new Date(yearInt, monthInt));
  }, [monthInt, yearInt]);

  const end = useMemo(() => {
    return endOfMonth(new Date(yearInt, monthInt));
  }, [monthInt, yearInt]);

  const dates = useMemo(() => {
    return eachDayOfInterval({ start, end });
  }, [start, end]);

  return {
    start,
    end,
    dates
  };
}
