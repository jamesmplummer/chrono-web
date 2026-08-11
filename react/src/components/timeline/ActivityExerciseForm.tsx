import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import type {
  ExerciseStrength,
  ExerciseCardio,
  ExerciseMobility,
  Exercise,
  ExerciseVariant,
  FormattedActivity
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
import { getDurationText } from '../../utils/date';

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
  data?: FormattedActivity;
};

export function ActivityExerciseForm({
  data,
  open,
  onClose
}: ActivityExerciseFormProps) {
  const startDateRef = useRef<HTMLInputElement | null>(null);
  useFocusOnOpen(startDateRef, open);

  const [start, setStart] = useState<string>(data?.start ?? '');
  const [end, setEnd] = useState<string>(data?.end ?? '');
  const [exercises, setExercises] = useState<Exercise[]>(data?.exercise ?? []);
  const [notes, setNotes] = useState<string>(data?.notes ?? '');

  useEffect(() => {
    if (open) {
      setStart(data?.start ?? '');
      setEnd(data?.end ?? '');
      setNotes(data?.notes ?? '');
      setExercises(data?.exercise ?? []);
    }
  }, [open]);

  function onAddExercise(variant: ExerciseVariant) {
    const defaultValue = exerciseDefaultValue[variant];
    setExercises((prev) => {
      return [...prev, { ...defaultValue }];
    });
  }

  function onCreate() {
    console.log('onCreate');
    onClose();
  }

  function onUpdate() {
    console.log('onUpdate');
    onClose();
  }

  function onDelete() {
    console.log('onDelete');
    onClose();
  }

  const titleText = data ? 'Update Exercise' : 'Add Exercise';
  const descriptionExtraText = getDurationText(start, end);
  const onSubmit = data ? onUpdate : onCreate;
  const submitButtonText = titleText;
  const onExtraButtonClick = data ? onDelete : undefined;

  return (
    <SidePanel
      open={open}
      titleTextSlot={titleText}
      descriptionTextSlot='Record an exercise session'
      descriptionExtraSlot={descriptionExtraText}
      submitButtonTextSlot={submitButtonText}
      extraButtonIconSlot={<DeleteIcon size='24' />}
      extraButtonTextSlot='Delete'
      onClose={onClose}
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
            onChange={(e) => setStart(e.target.value)}
            value={start}
          />
          <InputDateTime
            required
            label='End'
            placeholder='End'
            onChange={(e) => setEnd(e.target.value)}
            value={end}
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
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </form>
    </SidePanel>
  );
}
