import { useComputed } from '@preact/signals-react';
import { Fragment } from 'react';
import { rows } from './Table';


export function Rows() {
  const tableRows = useComputed(() => {
    return rows.value?.map((row) => (
      <Fragment key={row.id as string}>{row.element}</Fragment>
    ))
  })
  return (
    <tbody className="block sm:table-row-group">
      {tableRows}
    </tbody>
  );
}
