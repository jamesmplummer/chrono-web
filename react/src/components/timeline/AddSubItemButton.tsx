import { AddIcon } from '../icon/icons';

export type AddSubItemButtonProps = {
  onClick: () => void;
};

export function AddSubItemButton(props: AddSubItemButtonProps) {
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    props.onClick();
  }

  return (
    <button
      onClick={onClick}
      className='flex items-center rounded-[3px] px-1 py-0.5 text-xs text-slate-800 focus:outline focus:outline-1 focus:outline-slate-500'
    >
      <AddIcon size='18' className='mr-px text-slate-800' />
      Add
    </button>
  );
}
