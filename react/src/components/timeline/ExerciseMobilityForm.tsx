import { useRef } from 'react';
import type { ExerciseMobility } from '../../types/activity';
import { MobilityIcon } from '../icon/icons';
import { ExerciseTitleInput } from './InputExerciseTitle';
import { useFocusOnMount } from '../../hooks/useFocusOnMount';

export type ExerciseMobilityFormProps = {
  data: ExerciseMobility;
  onChange: (value: ExerciseMobility) => void;
  onDelete: () => void;
};

export function ExerciseMobilityForm(props: ExerciseMobilityFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useFocusOnMount(inputRef);

  return (
    <ExerciseTitleInput
      data={props.data}
      onChange={props.onChange}
      onDelete={props.onDelete}
    >
      <MobilityIcon
        size='16'
        className='mt-1 mr-1 flex items-center justify-center rounded-[3px] bg-slate-700 p-px text-slate-50'
      />
    </ExerciseTitleInput>
  );
}
