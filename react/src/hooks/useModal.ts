import { useCallback, useState } from 'react';
import { startCase } from 'lodash';

type UseModalReturn<T extends string> = {
  [K in `${T}Open`]: boolean;
} & {
  [K in `on${Capitalize<T>}Toggle`]: () => void;
} & {
  [K in `on${Capitalize<T>}Open`]: () => void;
} & {
  [K in `on${Capitalize<T>}Close`]: () => void;
};

export function useModal<T extends string>(name: T): UseModalReturn<T> {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const preparedHandlerName = startCase(name).replace(/\s+/g, '');

  return {
    [`${name}Open`]: open,
    [`on${preparedHandlerName}Toggle`]: toggleModal,
    [`on${preparedHandlerName}Open`]: openModal,
    [`on${preparedHandlerName}Close`]: closeModal
  } as UseModalReturn<T>;
}
