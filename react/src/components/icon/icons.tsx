import {
  mdiAccount,
  mdiCalendarFilter,
  mdiChartGantt,
  mdiChartLineVariant,
  mdiCheck,
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiCog,
  mdiDelete,
  mdiDumbbell,
  mdiLogout,
  mdiMeditation,
  mdiPlus,
  mdiRun,
  mdiTimerCheckOutline
} from '@mdi/js';
import { Icon } from '@mdi/react';
import { memo } from 'react';

type IconProps = Parameters<typeof Icon>[0];
type IconPropsWithoutPath = Omit<IconProps, 'path'>;

export type IconComponent = (
  props: IconPropsWithoutPath
) => ReturnType<typeof Icon>;

export const Logo: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiTimerCheckOutline} />;
});

export const AddIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiPlus} />;
});

export const CardioIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiRun} />;
});

export const CloseIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiClose} />;
});

export const DateIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiCalendarFilter} />;
});

export const DeleteIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiDelete} />;
});

export const LeftIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiChevronLeft} />;
});

export const LogoutIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiLogout} />;
});

export const KeyIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiChartLineVariant} />;
});

export const MobilityIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiMeditation} />;
});

export const RightIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiChevronRight} />;
});

export const SettingsIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiCog} />;
});

export const StrengthIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiDumbbell} />;
});

export const SubmitIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiCheck} />;
});

export const TimelineIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiChartGantt} />;
});

export const UserIcon: IconComponent = memo((props) => {
  return <Icon size={1} {...props} path={mdiAccount} />;
});
