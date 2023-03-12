import { useSignalEffect } from '@preact/signals-react';
import { Fragment, useContext, useState } from 'react';
import { TableContext } from '../SignalTable/Table';
import { Row } from './Row';

export function Rows() {
  const ctx = useContext(TableContext);
  const [rows, setRows] = useState(ctx?.sortedRows.value);
  useSignalEffect(() => {
    setRows(ctx?.sortedRows.value);
  });
  let mapped =
    rows &&
    ctx?.fk &&
    ctx?.columns &&
    rows.map((row) => {
      let uniqueId = row[ctx.fk.value] as string;
      return (
        <Fragment key={`${uniqueId}`}>
          <Row
            row={
              Object.entries(row).filter((r) =>
                ctx.columns.value.map((c) => c.field).includes(r[0])
              ) as [string, string][]
            }
            rowId={`${uniqueId}`}
          />
        </Fragment>
      );
    });
  return <tbody>{mapped}</tbody>;
}
