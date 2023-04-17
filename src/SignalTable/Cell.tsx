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
      ref.current.style.color = 'white';
    } else if (cv.value !== cellValue) {
      ref.current.style.backgroundColor = 'green';
      ref.current.style.color = 'white';
      ctx?.cellChangeMap.value.set(`${rowId}|${name}`, cv.value);
    } else {
      ref.current.style.backgroundColor = 'white';
      ref.current.style.color = 'black';
    }
  });
  return (
    <td className="border border-slate-300">
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
          className={`text-sm font-light px-6 py-4 whitespace-nowrap text-center`}
          type="text"
          name={name}
          value={cellValue}
          disabled={true}
        />
      )}
    </td>
  );
}
