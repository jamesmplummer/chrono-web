import { type PropsWithChildren, useRef, useEffect } from 'react';
import { InputText } from '../form/InputText';
import { CloseIcon } from '../icon/icons';

type DeleteExerciseButtonProps = PropsWithChildren<{
  onClick?: () => void;
}>;

function DeleteExerciseButton(props: DeleteExerciseButtonProps) {
  if (!props.onClick) return <span className='ml-1 min-w-[26px] px-1' />;

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    props.onClick?.();
  }

  return (
    <button
      className='mt-[32px] mb-1 ml-1 flex cursor-pointer items-center rounded-[3px] px-1 text-xs font-bold focus:outline focus:outline-1 focus:outline-slate-500'
      onClick={onClick}
    >
      <CloseIcon size='18' className='text-red-500' />
    </button>
  );
}

export type ExerciseTitleInputProps<T extends { title: string }> =
  PropsWithChildren<{
    data: T;
    onChange: (value: T) => void;
    onDelete?: () => void;
  }>;

export function ExerciseTitleInput<T extends { title: string }>(
  props: ExerciseTitleInputProps<T>
) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);

  return (
    <div className='flex'>
      <span className='flex w-full flex-col'>
        <InputText
          ref={inputRef}
          label='Exercise'
          placeholder='Exercise'
          icon={props.children}
          onChange={(e) =>
            props.onChange({ ...props.data, title: e.target.value })
          }
          value={props.data.title}
        />
      </span>
      <DeleteExerciseButton onClick={props.onDelete} />
    </div>
  );
}
