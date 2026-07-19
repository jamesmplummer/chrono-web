import { forwardRef } from 'react';

export type InputDateTimeProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  valid?: boolean;
};

export const InputDateTime = forwardRef<HTMLInputElement, InputDateTimeProps>(
  (props, ref) => {
    const id =
      props.id ?? `${props.label.toLowerCase().replace(' ', '-')}-input`;
    return (
      <div className='flex flex-1 flex-col'>
        <label htmlFor={id} className='mt-2 mb-1 w-full text-xs'>
          {props.label}
          {props.required ? '*' : ''}
        </label>
        <input
          id={id}
          ref={ref}
          aria-labelledby={id}
          placeholder={props.placeholder}
          name={props.label}
          type='datetime-local'
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          className={`h-10 w-full rounded-[3px] border border-slate-200 bg-white px-2 py-1 text-sm/[24px] tracking-tighter text-slate-700 placeholder:text-slate-400/70 focus:border-slate-500 focus:outline-none sm:h-9 ${props.valid === false ? 'border-red-600' : ''}`}
        />
      </div>
    );
  }
);
