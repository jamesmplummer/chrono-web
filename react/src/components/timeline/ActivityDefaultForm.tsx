import { useEffect, useRef, useState } from 'react';
import { InputColor } from '../form/InputColor';
import { InputDateTime } from '../form/InputDateTime';
import { InputText } from '../form/InputText';
import { InputTextArea } from '../form/InputTextArea';
import { DeleteIcon } from '../icon/icons';
import { SidePanel } from '../layout/SidePanel';
import { useFocusOnOpen } from '../../hooks/useFocusOnOpen';
import type { ActivityBase } from '../../types/activity';

export type ActivityDefaultFormProps = {
  open: boolean;
  onClose: () => void;
  data?: ActivityBase;
};

export function ActivityDefaultForm({
  open,
  onClose,
  data
}: ActivityDefaultFormProps) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  useFocusOnOpen(titleRef, open);

  const [title, setTitle] = useState<string>(data?.title ?? '');
  const [group, setGroup] = useState<string>(data?.group ?? '');
  const [notes, setNotes] = useState<string>(data?.notes ?? '');
  const [start, setStart] = useState<string>(data?.start ?? '');
  const [end, setEnd] = useState<string>(data?.end ?? '');

  useEffect(() => {
    if (open) {
      setTitle(data?.title ?? '');
      setGroup(data?.group ?? '');
      setNotes(data?.notes ?? '');
      setStart(data?.start ?? '');
      setEnd(data?.end ?? '');
    }
  }, [open]);

  function onCreate() {
    console.log('onCreate');
    onClose();
  }

  function onUpdate() {
    console.log('onUpdate');
    onClose();
  }

  function onDelete() {
    console.log('onDelete');
    onClose();
  }

  const titleText = data ? 'Update Activity' : 'Add Activity';
  const descriptionExtraText = data ? '[ Current Duration: 0h 0m ]' : '';
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
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <InputText
          required
          label='Group'
          placeholder='Group'
          onChange={(e) => setGroup(e.target.value)}
          value={group}
        />
        <InputTextArea
          label='Notes'
          placeholder='Notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
        <div className='my-1 flex justify-between gap-4'>
          <InputDateTime
            required
            label='Start'
            placeholder='Start'
            onChange={(e) => setStart(e.target.value)}
            value={start}
          />
          <InputDateTime
            required
            label='End'
            placeholder='End'
            onChange={(e) => setEnd(e.target.value)}
            value={end}
          />
        </div>
        <InputColor
          value={'#e5e5e5'}
          onChange={(color) => console.log(color)}
        />
      </form>
    </SidePanel>
  );
}
