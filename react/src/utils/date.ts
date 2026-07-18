import { eachHourOfInterval, sub } from 'date-fns';

function getTimeZoneOffset(date: Date) {
  return minutesToHoursAndMinutes(date.getTimezoneOffset());
}

export const monthsInYear = [
  new Date(2000, 0),
  new Date(2000, 1),
  new Date(2000, 2),
  new Date(2000, 3),
  new Date(2000, 4),
  new Date(2000, 5),
  new Date(2000, 6),
  new Date(2000, 7),
  new Date(2000, 8),
  new Date(2000, 9),
  new Date(2000, 10),
  new Date(2000, 11)
];

export const getDateId = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export function minutesToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return {
    hours,
    minutes: remainingMinutes
  };
}

export function applyTZOffset(date: Date) {
  const tzOffset = getTimeZoneOffset(date);
  return sub(date, { hours: tzOffset.hours, minutes: tzOffset.minutes });
}

export function getHoursInDay() {
  const startDate = new Date('2000-01-01T00:00:00.000');
  const endDate = new Date('2000-01-01T23:59:59.999');
  return eachHourOfInterval({ start: startDate, end: endDate });
}

export const millisecondsToHoursAndMinutes = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.round((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

  if (minutes === 60) return { hours: hours + 1, minutes: 0 };
  return { hours, minutes };
};
