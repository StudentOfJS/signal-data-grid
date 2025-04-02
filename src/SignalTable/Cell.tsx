import { useSignal, useSignalEffect } from '@preact/signals-react';
import { useRef } from 'react';
import { datefix } from '../SignalTable/dateFix';
import { cellChangeMap, columns, columnWidths } from '../SignalTable/Table';

export function Cell({
  cellValue,
  name,
  rowId,
}: {
  cellValue: string;
  name: string;
  rowId: string;
}) {
  const cv = useSignal(cellValue);
  const ref = useRef<HTMLInputElement>(null);
  const colDef = columns.value.find((x) => x.field === name);
  const type = colDef?.cellOptions?.type ?? 'text';

  useSignalEffect(() => {
    if (!ref.current) return;
    cellChangeMap.value.delete(`${rowId}|${name}`);
    
    if (cv.value === '') {
      ref.current.style.backgroundColor = 'crimson';
      ref.current.style.color = 'transparent';
    } else if (cv.value !== cellValue && colDef?.validation) {
      const isValid = colDef.validation(cv.value);
      ref.current.style.backgroundColor = isValid ? 'green' : 'crimson';
      ref.current.style.color = 'white';
      cellChangeMap.value.set(`${rowId}|${name}`, cv.value);
    } else if (cv.value !== cellValue) {
      ref.current.style.backgroundColor = 'green';
      ref.current.style.color = 'white';
      cellChangeMap.value.set(`${rowId}|${name}`, cv.value);
    } else {
      ref.current.style.backgroundColor = 'transparent';
      ref.current.style.color = 'black';
    }
  });

  return (
    <td 
      className="border border-slate-300"
      style={{ 
        width: columnWidths.value[name] ? `${columnWidths.value[name]}px` : '100%',
        minWidth: '150px',
        maxWidth: columnWidths.value[name] ? `${columnWidths.value[name]}px` : '200px',
        overflow: 'hidden'
      }}
    >
      <label htmlFor={`${name}-${rowId}`} className="block text-center not-sr-only sm:sr-only">{name}</label>
      {colDef?.isEditable ? (
          <input
            id={`${name}-${rowId}`}
            className="text-sm font-light px-6 py-4 text-center w-full overflow-hidden text-ellipsis text-black"
            {...colDef?.cellOptions}
            name={name}
            defaultValue={type === 'date' ? datefix(cellValue) : cellValue}
            onChange={(e) => {
              cv.value = e.target.value;
            }}
            ref={ref}
          />
      ) : (
        <input
          id={`${name}-${rowId}`}
          className={`text-sm font-light px-6 py-4 whitespace-nowrap text-center text-black bg-transparent w-full`}
          type="text"
          name={name}
          value={cellValue}
          readOnly={true}
          aria-label={name}
        />
      )}
    </td>
  );
}
