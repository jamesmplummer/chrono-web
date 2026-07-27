import { useEffect } from 'react';

export function useFocusOnMount<T extends { focus: () => void } | null>(
  ref: React.RefObject<T>
) {
  useEffect(() => {
    if (!ref.current) return;
    ref.current.focus();
  }, []);
}
