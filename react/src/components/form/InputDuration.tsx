import { forwardRef, useMemo, useState } from 'react';

const ids = {
  hh: 'hh',
  mm: 'mm',
  ss: 'ss'
};

type Ids = typeof ids;

function leadingZero(n: string | number) {
  if (+n === 0) return `00`;
  if (+n < 10) return `0${+n}`;
  return `${+n}`;
}

function toHoursMinutesSeconds(v: number) {
  const h = leadingZero(Math.floor(v / 3600));
  const m = leadingZero(Math.floor((v % 3600) / 60));
  const s = leadingZero(Math.floor((v % 3600) % 60));

  return { h, m, s };
}

function toSeconds({ hh, mm, ss }: Record<keyof Ids, string | undefined>) {
  const h = hh ? +hh : 0;
  const m = mm ? +mm : 0;
  const s = ss ? +ss : 0;
  return h * 60 * 60 + m * 60 + s;
}

export type InputDurationProps = {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  required?: boolean;
};

export const InputDuration = forwardRef<HTMLInputElement, InputDurationProps>(
  (props, ref) => {
    const label = props.label || 'Time';
    const [value, setValue] = useState<number>(props.value);
    const [hh, mm, ss] = useMemo(() => {
      const { h, m, s } = toHoursMinutesSeconds(value ?? 0);
      return [h, m, s];
    }, [value]);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      const id = e.target.id as keyof typeof ids;
      const update = {
        hh,
        mm,
        ss
      };
      update[id] = e.target.value;
      const newValue = toSeconds(update);
      setValue(newValue);
      props.onChange(newValue);
    }

    return (
      <div className='flex items-center'>
        <label className='w-16 text-xs'>
          {label}
          {props.required ? '*' : ''}
        </label>
        <div className='flex h-[30px] items-center justify-center rounded-[3px] border border-slate-200 bg-white pr-2 pl-0.5 sm:h-[26px]'>
          <input
            id={ids.hh}
            ref={ref}
            value={hh}
            onChange={onChange}
            placeholder='--'
            className='h-6 w-5 rounded-[3px] border-transparent bg-transparent py-1 pl-1 text-right text-xs text-slate-700 placeholder:font-light placeholder:text-slate-400/70 focus:border-slate-500 focus:outline-none'
          />
          <span className='ml-px font-mono text-xs text-slate-300'>h</span>
          <input
            id={ids.mm}
            value={mm}
            onChange={onChange}
            placeholder='--'
            className='h-6 w-5 rounded-[3px] border-transparent bg-transparent py-1 pl-1 text-right text-xs text-slate-700 placeholder:font-light placeholder:text-slate-400/70 focus:border-slate-500 focus:outline-none'
          />
          <span className='ml-px font-mono text-xs text-slate-300'>m</span>
          <input
            id={ids.ss}
            value={ss}
            onChange={onChange}
            placeholder='--'
            className='h-6 w-5 rounded-[3px] border-transparent bg-transparent py-1 pl-1 text-right text-xs text-slate-700 placeholder:font-light placeholder:text-slate-400/70 focus:border-slate-500 focus:outline-none'
          />
          <span className='ml-px font-mono text-xs text-slate-300'>s</span>
        </div>
      </div>
    );
  }
);
