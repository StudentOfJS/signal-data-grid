import { useSignal, useSignalEffect } from '@preact/signals-react';
import { useContext, useRef } from 'react';
import { datefix } from '../SignalTable/dateFix';
import { TableContext } from '../SignalTable/Table';

export function Cell({
  cellValue,
  name,
  rowId,
}: {
  cellValue: string;
  name: string;
  rowId: string;
}) {
  const ctx = useContext(TableContext);
  const cv = useSignal(cellValue);
  const ref = useRef<HTMLInputElement>(null);
  let colDef = ctx?.columns.value.find((x) => x.field === name);
  let type = colDef?.cellOptions?.type ?? 'text';
  useSignalEffect(() => {
    if (!ref.current) return;
    ctx?.cellChangeMap.value.delete(`${rowId}|${name}`);
    if (cv.value === '') {
      ref.current.style.backgroundColor = 'crimson';
      ref.current.style.color = 'transparent';
    } else if (cv.value !== cellValue) {
      let isValid = colDef?.validation && colDef.validation(cv.value);
      ref.current.style.backgroundColor = isValid ? 'green' : 'crimson';
      ref.current.style.color = 'transparent';
      ctx?.cellChangeMap.value.set(`${rowId}|${name}`, cv.value);
    } else {
      ref.current.style.backgroundColor = 'transparent';
      ref.current.style.color = 'black';
    }
  });
  return (
    <td className="border border-slate-300 block md:table-cell">
      <span className="inline-block w-1/3 md:hidden font-bold">{name}</span>
      {colDef?.isEditable ? (
        <input
          className={`text-sm font-light px-6 py-4 whitespace-nowrap text-center`}
          {...colDef?.cellOptions!}
          name={name}
          defaultValue={type === 'date' ? datefix(cellValue) : cellValue}
          onChange={(e) => {
            cv.value = e.target.value;
          }}
          ref={ref}
        />
      ) : (
        <input
          className={`text-sm font-light px-6 py-4 whitespace-nowrap text-center bg-transparent`}
          type="text"
          name={name}
          value={cellValue}
          disabled={true}
        />
      )}
    </td>
  );
}
