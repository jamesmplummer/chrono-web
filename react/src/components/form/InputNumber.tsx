import { forwardRef } from 'react';

export type InputNumberProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  id?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  suffix?: string;
};

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (props, ref) => {
    const id =
      props.id ?? `${props.label.toLowerCase().replace(' ', '-')}-input`;

    return (
      <div className='flex items-center'>
        <label htmlFor={id} className='w-16 text-xs'>
          {props.label}
          {props.required ? '*' : ''}
        </label>
        <input
          id={id}
          ref={ref}
          aria-labelledby={id}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value ? props.value.toString() : ''}
          className='h-7 w-10 rounded-[3px] border border-slate-200 bg-white px-1.5 py-1 text-xs text-slate-700 placeholder:font-light placeholder:text-slate-400/70 focus:border-slate-500 focus:outline-none sm:h-6'
        />
        {props.suffix && (
          <span className='ml-1 text-xs font-light text-slate-300 sm:ml-0.5 sm:text-[10px]'>
            {props.suffix}
          </span>
        )}
      </div>
    );
  }
);
