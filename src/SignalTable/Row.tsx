import { Fragment, memo } from 'react';
import { Cell } from './Cell';

export const Row = memo(function ({
  row,
  rowId,
}: {
  row: [string, string][];
  rowId: string;
}) {
  return (
    <tr className="bg-white even:bg-gray-100 border-b transition duration-300 ease-in-out hover:bg-gray-100 block sm:table-row">
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
