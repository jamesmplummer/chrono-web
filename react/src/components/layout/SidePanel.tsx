import { mdiTimelapse } from '@mdi/js';
import { CloseIcon, SubmitIcon, type IconComponent } from '../icon/icons';
import { Icon } from '@mdi/react';
import { memo } from 'react';

export const DefaultTitleIcon: IconComponent = (props) => {
  return <Icon size='36' {...props} path={mdiTimelapse} />;
};

export type SidePanelProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  titleTextSlot: React.ReactNode;
  descriptionTextSlot: React.ReactNode;
  submitButtonTextSlot: React.ReactNode;
  children: React.ReactNode;
  disableSubmit?: boolean;
  disableExtra?: boolean;
  titleIconSlot?: React.ReactNode;
  descriptionExtraSlot?: React.ReactNode;
  submitButtonIconSlot?: React.ReactNode;
  extraButtonIconSlot?: React.ReactNode;
  extraButtonTextSlot?: React.ReactNode;
  onExtraButtonClick?: () => void;
};

export function SidePanel({
  open,
  disableSubmit,
  disableExtra,
  onClose,
  onSubmit,
  onExtraButtonClick,
  titleIconSlot = <DefaultTitleIcon />,
  titleTextSlot,
  descriptionTextSlot,
  descriptionExtraSlot,
  submitButtonIconSlot = <SubmitIcon size='24' />,
  submitButtonTextSlot,
  extraButtonIconSlot,
  extraButtonTextSlot,
  children
}: SidePanelProps) {
  return (
    <>
      <div
        tabIndex={0}
        className={`${open ? '' : 'translate-x-full md:translate-x-96'} fixed top-0 right-0 z-40 flex h-dvh w-screen flex-col overflow-hidden overflow-y-auto bg-slate-50 duration-200 md:w-96`}
        onKeyUp={(e) => {
          if (e.key === 'Escape') onClose();
        }}
      >
        <Header
          titleTextSlot={titleTextSlot}
          descriptionTextSlot={descriptionTextSlot}
          descriptionExtraSlot={descriptionExtraSlot}
          titleIconSlot={titleIconSlot}
          onClose={onClose}
        />

        <section className='mr-0.5 ml-4 flex flex-1 scrollbar-gutter-stable flex-col overflow-y-auto pr-0.5'>
          {children}
        </section>

        <Actions
          disableSubmit={disableSubmit}
          disableExtra={disableExtra}
          onSubmit={onSubmit}
          onExtraButtonClick={onExtraButtonClick}
          submitButtonIconSlot={submitButtonIconSlot}
          submitButtonTextSlot={submitButtonTextSlot}
          extraButtonIconSlot={extraButtonIconSlot}
          extraButtonTextSlot={extraButtonTextSlot}
        />
      </div>

      <div
        onClick={onClose}
        className={`${
          open
            ? 'w-full opacity-20 [transition:opacity_0.2s_cubic-bezier(0.4,0,0.2,1)_0s]'
            : 'w-0 opacity-0 [transition:width,_0s,_linear,_1s,opacity_0.2s_cubic-bezier(0.4,0,0.2,1)_0s]'
        } fixed z-30 h-full bg-black`}
      />
    </>
  );
}

type HeaderProps = {
  titleTextSlot: React.ReactNode;
  descriptionTextSlot: React.ReactNode;
  descriptionExtraSlot: React.ReactNode;
  titleIconSlot: React.ReactNode;
  onClose: () => void;
};

const Header = memo(
  ({
    titleTextSlot,
    descriptionTextSlot,
    descriptionExtraSlot,
    titleIconSlot,
    onClose
  }: HeaderProps) => {
    return (
      <header
        className={`relative mb-2 flex flex-col items-start justify-between border-b-2 border-b-slate-300 bg-gradient-to-r from-slate-700 to-slate-800`}
      >
        <div
          className={`${descriptionExtraSlot ? 'h-[78px] sm:h-[72px]' : 'h-[82px] sm:h-[76px]'} flex flex-col`}
        >
          <span className='mt-3 ml-4 flex flex-row items-center'>
            <div className='flex h-9 w-9 items-center justify-center text-slate-50 sm:h-8 sm:w-8'>
              {titleIconSlot}
            </div>
            <h1 className='ml-1.5 text-[34px]/[38px] font-bold text-slate-50 sm:text-3xl'>
              {titleTextSlot}
            </h1>
          </span>
          <h6 className='ml-5 text-sm/[18px] font-light text-slate-300/80 sm:text-xs/[14px]'>
            {descriptionTextSlot}
          </h6>
        </div>
        <div
          className={`${descriptionExtraSlot ? 'flex' : 'hidden'} h-7 w-full items-center bg-slate-800 pb-0.5 pl-5 text-[12px]/[12px] font-light text-slate-300 sm:h-6 sm:text-[10px]/[10px]`}
        >
          {descriptionExtraSlot}
        </div>
        <button
          className='absolute top-0 right-0 m-2 cursor-pointer text-slate-200'
          onClick={onClose}
        >
          <CloseIcon size='28' />
        </button>
      </header>
    );
  },
  (prev, next) => {
    return (
      prev.titleTextSlot === next.titleTextSlot &&
      prev.descriptionTextSlot === next.descriptionTextSlot &&
      prev.descriptionExtraSlot === next.descriptionExtraSlot &&
      prev.titleIconSlot === next.titleIconSlot
    );
  }
);

type ActionsProps = {
  disableSubmit?: boolean;
  disableExtra?: boolean;
  onSubmit: () => void;
  onExtraButtonClick?: () => void;
  submitButtonIconSlot: React.ReactNode;
  submitButtonTextSlot: React.ReactNode;
  extraButtonIconSlot?: React.ReactNode;
  extraButtonTextSlot?: React.ReactNode;
};

const Actions = memo(
  ({
    disableSubmit,
    disableExtra,
    onSubmit,
    onExtraButtonClick,
    submitButtonIconSlot,
    submitButtonTextSlot,
    extraButtonIconSlot,
    extraButtonTextSlot
  }: ActionsProps) => {
    return (
      <section className='my-4 flex w-full gap-4 px-4'>
        {onExtraButtonClick && (
          <button
            className={`${
              disableExtra
                ? 'border-slate-400/40 bg-slate-300 text-slate-400'
                : 'border-slate-700 bg-white text-slate-700'
            } flex h-12 flex-5 cursor-pointer items-center justify-center gap-1 rounded-[3px] border focus:outline-slate-400 sm:h-10 sm:text-sm`}
            disabled={disableExtra}
            onClick={onExtraButtonClick}
          >
            {extraButtonIconSlot}
            {extraButtonTextSlot}
          </button>
        )}
        <button
          className={`${
            disableSubmit
              ? 'bg-slate-400 text-slate-200'
              : 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-50'
          } flex h-12 flex-6 cursor-pointer items-center justify-center gap-1 rounded-[3px] focus:outline-slate-400 sm:h-10 sm:text-sm`}
          disabled={disableSubmit}
          onClick={onSubmit}
        >
          {submitButtonIconSlot}
          {submitButtonTextSlot}
        </button>
      </section>
    );
  },
  (prev, next) => {
    return (
      prev.disableSubmit === next.disableSubmit &&
      prev.disableExtra === next.disableExtra &&
      prev.onSubmit === next.onSubmit &&
      prev.onExtraButtonClick === next.onExtraButtonClick &&
      prev.submitButtonIconSlot === next.submitButtonIconSlot &&
      prev.submitButtonTextSlot === next.submitButtonTextSlot &&
      prev.extraButtonIconSlot === next.extraButtonIconSlot &&
      prev.extraButtonTextSlot === next.extraButtonTextSlot
    );
  }
);
