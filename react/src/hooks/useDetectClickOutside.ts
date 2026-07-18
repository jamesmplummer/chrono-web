import { type RefObject, useEffect } from 'react';

export function useDetectClickOutside(
  ref: RefObject<HTMLElement | null>[],
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      const isOutside = ref.every(
        (r) => r.current && !r.current.contains(target)
      );
      isOutside && handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
