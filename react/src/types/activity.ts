import type { DateId } from './date';

export type ExerciseVariant = 'Strength' | 'Cardio' | 'Mobility';
export type ActivityVariant = 'Default' | 'Exercise';

export type ExerciseSet = {
  idx: number;
  reps?: number;
  weight?: number;
  rest?: number;
  duration?: number;
};

export type ExerciseSplit = {
  idx: number;
  distance: number;
  duration: number;
};

export type ExerciseStrength = {
  variant: 'Strength';
  title: string;
  sets: ExerciseSet[];
};

export type ExerciseMobility = {
  variant: 'Mobility';
  title: string;
  sets: ExerciseSet[];
};

export type ExerciseCardio = {
  variant: 'Cardio';
  title: string;
  duration: number;
  distance: number;
  splits: ExerciseSplit[];
};

export type Exercise = ExerciseStrength | ExerciseMobility | ExerciseCardio;

export type ActivityExerciseData = {
  exercise: Exercise[];
};

export type ActivityBase = {
  id: string;
  title: string;
  variant: ActivityVariant;
  group: string;
  notes?: string;
  start: string;
  end: string;
  timezone: number;
  createdAt: string;
  user: string;
  v: number;
};

export type ExerciseActivity = ActivityBase & ActivityExerciseData;

export type Activity = ActivityBase | ExerciseActivity;

export type DerivedProperties = {
  dateId: DateId;
  startPercentage: number;
  endPercentage: number;
  width: number;
  style: { left: string; width: string };
  isStart: boolean;
  isEnd: boolean;
};

export type FormattedActivity = Activity & DerivedProperties;

export type FormattedActivities = {
  [key: DateId]: {
    ids: FormattedActivity['id'][];
    items: Record<FormattedActivity['id'], FormattedActivity>;
  };
};
