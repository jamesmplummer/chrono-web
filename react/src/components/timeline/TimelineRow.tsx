import { isToday } from 'date-fns';
import { useRef, useEffect } from 'react';

export type TimelineRowProps = {
  date: Date;
  ids?: string[];
  items?: any;
  onItemClick?: (e: MouseEvent, target?: any) => void;
  onItemResize?: (e: MouseEvent, target?: any) => void;
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
        return (
          <div
            key={item.id}
            className='absolute flex h-full overflow-hidden rounded-sm py-0.5'
            style={item.style}
          >
            {item.isStart && <ItemResizeHandle />}
            <div className='h-full flex-1 overflow-hidden bg-transparent' />
            {item.isEnd && <ItemResizeHandle />}
          </div>
        );
      })}
    </div>
  );
}

function ItemResizeHandle() {
  // todo: implement
  return (
    <div className='h-full w-1 cursor-ew-resize bg-transparent'>
      <div className='h-full w-full' />
    </div>
  );
}
