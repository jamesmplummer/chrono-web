import { SettingsIcon, TimelineIcon } from '../components/icon/icons';

export const routeDef = {
  home: {
    id: 'home',
    url: '/timeline',
    text: 'Timeline',
    icon: undefined
  },
  login: {
    id: 'login',
    url: '/login',
    text: 'Login',
    icon: undefined
  },
  timeline: {
    id: 'timeline',
    url: '/timeline',
    text: 'Timeline',
    icon: TimelineIcon
  },
  settings: {
    id: 'settings',
    url: '/settings',
    text: 'Settings',
    icon: SettingsIcon
  }
};
