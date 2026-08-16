export type InputErrorLineProps = {
  error?: string;
};

export function InputErrorLine(props: InputErrorLineProps) {
  return <p className='mt-0.5 ml-1 text-xs text-red-500'>{props.error}</p>;
}
