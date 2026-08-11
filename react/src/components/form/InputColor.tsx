import { useEffect, useRef, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { useDetectClickOutside } from '../../hooks/useDetectClickOutside';
import { DEFAULT_COLOR } from '../../types/style';

const colorMatrix = [
  [
    DEFAULT_COLOR,
    '#7e7e7e', // rgb(126, 126, 126)
    '#323232', // rgb(50, 50, 50)
    '#000000', // rgb(0, 0, 0)
    '#003f06', // rgb(0, 63, 6)
    '#007613', // rgb(0, 118, 19)
    '#04da00' // rgb(4, 218, 0)
  ],
  [
    '#ffd600', // rgb(255, 214, 0)
    '#ff5600', // rgb(255, 86, 0)
    '#b14000', // rgb(177, 64, 0)
    '#561a00', // rgb(86, 26, 0)
    '#000080', // rgb(0, 0, 128)
    '#0000ff', // rgb(0, 0, 255)
    '#26cbff' // rgb(38, 203, 255)
  ],
  [
    '#ff00c7', // rgb(255, 0, 199)
    '#c00096', // rgb(192, 0, 150)
    '#ea0000', // rgb(234, 0, 0)
    '#7e0000', // rgb(126, 0, 0)
    '#4b006f', // rgb(75, 0, 111)
    '#9b00fa', // rgb(155, 0, 250)
    '#008080' // rgb(0, 128, 128)
  ]
];

export type InputColorProps = {
  value: string;
  onChange: (color: string) => void;
};

export function InputColor(props: InputColorProps) {
  const [cursor, setCursor] = useState([0, 0]);

  const colorModalRef = useRef<HTMLDivElement>(null);
  const colorModalButtonRef = useRef<HTMLDivElement>(null);
  const { colorOpen, onColorToggle } = useModal('color');
  useDetectClickOutside([colorModalRef, colorModalButtonRef], onColorToggle);

  const colorRefs = colorMatrix.map((row) => {
    return row.map(() => useRef<HTMLButtonElement>(null));
  });

  function onColorChange(color: string) {
    props.onChange(color);
    onColorToggle();
  }

  useEffect(() => {
    if (!colorOpen) return;
    const [rowIndex, colIndex] = cursor;
    colorRefs[rowIndex][colIndex].current?.focus();
  }, [colorOpen]);

  function onFocus(
    direction: 'up' | 'down' | 'left' | 'right',
    rowIndex: number,
    colIndex: number
  ) {
    let targetColIndex: number;
    let targetRowIndex: number;
    switch (direction) {
      case 'up':
        targetRowIndex = rowIndex === 0 ? 2 : rowIndex - 1;
        targetColIndex = colIndex;
        break;
      case 'down':
        targetRowIndex = rowIndex === 2 ? 0 : rowIndex + 1;
        targetColIndex = colIndex;
        break;
      case 'left':
        targetRowIndex = rowIndex;
        targetColIndex = colIndex === 0 ? 6 : colIndex - 1;
        break;
      case 'right':
        targetRowIndex = rowIndex;
        targetColIndex = colIndex === 6 ? 0 : colIndex + 1;
        break;
    }
    setCursor([targetRowIndex, targetColIndex]);
    colorRefs[targetRowIndex][targetColIndex].current?.focus();
  }

  return (
    <>
      <span className='mt-2 mb-1 text-xs'>Color</span>
      <div
        id='color'
        ref={colorModalButtonRef}
        role='button'
        tabIndex={0}
        onClick={onColorToggle}
        onKeyUp={(e) => {
          if (e.key === 'Enter') onColorToggle();
        }}
        style={{ backgroundColor: props.value }}
        className='m-px mb-1 h-8 w-12 rounded-[3px] focus:border focus:border-slate-500 focus:outline-none'
      />

      {colorOpen && (
        <div
          ref={colorModalRef}
          className='flex flex-col'
          onKeyUp={(e) => {
            if (e.key === 'k') onFocus('up', cursor[0], cursor[1]);
            if (e.key === 'j') onFocus('down', cursor[0], cursor[1]);
            if (e.key === 'h') onFocus('left', cursor[0], cursor[1]);
            if (e.key === 'l') onFocus('right', cursor[0], cursor[1]);
            if (e.key === 'Escape') onColorToggle();
            e.stopPropagation();
          }}
        >
          {colorMatrix.map((row, rowIndex) => (
            <div key={rowIndex} className='flex'>
              {row.map((color, colIndex) => {
                const colorRef = colorRefs[rowIndex][colIndex];

                function onClick() {
                  onColorChange(color);
                  setCursor([rowIndex, colIndex]);
                }

                return (
                  <button
                    key={color}
                    id={color}
                    ref={colorRef}
                    style={{ backgroundColor: color }}
                    tabIndex={colorOpen ? 0 : -1}
                    onClick={onClick}
                    className='m-px h-8 w-12 rounded-[3px] focus:outline-1 focus:outline-slate-500'
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
