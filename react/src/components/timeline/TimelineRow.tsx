import { isToday } from 'date-fns';
import { useRef, useEffect } from 'react';
import type { ActivityVariant, FormattedActivity } from '../../types/activity';

export type TimelineRowProps = {
  date: Date;
  ids?: string[];
  items?: { [key: string]: FormattedActivity };
  onItemClick?: (id: string, variant: ActivityVariant) => void;
};

export function TimelineRow(props: TimelineRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (isToday(props.date)) {
      containerRef.current.scrollIntoView({ block: 'center' });
    }
  }, []);

  return (
    <div ref={containerRef} className='relative flex h-full w-full'>
      {props.ids?.map((id) => {
        const item = props.items?.[id];
        if (!item) return;
        return (
          <div
            key={item.id}
            onClick={() => props.onItemClick?.(id, item.variant)}
            className='absolute flex h-full cursor-pointer overflow-hidden rounded-sm py-0.5'
            style={item.style}
          />
        );
      })}
    </div>
  );
}
