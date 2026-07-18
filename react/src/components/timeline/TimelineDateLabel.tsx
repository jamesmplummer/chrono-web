import { format } from 'date-fns';

export type TimelineDateLabelProps = {
  date: Date;
};

export function TimelineDateLabel(props: TimelineDateLabelProps) {
  return (
    <div className='mr-1 mb-0.5 flex h-6 w-6 justify-center rounded-sm border border-slate-200'>
      <div className='flex flex-col items-center justify-center font-mono text-slate-500'>
        <span className='my-px text-[7px]/[7px] leading-none font-light'>
          {format(props.date, 'E').toUpperCase()}
        </span>
        <span className='text-[10px]/[10px] leading-none font-bold'>
          {format(props.date, 'dd').toUpperCase()}
        </span>
      </div>
    </div>
  );
}
