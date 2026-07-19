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

type IconProps = Parameters<typeof Icon>[0];
type IconPropsWithoutPath = Omit<IconProps, 'path'>;

export type IconComponent = (
  props: IconPropsWithoutPath
) => ReturnType<typeof Icon>;

export const Logo: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiTimerCheckOutline} />;
};

export const AddIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiPlus} />;
};

export const CardioIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiRun} />;
};

export const CloseIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiClose} />;
};

export const DateIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiCalendarFilter} />;
};

export const DeleteIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiDelete} />;
};

export const LeftIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiChevronLeft} />;
};

export const LogoutIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiLogout} />;
};

export const KeyIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiChartLineVariant} />;
};

export const MobilityIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiMeditation} />;
};

export const RightIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiChevronRight} />;
};

export const SettingsIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiCog} />;
};

export const StrengthIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiDumbbell} />;
};

export const SubmitIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiCheck} />;
};

export const TimelineIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiChartGantt} />;
};

export const UserIcon: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiAccount} />;
};
