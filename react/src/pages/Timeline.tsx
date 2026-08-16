import {
  useRef,
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
  useState,
  memo
} from 'react';
import { AddIcon, StrengthIcon } from '../components/icon/icons';
import { Page } from '../components/layout/Page';
import { useModal } from '../hooks/useModal';
import { useDetectClickOutside } from '../hooks/useDetectClickOutside';
import { getDateId } from '../utils/date';
import { Key } from '../components/timeline/Key';
import { InputMonthYear } from '../components/form/InputMonthYear';
import { TimelineHeaderRow } from '../components/timeline/TimelineHeaderRow';
import { TimelineDateLabel } from '../components/timeline/TimelineDateLabel';
import { TimelineRow } from '../components/timeline/TimelineRow';
import { ActivityDefaultForm } from '../components/timeline/ActivityDefaultForm';
import { ActivityExerciseForm } from '../components/timeline/ActivityExerciseForm';
import type { ActivityVariant } from '../types/activity';
import type { DateId } from '../types/date';
import { useActivityKey } from '../hooks/activity/useActivityKey';
import {
  useActivityContext,
  useActivityDateContext
} from '../contexts/ActivityContext';

export function Timeline() {
  const { date, datesInMonth, onChange } = useActivityDateContext();
  const activities = useActivityContext();

  const keys = useActivityKey(date, activities);

  const [selectedActivityId, setSelectedActivityId] = useState<string>();
  const [selectedDateId, setSelectedDateId] = useState<DateId>();

  const {
    activityDefaultOpen,
    onActivityDefaultToggle,
    onActivityDefaultClose
  } = useModal('activityDefault');
  const {
    activityExerciseOpen,
    onActivityExerciseToggle,
    onActivityExerciseClose
  } = useModal('activityExercise');

  const modalToggle = {
    Default: onActivityDefaultToggle,
    Exercise: onActivityExerciseToggle
  };

  function makeOnItemClick(date: Date) {
    const dateId = getDateId(date);
    return function onItemClick(id: string, variant: ActivityVariant) {
      setSelectedActivityId(id);
      setSelectedDateId(dateId);
      modalToggle[variant ?? 'Default']();
    };
  }

  return (
    <Page>
      <div className='relative flex flex-1 flex-col bg-white'>
        <section className='mx-3 mt-3 flex items-start justify-between'>
          <Key values={keys} />
          <InputMonthYear value={date} onChange={onChange} />
        </section>

        <TimelineContent
          datesInMonth={datesInMonth}
          makeOnItemClick={makeOnItemClick}
        />

        <AddButtons
          onActivityDefaultToggle={onActivityDefaultToggle}
          onActivityExerciseToggle={onActivityExerciseToggle}
        />
      </div>

      <ActivityDefaultForm
        open={activityDefaultOpen}
        onClose={() => {
          setSelectedActivityId(undefined);
          onActivityDefaultClose();
        }}
        data={
          selectedActivityId && selectedDateId
            ? activities?.[selectedDateId]?.items[selectedActivityId]
            : undefined
        }
      />

      <ActivityExerciseForm
        open={activityExerciseOpen}
        onClose={() => {
          setSelectedActivityId(undefined);
          onActivityExerciseClose();
        }}
        data={
          selectedActivityId && selectedDateId
            ? activities?.[selectedDateId]?.items[selectedActivityId]
            : undefined
        }
      />
    </Page>
  );
}

type AddButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full shadow-lg shadow-slate-700/20 focus:outline-slate-700 ${props.className}`}
      >
        {children}
      </button>
    );
  }
);

type AddButtonsProps = {
  onActivityDefaultToggle: () => void;
  onActivityExerciseToggle: () => void;
};

const AddButtons = memo(
  ({ onActivityDefaultToggle, onActivityExerciseToggle }: AddButtonsProps) => {
    const addOptionsRef = useRef<HTMLDivElement>(null);
    const addOptionsButtonRef = useRef<HTMLButtonElement>(null);
    const { addOptionsOpen, onAddOptionsToggle } = useModal('addOptions');
    useDetectClickOutside(
      [addOptionsRef, addOptionsButtonRef],
      onAddOptionsToggle
    );

    return (
      <>
        <AddButton
          id='create-activity-button'
          ref={addOptionsButtonRef}
          onClick={onAddOptionsToggle}
          className='fixed right-2 bottom-16 z-20 bg-slate-900'
        >
          <AddIcon size='32' className='text-slate-50' />
        </AddButton>
        {addOptionsOpen && (
          <div
            ref={addOptionsRef}
            className='fixed right-2 bottom-[132px] z-10 flex gap-3'
          >
            <AddButton
              id='create-exercise'
              onClick={onActivityExerciseToggle}
              className='bg-slate-700'
            >
              <StrengthIcon size='32' className='text-slate-100' />
            </AddButton>
            <AddButton
              id='create-activity'
              onClick={onActivityDefaultToggle}
              className='bg-slate-800'
            >
              <AddIcon size='32' className='text-slate-50' />
            </AddButton>
          </div>
        )}
      </>
    );
  }
);

type TimelineContentProps = {
  datesInMonth: Date[];
  makeOnItemClick: (
    date: Date
  ) => (id: string, variant: ActivityVariant) => void;
};

const TimelineContent = memo(
  (props: TimelineContentProps) => {
    const activities = useActivityContext();

    return (
      <section className='bg-slate-white flex flex-col pt-2 pr-2 pl-1 sm:p-4'>
        <TimelineHeaderRow />
        <section className='flex flex-1 cursor-default'>
          <ul className='mb-2 flex flex-1 flex-col'>
            {props.datesInMonth.map((date) => {
              const dateId = getDateId(date);
              const ids = activities?.[dateId]?.ids;
              const items = activities?.[dateId]?.items;
              return (
                <li key={date.toDateString()} className='flex w-full flex-row'>
                  <TimelineDateLabel date={date} />
                  <TimelineRow
                    date={date}
                    ids={ids}
                    items={items}
                    onItemClick={props.makeOnItemClick(date)}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    );
  },
  (prev, next) => {
    return (
      prev.datesInMonth.length === next.datesInMonth.length &&
      prev.datesInMonth.every(
        (date, i) => date.getTime() === next.datesInMonth[i].getTime()
      )
    );
  }
);
