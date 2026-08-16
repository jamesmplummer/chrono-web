import type {
  ActivityData,
  ActivityId,
  ActivityVariant
} from '../types/activity';

export type GetActivitiesParams = {
  variant?: ActivityVariant;
  title?: string;
  group?: string;
  start?: string;
  end?: string;
  timezone?: number;
};

export type PostActivityPayload<Variant extends ActivityVariant = 'Default'> = {
  title: string;
  variant: Variant;
  group: string;
  notes?: string;
  start: string;
  end: string;
  timezone: number;
  data?: ActivityData[Variant];
  color?: string;
};

export type PatchActivityParams = ActivityId;
export type PatchActivityPayload<Variant extends ActivityVariant = 'Default'> =
  {
    title: string;
    variant: ActivityVariant;
    group: string;
    notes?: string;
    start: string;
    end: string;
    timezone: number;
    data?: ActivityData[Variant];
    color?: string;
    v?: number;
  };

export type DeleteActivityParams = ActivityId;
