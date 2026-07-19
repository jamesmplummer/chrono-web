import { forwardRef } from 'react';
import { InputNumber } from './InputNumber';

export type InputDistanceProps = {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  label?: string;
};

export const InputDistance = forwardRef<HTMLInputElement, InputDistanceProps>(
  (props, ref) => {
    const label = props.label || 'Distance';
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      const value = parseInt(e.target.value, 10);
      if (isNaN(value)) return;
      props.onChange(value);
    }

    return (
      <InputNumber
        ref={ref}
        label={label}
        onChange={onChange}
        value={props.value}
        suffix='km'
      />
    );
  }
);
