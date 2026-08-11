import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren
} from 'react';
import type { User } from '../types/user';
import { PickMap, type PickMapType } from '../utils/pickMap';

const updateUserPickMap = new PickMap({
  activities: true,
  familyName: true,
  givenName: true,
  img: true,

  id: false,
  email: false,
  role: false,
  verified: false,
  _refreshCheck: false
} satisfies PickMapType<User>);

type UserContextType = User | null;
type SetUserContextType = {
  setUser: (user: User) => void;
  updateUser: (args: Partial<User>) => void;
  updateUserActivityColor: (title: string, color: string) => void;
} | null;

const UserContext = createContext<UserContextType>(null);
const SetUserContext = createContext<SetUserContextType>(null);

export function useUserContext() {
  return useContext(UserContext);
}

export function useSetUserContext() {
  return useContext(SetUserContext);
}

// todo: remove
const mockUser = {
  id: '5f25a17b81fad94430820f38',
  email: 'james@gmail.com',
  role: 'admin',
  activities: {
    Exercise: '#04da00',
    Cardio: '#b3b3b3',
    Default: '#e5e5e5',
    gaming: '#c00096',
    work: '#ff00c7'
  },
  verified: true,
  givenName: 'James',
  familyName: 'Plummer',
  img: '',
  _refreshCheck: Date.now()
};

export function UserProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<UserContextType>(mockUser);

  const updateUser = useCallback((args: Partial<User>) => {
    setUser((prev) => {
      if (!prev) throw new Error('User not found, unable to update');
      const payload = updateUserPickMap.pick(args);
      return { ...prev, ...payload };
    });
  }, []);

  const updateUserActivityColor = useCallback(
    (title: string, color: string) => {
      setUser((prev) => {
        if (!prev) throw new Error('User not found, unable to update');
        const prevColor = prev.activities[title];
        if (prevColor !== color) prev.activities[title] = color;
        return { ...prev };
      });
    },
    []
  );

  const setUserContext = useMemo(() => {
    return {
      setUser,
      updateUser,
      updateUserActivityColor
    };
  }, [updateUser]);

  return (
    <UserContext value={user}>
      <SetUserContext value={setUserContext}>{props.children}</SetUserContext>
    </UserContext>
  );
}
