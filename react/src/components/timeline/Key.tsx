import { useRef } from 'react';
import { useDetectClickOutside } from '../../hooks/useDetectClickOutside';
import { useModal } from '../../hooks/useModal';
import { millisecondsToHoursAndMinutes } from '../../utils/date';
import { KeyIcon } from '../icon/icons';

export type KeyProps = {
  values: Record<string, [number, string]>;
};

export function Key(props: KeyProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const { keyOpen, onKeyToggle } = useModal('key');
  useDetectClickOutside([modalRef, modalButtonRef], onKeyToggle);

  const entries = Object.entries(props.values);

  return (
    <>
      <div className='hidden sm:flex'>
        <ul className='flex flex-wrap'>
          {entries.map(([key, value]) => {
            return (
              <li key={key} className='mr-5 flex items-center last:mr-2'>
                <KeyItem label={key} value={value} />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        ref={modalButtonRef}
        onClick={onKeyToggle}
        className='relative flex h-9 w-11 cursor-pointer items-center justify-center rounded-[4px] bg-gradient-to-r from-slate-700 to-slate-800 p-1.5 text-slate-200 sm:hidden'
      >
        <KeyIcon size={24} />
        <div className='absolute top-[-6px] right-[-6px] flex h-[18px] w-[18px] items-center justify-center rounded-sm border border-slate-600 bg-slate-100 font-mono text-[11px] text-slate-600'>
          <span>{Object.keys(props.values).length}</span>
        </div>
      </button>

      {keyOpen && (
        <div ref={modalRef} className='relative'>
          <div className='absolute top-0.5 z-20 flex w-[268px] flex-col bg-transparent'>
            <div className='flex h-6 w-full items-center justify-center rounded-t-[4px] bg-gradient-to-r from-slate-700 to-slate-800 text-slate-200'>
              <div className='flex w-full items-center justify-between p-2'>
                <div className='mb-px flex h-full flex-col justify-center overflow-hidden text-xs leading-3'>
                  <p className='flex font-mono text-[11px]/[11px] font-light tracking-tight text-ellipsis text-slate-200'>
                    Recorded Activities
                  </p>
                </div>
              </div>
            </div>

            <ul className='flex flex-wrap content-start rounded-b-[4px] bg-white p-0.5 pb-1 drop-shadow-lg'>
              {entries.map(([key, value]) => {
                return (
                  <li
                    key={key}
                    className='m-0.5 flex h-7 w-32 items-center overflow-hidden'
                  >
                    <KeyItem label={key} value={value} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

type KeyItemProps = {
  label: string;
  value: readonly [number, string];
};

function KeyItem(props: KeyItemProps) {
  return (
    <>
      <div
        style={{ backgroundColor: props.value[1] }}
        className='m-1 h-7 w-7 min-w-7 rounded-sm'
      />
      <div className='mb-px ml-1 flex h-full flex-col justify-center overflow-hidden text-xs leading-3'>
        <p className='ml-px overflow-hidden text-ellipsis text-slate-600'>
          {props.label}
        </p>
        <div className='flex font-mono text-[11px]/[11px] font-light tracking-tight text-ellipsis text-slate-400'>
          [
          <span className='mr-0.5'>
            {millisecondsToHoursAndMinutes(props.value[0]).hours}h
          </span>
          {millisecondsToHoursAndMinutes(props.value[0]).minutes}m]
        </div>
      </div>
    </>
  );
}
