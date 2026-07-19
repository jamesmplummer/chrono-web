import { useRef } from 'react';
import { InputColor } from '../form/InputColor';
import { InputDateTime } from '../form/InputDateTime';
import { InputText } from '../form/InputText';
import { InputTextArea } from '../form/InputTextArea';
import { DeleteIcon } from '../icon/icons';
import { SidePanel } from '../layout/SidePanel';
import { useFocusOnOpen } from '../../hooks/useFocusOnOpen';

export type ActivityDefaultFormProps = {
  open: boolean;
  onClose: () => void;
  data?: Record<any, any>;
};

export function ActivityDefaultForm(props: ActivityDefaultFormProps) {
  function onCreate() {
    console.log('onCreate');
    props.onClose();
  }

  function onUpdate() {
    console.log('onUpdate');
    props.onClose();
  }

  function onDelete() {
    console.log('onDelete');
    props.onClose();
  }

  const titleRef = useRef<HTMLInputElement | null>(null);
  useFocusOnOpen(titleRef, props.open);

  const titleText = props.data ? 'Update Activity' : 'Add Activity';
  const descriptionExtraText = props.data ? '[ Current Duration: 0h 0m ]' : '';
  const onSubmit = props.data ? onUpdate : onCreate;
  const submitButtonText = titleText;
  const onExtraButtonClick = props.data ? onDelete : undefined;

  return (
    <SidePanel
      open={props.open}
      titleTextSlot={titleText}
      descriptionTextSlot='Record the time spent doing an activity'
      descriptionExtraSlot={descriptionExtraText}
      submitButtonTextSlot={submitButtonText}
      extraButtonIconSlot={<DeleteIcon size='24' />}
      extraButtonTextSlot='Delete'
      onClose={props.onClose}
      onSubmit={onSubmit}
      onExtraButtonClick={onExtraButtonClick}
    >
      <form className='flex flex-col'>
        <InputText
          required
          ref={titleRef}
          label='Title'
          placeholder='Title'
          onChange={(e) => console.log(e.target.value)}
          value={''}
          onBlur={() => {}}
        />
        <InputText
          required
          label='Group'
          placeholder='Group'
          onChange={(e) => console.log(e.target.value)}
          value={''}
          onBlur={() => {}}
        />
        <InputTextArea
          label='Notes'
          placeholder='Notes'
          onChange={(e) => console.log(e.target.value)}
          value={''}
          onBlur={() => {}}
        />
        <div className='my-1 flex justify-between gap-4'>
          <InputDateTime
            required
            label='Start'
            placeholder='Start'
            onChange={(e) => console.log(e.target.value)}
            value={''}
            onBlur={() => {}}
          />
          <InputDateTime
            required
            label='End'
            placeholder='End'
            onChange={(e) => console.log(e.target.value)}
            value={''}
            onBlur={() => {}}
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
