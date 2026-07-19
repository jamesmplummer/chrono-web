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
