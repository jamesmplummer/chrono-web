import {
  mdiAccount,
  mdiChartGantt,
  mdiCog,
  mdiLogout,
  mdiTimerCheckOutline
} from '@mdi/js';
import { Icon } from '@mdi/react';

type IconProps = Parameters<typeof Icon>[0];
type IconPropsWithoutPath = Omit<IconProps, 'path'>;

type IconComponent = (props: IconPropsWithoutPath) => ReturnType<typeof Icon>;

export const Logo: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiTimerCheckOutline} />;
};

export const Logout: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiLogout} />;
};

export const Settings: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiCog} />;
};

export const Timeline: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiChartGantt} />;
};

export const User: IconComponent = (props) => {
  return <Icon size={1} {...props} path={mdiAccount} />;
};
