import { forwardRef } from 'react';

export type InputTextProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  valid?: boolean;
};

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (props, ref) => {
    const id =
      props.id ?? `${props.label.toLowerCase().replace(' ', '-')}-input`;

    return (
      <>
        <div className='flex items-center'>
          {props.icon && props.icon}
          <label htmlFor={id} className='mt-2 mb-1 text-xs'>
            {props.label}
            {props.required ? '*' : ''}
          </label>
        </div>
        <input
          id={id}
          ref={ref}
          aria-labelledby={id}
          placeholder={props.placeholder}
          name={props.label}
          type={props.type || 'text'}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          className={`h-10 rounded-[3px] border border-slate-200 bg-white px-2 py-1 text-sm/[24px] text-slate-700 placeholder:font-light placeholder:text-slate-400/70 focus:border-slate-500 focus:outline-none sm:h-9 ${props.valid === false ? 'border-red-600' : ''}`}
        />
      </>
    );
  }
);
