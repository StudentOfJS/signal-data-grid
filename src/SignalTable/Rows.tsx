import { useSignalEffect } from '@preact/signals-react';
import { Fragment, useContext, useState } from 'react';
import { TableContext } from '../SignalTable/Table';
import { Row } from './Row';

export function Rows() {
  const { columns, fk, sortedRows } = useContext(TableContext);
  const [rows, setRows] = useState(sortedRows.value);
  useSignalEffect(() => {
    setRows(sortedRows.value);
  });
  let mapped = rows.map((row) => {
    let uniqueId = row[fk.value] as string;
    return (
      <Fragment key={`${uniqueId}`}>
        <Row
          row={
            Object.entries(row).filter((r) =>
              columns.value.map((c) => c.field).includes(r[0])
            ) as [string, string][]
          }
          rowId={`${uniqueId}`}
        />
      </Fragment>
    );
  });
  return <tbody>{mapped}</tbody>;
}
