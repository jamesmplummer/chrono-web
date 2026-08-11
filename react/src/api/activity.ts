import type { ActivityExerciseData, ActivityVariant } from '../types/activity';

export type GetActivitiesParams = {
  variant?: ActivityVariant;
  title?: string;
  group?: string;
  start?: string;
  end?: string;
  timezone?: number;
};

export type PostActivityArgs = {
  title: string;
  variant: ActivityVariant;
  group: string;
  notes?: string;
  start: string;
  end: string;
  timezone: number;
  data?: ActivityExerciseData;
  color: string;
  createdAt: string;
  user: string;
  id: string;
  v: number;
};

export type PostActivityPayload = {
  title: string;
  variant: ActivityVariant;
  group: string;
  notes?: string;
  start: string;
  end: string;
  timezone: number;
  data?: ActivityExerciseData;
  color?: string;
};

export type PatchActivityArgs = {
  id: string;
  title: string;
  variant: ActivityVariant;
  group: string;
  notes?: string;
  start: string;
  end: string;
  timezone: number;
  data?: ActivityExerciseData;
  color: string;
  createdAt: string;
  user: string;
  v: number;
};

export type PatchActivityParams = string;
export type PatchActivityPayload = {
  title: string;
  variant: ActivityVariant;
  group: string;
  notes?: string;
  start: string;
  end: string;
  timezone: number;
  data?: ActivityExerciseData;
  color?: string;
  v?: number;
};

export type DeleteActivityParams = { id: string };
