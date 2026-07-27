import { useRef } from 'react';
import type { ExerciseSet, ExerciseStrength } from '../../types/activity';
import { StrengthIcon } from '../icon/icons';
import { ExerciseTitleInput } from './InputExerciseTitle';
import { InputNumber } from '../form/InputNumber';
import { AddSubItemButton } from './AddSubItemButton';
import { DeleteSubItemButton } from './DeleteSubItemButton';
import { useFocusOnMount } from '../../hooks/useFocusOnMount';

export type ExerciseStrengthFormProps = {
  data: ExerciseStrength;
  onChange: (value: ExerciseStrength) => void;
  onDelete: () => void;
};

export function ExerciseStrengthForm(props: ExerciseStrengthFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useFocusOnMount(inputRef);

  function updateSet<T extends keyof ExerciseSet>(
    key: T,
    value: ExerciseSet[T],
    idx: number
  ) {
    return {
      ...props.data,
      sets: props.data.sets.map((set) => {
        return set.idx === idx ? { ...set, [key]: value } : set;
      })
    };
  }

  return (
    <section className='flex flex-col gap-2.5'>
      <ExerciseTitleInput
        data={props.data}
        onChange={props.onChange}
        onDelete={props.onDelete}
      >
        <StrengthIcon
          size='16'
          className='mt-1 mr-1 flex items-center justify-center rounded-[3px] bg-slate-700 p-0.5 text-slate-50'
        />
      </ExerciseTitleInput>

      {props.data.sets.map((set, index) => {
        function onChange(key: 'reps' | 'weight') {
          return (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value, 10);
            props.onChange(updateSet(key, value, set.idx));
          };
        }

        function onDelete() {
          props.onChange({
            ...props.data,
            sets: props.data.sets.filter((s) => s.idx !== set.idx)
          });
        }

        function onAdd() {
          props.onChange({
            ...props.data,
            sets: [
              ...props.data.sets,
              {
                idx: Date.now(),
                reps: 0,
                weight: 0,
                rest: 0,
                duration: 0
              }
            ]
          });
        }

        const isLastSet = index === props.data.sets.length - 1;

        return (
          <div
            key={set.idx}
            className='ml-4 flex items-center last-of-type:mb-1'
          >
            <div className='mr-4 flex items-center gap-5 [&_div_>_label]:mr-1.5 [&_div_>_label]:w-auto'>
              <InputNumber
                label='Reps'
                value={set.reps ?? 0}
                onChange={onChange('reps')}
              />
              <InputNumber
                label='Weight'
                value={set.weight ?? 0}
                onChange={onChange('weight')}
                suffix='kg'
              />
            </div>

            {!isLastSet && <DeleteSubItemButton onClick={onDelete} />}
            {isLastSet && <AddSubItemButton onClick={onAdd} />}
          </div>
        );
      })}
    </section>
  );
}
