import { useSignalEffect } from '@preact/signals-react';
import { Fragment, useContext, useState } from 'react';
import { TableContext } from '../SignalTable/Table';

export function Rows() {
  const ctx = useContext(TableContext);
  const [rows, setRows] = useState(ctx?.sortedRows.value);
  useSignalEffect(() => {
    setRows(ctx?.sortedRows.value);
  });
  if (!rows || !ctx?.foreignKey || !ctx?.columnDefs) {
    return null;
  }
  return (
    <tbody className="block md:table-row-group">
      {rows.map((row, index) => {
        if (
          ctx.groupBy &&
          index === 0 &&
          (ctx.sortDirection.value === 'none' ||
            ctx.sortBy.value === ctx.groupBy)
        ) {
          return (
            <Fragment key={row.id as string}>
              <tr
                className={`bg-${row.color}-500 transition duration-300 ease-in-out block md:table-row text-center`}
              >
                <td
                  className="block md:table-cell"
                  colSpan={ctx.columnDefs.length + 1}
                >
                  {row[ctx.groupBy]}
                </td>
              </tr>
              {row.element}
            </Fragment>
          );
        }
        if (
          ctx.groupBy &&
          index > 0 &&
          rows[index - 1][ctx.groupBy] !== row[ctx.groupBy] &&
          (ctx.sortDirection.value === 'none' ||
            ctx.sortBy.value === ctx.groupBy)
        ) {
          return (
            <Fragment key={row.id as string}>
              <tr
                className={`bg-${row.color}-500 transition duration-300 ease-in-out block md:table-row text-center`}
              >
                <td
                  className="block md:table-cell"
                  colSpan={ctx.columnDefs.length + 1}
                >
                  {row[ctx.groupBy]}
                </td>
              </tr>
              {row.element}
            </Fragment>
          );
        }
        return <Fragment key={row.id as string}>{row.element}</Fragment>;
      })}
    </tbody>
  );
}
