import {
  useRef,
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
  useState
} from 'react';
import {
  AddIcon,
  CardioIcon,
  MobilityIcon,
  SessionIcon
} from '../components/icon/icons';
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

const today = new Date();

const data = {
  [`${getDateId(today)}`]: {
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

  const addOptionsRef = useRef<HTMLDivElement>(null);
  const addOptionsButtonRef = useRef<HTMLButtonElement>(null);
  const { addOptionsOpen, onAddOptionsToggle } = useModal('addOptions');
  useDetectClickOutside(
    [addOptionsRef, addOptionsButtonRef],
    onAddOptionsToggle
  );

  const { date, onChange } = useDateSelect();
  const { dates } = useDatesInMonth(date);

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
          id='create-item-button'
          ref={addOptionsButtonRef}
          onClick={onAddOptionsToggle}
          className='fixed right-2 bottom-16 z-20 bg-slate-900'
        >
          <AddIcon size='32' className='text-slate-50' />
        </AddButton>
        {addOptionsOpen && (
          <div
            ref={addOptionsRef}
            className='fixed right-2 bottom-[132px] flex gap-3'
          >
            <AddButton
              id='create-mobility'
              onClick={() => {}}
              className='bg-slate-500'
            >
              <MobilityIcon size='38' className='text-slate-100' />
            </AddButton>
            <AddButton
              id='create-cardio'
              onClick={() => {}}
              className='bg-slate-600'
            >
              <CardioIcon size='32' className='text-slate-100' />
            </AddButton>
            <AddButton
              id='create-session'
              onClick={() => {}}
              className='bg-slate-700'
            >
              <SessionIcon size='32' className='text-slate-100' />
            </AddButton>
            <AddButton
              id='create-item'
              onClick={() => {}}
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
                    <TimelineRow date={date} ids={ids} items={items} />
                  </li>
                );
              })}
            </ul>
          </section>
        </section>
      </div>
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
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-slate-700/20 focus:outline-slate-700 ${props.className}`}
      >
        {children}
      </button>
    );
  }
);
