import { Fragment } from 'react';
import { columns, fk, rows } from '../SignalTable/TableContext';
import { Row } from './Row';

export function Rows() {
  let mapped = rows.value.map((row) => {
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
