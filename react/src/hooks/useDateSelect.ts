import { useCallback, useState } from 'react';

export function useDateSelect() {
  const now = new Date();
  const [date, setDate] = useState<Date>(now);

  const onChange = useCallback((date: Date) => {
    setDate(date);
  }, []);

  return {
    date,
    onChange
  };
}
