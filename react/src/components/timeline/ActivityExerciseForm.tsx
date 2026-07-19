import { useRef, useState, type PropsWithChildren } from 'react';
import type {
  ExerciseStrength,
  ExerciseCardio,
  ExerciseMobility,
  Exercise,
  ExerciseVariant
} from '../../types/activity';
import { InputDateTime } from '../form/InputDateTime';
import { InputTextArea } from '../form/InputTextArea';
import {
  DeleteIcon,
  StrengthIcon,
  CardioIcon,
  MobilityIcon,
  AddIcon
} from '../icon/icons';
import { SidePanel } from '../layout/SidePanel';
import { ExerciseMobilityForm } from './ExerciseMobilityForm';
import { ExerciseCardioForm } from './ExerciseCardioForm';
import { useFocusOnOpen } from '../../hooks/useFocusOnOpen';
import { ExerciseStrengthForm } from './ExerciseStrengthForm';

type AddExerciseTypeButtonProps = PropsWithChildren<{
  onClick: () => void;
}>;

function AddExerciseTypeButton(props: AddExerciseTypeButtonProps) {
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    props.onClick();
  }

  return (
    <button
      className='relative mr-1.5 cursor-pointer rounded-[4px] p-1 focus:outline focus:outline-1 focus:outline-slate-500'
      onClick={onClick}
    >
      <div className='flex h-9 w-9 items-center justify-center rounded-[5px] bg-slate-700 p-[3px] text-slate-50'>
        {props.children}
      </div>
      <AddIcon
        className='absolute top-0 right-0 z-10 flex items-center justify-center rounded-[3px] border-[0.5px] border-slate-700 bg-slate-500 p-px text-white'
        size='16'
      />
    </button>
  );
}

const exerciseDefaultValue = {
  Strength: {
    variant: 'Strength',
    title: '',
    sets: [
      {
        idx: Date.now(),
        reps: 0,
        weight: 0,
        rest: 0,
        duration: 0
      }
    ]
  } as ExerciseStrength,
  Cardio: {
    variant: 'Cardio',
    title: '',
    duration: 0,
    distance: 0,
    splits: []
  } as ExerciseCardio,
  Mobility: {
    variant: 'Mobility',
    title: '',
    sets: []
  } as ExerciseMobility
};

export type ActivityExerciseFormProps = {
  open: boolean;
  onClose: () => void;
  data?: Record<any, any>;
};

export function ActivityExerciseForm(props: ActivityExerciseFormProps) {
  function onCreate() {
    console.log('onCreate');
    props.onClose();
  }

  function onUpdate() {
    console.log('onUpdate');
    props.onClose();
  }

  function onDelete() {
    console.log('onDelete');
    props.onClose();
  }

  const startDateRef = useRef<HTMLInputElement | null>(null);
  useFocusOnOpen(startDateRef, props.open);

  const titleText = props.data ? 'Update Exercise' : 'Add Exercise';
  const descriptionExtraText = props.data ? '[ Current Duration: 0h 0m ]' : '';
  const onSubmit = props.data ? onUpdate : onCreate;
  const submitButtonText = titleText;
  const onExtraButtonClick = props.data ? onDelete : undefined;

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      variant: 'Mobility',
      title: 'testing',
      sets: []
    }
  ]);

  function onAddExercise(variant: ExerciseVariant) {
    const defaultValue = exerciseDefaultValue[variant];
    setExercises((prev) => {
      return [...prev, { ...defaultValue }];
    });
  }

  return (
    <SidePanel
      open={props.open}
      titleTextSlot={titleText}
      descriptionTextSlot='Record an exercise session'
      descriptionExtraSlot={descriptionExtraText}
      submitButtonTextSlot={submitButtonText}
      extraButtonIconSlot={<DeleteIcon size='24' />}
      extraButtonTextSlot='Delete'
      onClose={props.onClose}
      onSubmit={onSubmit}
      onExtraButtonClick={onExtraButtonClick}
    >
      <form className='flex flex-col'>
        <div className='mb-1 flex justify-between gap-4'>
          <InputDateTime
            required
            ref={startDateRef}
            label='Start'
            placeholder='Start'
            onChange={(e) => console.log(e.target.value)}
            value={''}
            onBlur={() => {}}
          />
          <InputDateTime
            required
            label='End'
            placeholder='End'
            onChange={(e) => console.log(e.target.value)}
            value={''}
            onBlur={() => {}}
          />
        </div>

        <div className='flex flex-col'>
          {exercises.map((exercise, index) => {
            function onDelete() {
              setExercises((prev) => {
                return prev.filter((_, i) => i !== index);
              });
            }

            function onChange(value: Exercise) {
              setExercises((prev) => {
                return prev.map((e, i) => {
                  if (i === index) return { ...value };
                  return e;
                });
              });
            }

            if (exercise.variant === 'Mobility') {
              return (
                <ExerciseMobilityForm
                  key={`${exercise.variant}-${index}`}
                  data={exercise}
                  onChange={onChange}
                  onDelete={onDelete}
                />
              );
            }
            if (exercise.variant === 'Cardio') {
              return (
                <ExerciseCardioForm
                  key={`${exercise.variant}-${index}`}
                  data={exercise}
                  onChange={onChange}
                  onDelete={onDelete}
                />
              );
            }
            if (exercise.variant === 'Strength') {
              return (
                <ExerciseStrengthForm
                  key={`${exercise.variant}-${index}`}
                  data={exercise}
                  onChange={onChange}
                  onDelete={onDelete}
                />
              );
            }
          })}
        </div>

        <div className='my-2.5 mt-4 ml-1.5 flex items-center justify-end'>
          <span className='mx-2 text-sm text-slate-700'>Add an exercise</span>
          <AddExerciseTypeButton onClick={() => onAddExercise('Strength')}>
            <StrengthIcon size='26' className='text-slate-50' />
          </AddExerciseTypeButton>
          <AddExerciseTypeButton onClick={() => onAddExercise('Cardio')}>
            <CardioIcon size='26' className='text-slate-50' />
          </AddExerciseTypeButton>
          <AddExerciseTypeButton onClick={() => onAddExercise('Mobility')}>
            <MobilityIcon size='50' className='text-slate-50' />
          </AddExerciseTypeButton>
        </div>

        <InputTextArea
          label='Notes'
          placeholder='Notes'
          onChange={(e) => console.log(e.target.value)}
          value={''}
          onBlur={() => {}}
        />
      </form>
    </SidePanel>
  );
}
