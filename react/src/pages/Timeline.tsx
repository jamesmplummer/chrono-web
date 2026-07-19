import {
  useRef,
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
  useState
} from 'react';
import { AddIcon, StrengthIcon } from '../components/icon/icons';
import { Page } from '../components/layout/Page';
import { useModal } from '../hooks/useModal';
import { useDetectClickOutside } from '../hooks/useDetectClickOutside';
import { getDateId } from '../utils/date';
import { useDateSelect } from '../hooks/useDateSelect';
import { useDatesInMonth } from '../hooks/useDatesInMonth';
import { Key } from '../components/timeline/Key';
import { InputMonthYear } from '../components/form/InputMonthYear';
import { TimelineHeaderRow } from '../components/timeline/TimelineHeaderRow';
import { TimelineDateLabel } from '../components/timeline/TimelineDateLabel';
import { TimelineRow } from '../components/timeline/TimelineRow';
import { ActivityDefaultForm } from '../components/timeline/ActivityDefaultForm';
import { ActivityExerciseForm } from '../components/timeline/ActivityExerciseForm';

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

const today = new Date();
const todayDateId = getDateId(today);
const data = {
  [`${todayDateId}`]: {
    ids: ['1', '2', '3'],
    items: {
      '1': {
        id: '1',
        title: 'Cardio',
        isStart: true,
        isEnd: true,
        style: {
          left: 0,
          width: '10%',
          backgroundColor: 'red'
        }
      },
      '2': {
        id: '2',
        title: 'Mobility',
        isStart: true,
        isEnd: true,
        style: {
          left: '15%',
          width: '20%',
          backgroundColor: 'blue'
        }
      },
      '3': {
        id: '3',
        title: 'Exercise',
        isStart: true,
        isEnd: true,
        style: {
          left: '35%',
          width: '40%',
          backgroundColor: 'green'
        }
      }
    }
  }
};

const keys: Record<string, [number, string]> = {
  cardio: [3900000, 'red'],
  mobility: [4900000, 'blue'],
  exercise: [6900000, 'green']
};

export function Timeline() {
  const [activities, setActivities] = useState(data);
  const [selectedActivityId, setSelectedActivityId] = useState<string>();

  const addOptionsRef = useRef<HTMLDivElement>(null);
  const addOptionsButtonRef = useRef<HTMLButtonElement>(null);
  const { addOptionsOpen, onAddOptionsToggle } = useModal('addOptions');
  useDetectClickOutside(
    [addOptionsRef, addOptionsButtonRef],
    onAddOptionsToggle
  );

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

  const { date, onChange } = useDateSelect();
  const { dates } = useDatesInMonth(date);

  function onItemClick(id: string) {
    setSelectedActivityId(id);
    onActivityDefaultToggle();
  }

  return (
    <Page>
      <div className='relative flex flex-1 flex-col bg-white'>
        <section className='mx-3 mt-3 flex items-start justify-between'>
          <div>
            <Key values={keys} />
          </div>

          <div className='flex'>
            <InputMonthYear value={date} onChange={onChange} />
          </div>
        </section>

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

        <section className='bg-slate-white flex flex-col pt-2 pr-2 pl-1 sm:p-4'>
          <TimelineHeaderRow />
          <section className='flex flex-1 cursor-default'>
            <ul className='mb-2 flex flex-1 flex-col'>
              {dates.map((date) => {
                const dateId = getDateId(date);
                const ids = activities[dateId]?.ids;
                const items = activities[dateId]?.items;
                return (
                  <li
                    key={date.toDateString()}
                    className='flex w-full flex-row'
                  >
                    <TimelineDateLabel date={date} />
                    <TimelineRow
                      date={date}
                      ids={ids}
                      items={items}
                      onItemClick={onItemClick}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        </section>
      </div>

      <ActivityDefaultForm
        open={activityDefaultOpen}
        onClose={() => {
          setSelectedActivityId(undefined);
          onActivityDefaultClose();
        }}
        data={
          selectedActivityId
            ? activities[todayDateId].items[selectedActivityId]
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
          selectedActivityId
            ? activities[todayDateId].items[selectedActivityId]
            : undefined
        }
      />
    </Page>
  );
}
