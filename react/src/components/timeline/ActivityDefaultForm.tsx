import { useEffect, useMemo, useRef, useState } from 'react';
import { InputColor } from '../form/InputColor';
import { InputDateTime } from '../form/InputDateTime';
import { InputText } from '../form/InputText';
import { InputTextArea } from '../form/InputTextArea';
import { DeleteIcon } from '../icon/icons';
import { SidePanel } from '../layout/SidePanel';
import { useFocusOnOpen } from '../../hooks/useFocusOnOpen';
import type { FormattedActivity } from '../../types/activity';
import { getDurationText, getTimezoneOffset } from '../../utils/date';
import { useUserContext } from '../../contexts/UserContext';
import { useActivityMutationContext } from '../../contexts/ActivityContext';
import { add } from 'date-fns';
import { DEFAULT_COLOR } from '../../types/style';
import { InputErrorLine } from '../form/InputErrorLine';

export type ActivityDefaultFormProps = {
  open: boolean;
  onClose: () => void;
  data?: FormattedActivity;
};

export function ActivityDefaultForm({
  open,
  onClose,
  data
}: ActivityDefaultFormProps) {
  const user = useUserContext();
  const { createActivity, updateActivity, deleteActivity } =
    useActivityMutationContext();

  const titleRef = useRef<HTMLInputElement | null>(null);
  useFocusOnOpen(titleRef, open);

  const [title, setTitle] = useState<string>('');
  const [group, setGroup] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const [titleError, setTitleError] = useState<string>();
  const [groupError, setGroupError] = useState<string>();
  const [dateError, setDateError] = useState<string>();

  const [titleTouched, setTitleTouched] = useState<boolean>(false);
  const [groupTouched, setGroupTouched] = useState<boolean>(false);
  const [dateTouched, setDateTouched] = useState<boolean>(false);

  function validateAll() {
    const titleError = validateTitle(title);
    const groupError = validateGroup(group);
    const dateError = validateDates(start, end);
    setTitleError(titleError);
    setGroupError(groupError);
    setDateError(dateError);
    return titleError || groupError || dateError;
  }

  useEffect(() => {
    if (open) {
      const now = new Date();
      const defaultStart = now.toISOString().slice(0, -8);
      const defaultEnd = add(now, { minutes: 5 }).toISOString().slice(0, -8);

      setTitle(data?.title ?? '');
      setGroup(data?.group ?? '');
      setNotes(data?.notes ?? '');
      setStart(data?.start ?? defaultStart);
      setEnd(data?.end ?? defaultEnd);
      setColor(user?.activities[data?.title ?? ''] ?? DEFAULT_COLOR);

      setTitleError(undefined);
      setGroupError(undefined);
      setDateError(undefined);

      setTitleTouched(false);
      setGroupTouched(false);
      setDateTouched(false);
    }
  }, [open]);

  const updatableProperties = useMemo(() => {
    return { title, group, notes, start, end, color };
  }, [title, group, notes, start, end, color]);

  function onCreate() {
    const errors = validateAll();
    if (errors) return;
    createActivity({
      ...updatableProperties,
      timezone: getTimezoneOffset(),
      variant: 'Default'
    });
    onClose();
  }

  function onUpdate() {
    if (!data) return;
    const errors = validateAll();
    if (errors) return;
    updateActivity(data.id, {
      ...updatableProperties,
      timezone: data.timezone,
      variant: data.variant
    });
    onClose();
  }

  function onDelete() {
    if (!data) return;
    deleteActivity(data.id);
    onClose();
  }

  const titleText = data ? 'Update Activity' : 'Add Activity';
  const descriptionExtraText = getDurationText(start, end);
  const onSubmit = data ? onUpdate : onCreate;
  const submitButtonText = titleText;
  const onExtraButtonClick = data ? onDelete : undefined;

  return (
    <SidePanel
      open={open}
      titleTextSlot={titleText}
      descriptionTextSlot='Record the time spent doing an activity'
      descriptionExtraSlot={descriptionExtraText}
      submitButtonTextSlot={submitButtonText}
      extraButtonIconSlot={<DeleteIcon size='24' />}
      extraButtonTextSlot='Delete'
      onClose={onClose}
      onSubmit={onSubmit}
      onExtraButtonClick={onExtraButtonClick}
    >
      <form className='flex flex-col'>
        <InputText
          required
          ref={titleRef}
          label='Title'
          error={titleError}
          placeholder='Title'
          onChange={(e) => {
            const newTitle = e.target.value.trim();
            setTitle(newTitle);
            setTitleTouched(true);
            if (newTitle) setColor(user?.activities[newTitle] ?? DEFAULT_COLOR);
          }}
          onBlur={async (e) => {
            if (!titleTouched) return;
            const error = validateTitle(e.target.value);
            if (error) return setTitleError(error);
            setTitleError(undefined);
          }}
          valid={!titleError}
          value={title}
        />
        <InputText
          required
          label='Group'
          error={groupError}
          placeholder='Group'
          onChange={(e) => {
            setGroup(e.target.value);
            setGroupTouched(true);
          }}
          onBlur={async (e) => {
            if (!groupTouched) return;
            const error = validateGroup(e.target.value);
            if (error) return setGroupError(error);
            setGroupError(undefined);
          }}
          valid={!groupError}
          value={group}
        />
        <InputTextArea
          label='Notes'
          placeholder='Notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
        <div className='my-1'>
          <div className='flex justify-between gap-4'>
            <InputDateTime
              required
              label='Start'
              placeholder='Start'
              onChange={(e) => {
                setStart(e.target.value);
                setDateTouched(true);
              }}
              onBlur={(e) => {
                if (!dateTouched) return;
                const error = validateDates(e.target.value, end);
                if (error) return setDateError(error);
                setDateError(undefined);
              }}
              valid={!dateError}
              value={start}
            />
            <InputDateTime
              required
              label='End'
              placeholder='End'
              onChange={(e) => {
                setEnd(e.target.value);
                setDateTouched(true);
              }}
              onBlur={(e) => {
                if (!dateTouched) return;
                const error = validateDates(start, e.target.value);
                if (error) return setDateError(error);
                setDateError(undefined);
              }}
              valid={!dateError}
              value={end}
            />
          </div>
          {dateError && <InputErrorLine error={dateError} />}
        </div>
        <InputColor value={color} onChange={setColor} />
      </form>
    </SidePanel>
  );
}

function validateTitle(title: string) {
  if (!title.trim()) return 'Title is required';
  return undefined;
}

function validateGroup(group: string) {
  if (!group.trim()) return 'Group is required';
  return undefined;
}

function validateDates(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (startDate.getTime() >= endDate.getTime()) {
    return 'Start must be before end';
  }

  return undefined;
}
