import { Fragment, memo } from 'react';
import { Cell } from './Cell';

export const Row = memo(function ({
  row,
  rowId,
  color,
}: {
  row: [string, string][];
  rowId: string;
  color?: string;
}) {
  return (
    <tr
      className={
        color
          ? `bg-${color}-300 border-b transition duration-300 ease-in-out hover:bg-${color}-100 block md:table-row`
          : 'bg-white even:bg-gray-100 border-b transition duration-300 ease-in-out hover:bg-gray-100 block md:table-row'
      }
    >
      {row?.map(([key, value]) => {
        let name = `${key}|${rowId}`;
        return (
          <Fragment key={name}>
            <Cell cellValue={value} name={key} rowId={rowId} />
          </Fragment>
        );
      })}
    </tr>
  );
});
