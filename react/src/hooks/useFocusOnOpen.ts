import { useEffect } from 'react';

export function useFocusOnOpen<T extends { focus: () => void } | null>(
  ref: React.RefObject<T>,
  open: boolean
) {
  useEffect(() => {
    if (!ref.current || !open) return;
    ref.current.focus();
  }, [open]);
}
