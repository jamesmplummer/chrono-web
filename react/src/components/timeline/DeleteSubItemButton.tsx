import { CloseIcon } from '../icon/icons';

export type DeleteSubItemButtonProps = {
  onClick: () => void;
};

export function DeleteSubItemButton(props: DeleteSubItemButtonProps) {
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    props.onClick();
  }

  return (
    <button
      onClick={onClick}
      className='flex items-center rounded-[3px] px-1 py-0.5 text-xs font-bold focus:outline focus:outline-1 focus:outline-slate-500'
    >
      <CloseIcon size='18' className='text-red-500' />
    </button>
  );
}
