import { format } from 'date-fns';
import { getHoursInDay } from '../../utils/date';

export function TimelineHeaderRow() {
  const hoursInDay = getHoursInDay();
  return (
    <div className='flex cursor-default'>
      <div className='mr-1 h-6 w-6 bg-white' />
      <ul className='mb-px flex w-[calc(100%_-_1.5rem)]'>
        {hoursInDay.map((hour) => {
          const hh = +format(hour, 'HH');
          const multipleOfFour = hh % 4 === 0;
          return (
            <li
              key={hh}
              className={`${!multipleOfFour ? 'border-l-0 sm:border-l' : 'border-l'} h-5 w-[4.166666666666667%] max-w-[4.166666666666667%] border-slate-300 bg-white font-mono text-xs font-light text-slate-400`}
            >
              <div
                className={`${!multipleOfFour ? 'hidden sm:flex' : 'flex'} -translate-x-1/2 justify-center bg-white`}
              >
                {format(hour, 'HHmm')}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
