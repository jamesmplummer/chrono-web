import { useMemo } from 'react';
import { getDatesInMonth } from '../utils/date';

export function useDatesInMonth(date: Date) {
  return useMemo(() => {
    return getDatesInMonth(date);
  }, [date]);
}
