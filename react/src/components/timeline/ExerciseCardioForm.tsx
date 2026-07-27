import { useRef } from 'react';
import type { ExerciseCardio, ExerciseSplit } from '../../types/activity';
import { InputDistance } from '../form/InputDistance';
import { InputDuration } from '../form/InputDuration';
import { CardioIcon, AddIcon, CloseIcon } from '../icon/icons';
import { ExerciseTitleInput } from './InputExerciseTitle';
import { AddSubItemButton } from './AddSubItemButton';
import { DeleteSubItemButton } from './DeleteSubItemButton';
import { useFocusOnMount } from '../../hooks/useFocusOnMount';

export type ExerciseCardioFormProps = {
  data: ExerciseCardio;
  onChange: (value: ExerciseCardio) => void;
  onDelete: () => void;
};

export function ExerciseCardioForm(props: ExerciseCardioFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useFocusOnMount(inputRef);

  function onAddSplits() {
    props.onChange({
      ...props.data,
      splits: [{ idx: Date.now(), distance: 0, duration: 0 }]
    });
  }

  function onRemoveSplits() {
    props.onChange({
      ...props.data,
      splits: []
    });
  }

  const hasSplits = props.data.splits.length > 0;

  return (
    <section className='flex flex-col'>
      <ExerciseTitleInput
        data={props.data}
        onChange={props.onChange}
        onDelete={props.onDelete}
      >
        <CardioIcon
          size='16'
          className='mt-1 mr-1 flex items-center justify-center rounded-[3px] bg-slate-700 p-0.5 text-slate-50'
        />
      </ExerciseTitleInput>
      <div className='mt-2.5 ml-4 flex items-center'>
        <InputDistance
          value={props.data.distance}
          onChange={(value) =>
            props.onChange({
              ...props.data,
              distance: value
            })
          }
        />
      </div>
      <div className='mt-2 ml-4 flex items-center justify-between'>
        <InputDuration
          value={props.data.duration}
          onChange={(value) =>
            props.onChange({
              ...props.data,
              duration: value
            })
          }
        />
        {!hasSplits && <AddSplitsButton onClick={onAddSplits} />}
        {hasSplits && <RemoveSplitsButton onClick={onRemoveSplits} />}
      </div>

      {hasSplits && <SplitsForm data={props.data} onChange={props.onChange} />}
    </section>
  );
}

type SplitsButtonProps = {
  onClick: () => void;
};

function AddSplitsButton(props: SplitsButtonProps) {
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    props.onClick();
  }

  return (
    <button
      onClick={onClick}
      className='mt-2 mr-[18px] flex h-6 cursor-pointer items-center rounded-[3px] px-1 text-xs text-slate-800 focus:outline focus:outline-1 focus:outline-slate-500'
    >
      <AddIcon size='18' className='mr-px text-slate-800' />
      <span className='mr-1.5'>Add Splits</span>
    </button>
  );
}

function RemoveSplitsButton(props: SplitsButtonProps) {
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    props.onClick();
  }

  return (
    <button
      onClick={onClick}
      className='mt-2 mr-[18px] flex h-6 cursor-pointer items-center rounded-[3px] px-1 text-xs text-red-500 focus:outline focus:outline-1 focus:outline-slate-500'
    >
      <CloseIcon size='18' className='mr-px text-red-500' />
      <span className='mr-1.5'>Remove Splits</span>
    </button>
  );
}

type SplitsFormProps = {
  data: ExerciseCardio;
  onChange: (value: ExerciseCardio) => void;
};

function SplitsForm(props: SplitsFormProps) {
  function updateSplit<T extends keyof ExerciseSplit>(
    key: T,
    value: ExerciseSplit[T],
    idx: number
  ) {
    return {
      ...props.data,
      splits: props.data.splits.map((split) => {
        return split.idx === idx ? { ...split, [key]: value } : split;
      })
    };
  }

  return (
    <>
      <div className='mt-4 mb-1.5 flex justify-between'>
        <label className='text-xs'>Splits</label>
      </div>

      {props.data.splits.map((split, index) => {
        function onChange(key: 'distance' | 'duration') {
          return (value: number) => {
            props.onChange(updateSplit(key, value, split.idx));
          };
        }

        function onDelete() {
          props.onChange({
            ...props.data,
            splits: props.data.splits.filter((s) => s.idx !== split.idx)
          });
        }

        function onAdd() {
          props.onChange({
            ...props.data,
            splits: [
              ...props.data.splits,
              {
                idx: Date.now(),
                distance: 0,
                duration: 0
              }
            ]
          });
        }

        const isLastSplit = index === props.data.splits.length - 1;

        return (
          <div
            key={split.idx}
            className='mb-2.5 ml-4 flex items-center last-of-type:mb-1'
          >
            <div className='mr-4 flex items-center gap-5 [&_div_>_label]:mr-1.5 [&_div_>_label]:w-auto'>
              <InputDistance
                value={split.distance}
                onChange={onChange('distance')}
              />
              <InputDuration
                value={split.duration}
                onChange={onChange('duration')}
              />
            </div>

            {!isLastSplit && <DeleteSubItemButton onClick={onDelete} />}
            {isLastSplit && <AddSubItemButton onClick={onAdd} />}
          </div>
        );
      })}
    </>
  );
}
