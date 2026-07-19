export type InputTextAreaProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  id?: string;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  startIcon?: React.ReactNode;
  valid?: boolean;
};

export function InputTextArea(props: InputTextAreaProps) {
  const id = props.id ?? `${props.label.toLowerCase().replace(' ', '-')}-input`;

  return (
    <>
      <div className='flex items-center'>
        {props.startIcon && props.startIcon}
        <label htmlFor={id} className='mt-2 mb-1 text-xs'>
          {props.label}
          {props.required ? '*' : ''}
        </label>
      </div>
      <textarea
        id={id}
        aria-labelledby={id}
        placeholder={props.placeholder}
        name={props.label}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        className={`rounded-[3px] border border-slate-200 bg-white px-2 py-1 text-sm/[24px] text-slate-700 placeholder:font-light placeholder:text-slate-400/70 focus:border-slate-500 focus:outline-none ${props.valid === false ? 'border-red-600' : ''}`}
        rows={3}
      />
    </>
  );
}
