import {
  differenceInMilliseconds,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfMonth,
  startOfMonth,
  startOfYear,
  sub
} from 'date-fns';

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

export const timeOfDayToPercentage = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const totalSeconds = (hours * 60 + minutes) * 60 + seconds;
  const totalSecondsInDay = 24 * 60 * 60;

  const percentage = (totalSeconds / totalSecondsInDay) * 100;
  return percentage;
};

export const percentageToTimeOfDay = (percentage: number) => {
  const totalSecondsInDay = 24 * 60 * 60;
  const totalSeconds = Math.floor((percentage / 100) * totalSecondsInDay);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;

  const timeString = `T${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.000`;
  return timeString;
};

export function prefixZero(n: number) {
  if (n < 10 && n >= 0) {
    return `0${n}`;
  }
  return n.toString();
}

export function buildLocalDatetime(
  year: number,
  month: number,
  date: number,
  time: string = '00:00:00.000'
) {
  return new Date(
    `${year}-${prefixZero(month + 1)}-${prefixZero(date)}T${time}`
  );
}

export function getYearMonthDayArray(
  date: Date
): readonly [number, number, number] {
  return [date.getFullYear(), date.getMonth(), date.getDate()] as const;
}

export function getDatesInMonth(date: Date) {
  const month = startOfMonth(date);
  const year = startOfYear(date);

  const monthInt = month.getMonth();
  const yearInt = year.getFullYear();

  const start = startOfMonth(new Date(yearInt, monthInt));
  const end = endOfMonth(new Date(yearInt, monthInt));

  const dates = eachDayOfInterval({ start, end });

  return {
    start,
    end,
    dates
  };
}

export function getDurationText(start: string, end: string) {
  if (!start || !end) return '';

  const duration = differenceInMilliseconds(end, start);
  const { hours, minutes } = millisecondsToHoursAndMinutes(duration);

  const hStr = hours > 0 ? `${hours}h` : '';
  const mStr = minutes > 0 ? `${minutes}m` : '';

  return `[ Current Duration: ${hStr} ${mStr} ]`;
}

export function getTimezoneOffset() {
  return new Date().getTimezoneOffset();
}
