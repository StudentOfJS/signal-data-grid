import { useSignalEffect } from '@preact/signals-react';
import { Fragment, useContext, useState } from 'react';
import { TableContext } from '../SignalTable/Table';

export function Rows() {
  const ctx = useContext(TableContext);
  const [rows, setRows] = useState(ctx?.sortedRows.value);
  useSignalEffect(() => {
    setRows(ctx?.sortedRows.value);
  });
  if (!rows || !ctx?.fk || !ctx?.columns) {
    return null;
  }
  return (
    <tbody className="block sm:table-row-group">
      {rows.map((row) => {
        return <Fragment key={row.id as string}>{row.element}</Fragment>;
      })}
    </tbody>
  );
}
