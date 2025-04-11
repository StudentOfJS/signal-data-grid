import { useSignal, useSignalEffect } from '@preact/signals-react';
import {useFocusWithin} from 'react-aria'
import { memo, useRef } from 'react';
import { datefix } from '../SignalTable/dateFix';
import { cellChangeMap, columns, columnWidths } from '../SignalTable/Table';


export const Cell = memo<{
  cellValue: string;
  name: string;
  rowId: string;
}>(function Cell({
  cellValue,
  name,
  rowId,
}) {
  const cv = useSignal(cellValue);
  const ref = useRef<HTMLInputElement>(null);
  const colDef = columns.value.find((x) => x.field === name);
  const type = colDef?.cellOptions?.type ?? 'text';
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      isEditing.value = !isEditing.value;
      if (isEditing.value) {
        setTimeout(() => ref.current?.select(), 0);
      }
    } else if (e.key === 'Escape') {
      cv.value = cellValue; // Reset to original
      isEditing.value = false;
    }
  };
  const isEditing = useSignal(false);
    let { focusWithinProps } = useFocusWithin({
      onFocusWithin: () =>
        isEditing.value = true,
      onBlurWithin: () =>
        isEditing.value = false,
    })

    useSignalEffect(() => {
      if (!ref.current) return;
      cellChangeMap.value.delete(`${rowId}|${name}`);
      
      ref.current.className = "text-sm font-light px-6 py-4 text-center w-full " + 
        (cv.value === '' ? 'bg-red-500 text-transparent' :
        cv.value !== cellValue && colDef?.validation ? 
          (colDef.validation(cv.value) ? 'bg-green-500 text-white' : 'bg-red-500 text-white') :
        cv.value !== cellValue ? 'bg-green-500 text-white' : 'bg-transparent text-black');
      
      if (cv.value !== cellValue) {
        cellChangeMap.value.set(`${rowId}|${name}`, cv.value);
      }
    });

  return (
    <td 
      className="border border-slate-300"
      {...focusWithinProps}
      style={{ 
        width: columnWidths.value[name] ? `${columnWidths.value[name]}px` : '100%',
        minWidth: '150px',
        maxWidth: columnWidths.value[name] ? `${columnWidths.value[name]}px` : '200px',
        overflow: 'hidden'
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <label htmlFor={`${name}-${rowId}`} className="block text-center not-sr-only sm:sr-only">{name}</label>
      {colDef?.isEditable && isEditing ? (
          <input
            id={`${name}-${rowId}`}
            className="text-sm font-light px-6 py-4 text-center w-full overflow-hidden text-ellipsis text-black"
            {...colDef?.cellOptions}
            name={name}
            defaultValue={type === 'date' ? datefix(cellValue) : cellValue}
            onChange={(e) => {
              e.preventDefault();
              cv.value = e.target.value;
            }}
            ref={ref}
          />
      ) : (
        <span className={`text-sm font-light px-6 py-4 whitespace-nowrap text-center text-black bg-transparent w-full`}>{cellValue}</span>
      )}
    </td>
  );
})
