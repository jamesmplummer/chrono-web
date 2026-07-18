import { add, sub, format } from 'date-fns';
import { useRef, type PropsWithChildren } from 'react';
import { useDetectClickOutside } from '../../hooks/useDetectClickOutside';
import { useModal } from '../../hooks/useModal';
import { DateIcon, LeftIcon, RightIcon } from '../icon/icons';
import { monthsInYear } from '../../utils/date';

export type InputMonthYearProps = {
  value: Date;
  onChange: (date: Date) => void;
};

export function InputMonthYear({ value, onChange }: InputMonthYearProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const { monthYearOpen, onMonthYearToggle } = useModal('monthYear');
  useDetectClickOutside([modalRef, modalButtonRef], onMonthYearToggle);

  function decrementYear() {
    onChange(sub(value, { years: 1 }));
  }

  function incrementYear() {
    onChange(add(value, { years: 1 }));
  }

  return (
    <div>
      <button
        ref={modalButtonRef}
        onClick={onMonthYearToggle}
        className='flex h-9 w-20 cursor-pointer items-center justify-center rounded-[4px] bg-gradient-to-r from-slate-700 to-slate-800 p-1.5 text-slate-200'
      >
        <DateIcon size='24px' />
        <div className='flex w-8 flex-col items-center'>
          <div className='font-mono text-[14px]/[14px]'>
            {format(value, 'MMM').toUpperCase()}
          </div>
          <div className='font-mono text-[10px]/[10px] font-light'>
            {format(value, 'yyyy')}
          </div>
        </div>
      </button>

      {monthYearOpen && (
        <div ref={modalRef} className='relative'>
          <div className='absolute top-0.5 right-0 z-20 flex w-[184px] flex-col bg-transparent'>
            <div className='flex h-9 w-full items-center justify-center rounded-t-[4px] bg-gradient-to-r from-slate-700 to-slate-800 text-slate-200'>
              <div className='flex w-full items-center justify-between p-2'>
                <ChangeYearButton onChange={decrementYear}>
                  <LeftIcon size='20px' />
                </ChangeYearButton>
                <span className='text-lg text-slate-200'>
                  {format(value, 'yyyy')}
                </span>
                <ChangeYearButton onChange={incrementYear}>
                  <RightIcon size='20px' />
                </ChangeYearButton>
              </div>
            </div>

            <ul className='flex flex-wrap content-start rounded-b-[4px] bg-white p-0.5 shadow-lg'>
              {monthsInYear.map((date) => {
                const month = date.getMonth();
                const selectedMonth = value.getMonth();
                const selected = month === selectedMonth;

                function onClick() {
                  onChange(new Date(value.setMonth(month)));
                  onMonthYearToggle();
                }

                return (
                  <li
                    role='button'
                    onClick={onClick}
                    key={month}
                    className={`${selected ? 'bg-slate-700 text-slate-100' : 'text-slate-500'} m-0.5 flex h-8 w-14 cursor-pointer items-center justify-center rounded-sm font-mono text-sm font-light`}
                  >
                    <span>{format(date, 'MMM').toUpperCase()}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

type ChangeMonthButtonProps = PropsWithChildren<{
  onChange: () => void;
}>;

function ChangeYearButton(props: ChangeMonthButtonProps) {
  return (
    <button
      onClick={props.onChange}
      className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm bg-slate-600/60'
    >
      {props.children}
    </button>
  );
}
