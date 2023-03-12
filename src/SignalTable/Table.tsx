import { useCallback, useEffect, useState } from 'react';
import { SubmitWrapper } from '../SignalTable/SubmitWrapper';
import { columns, rows, fk, type TableType } from '../SignalTable/TableContext';
import { Cols } from './Cols';
import { Rows } from './Rows';

export const Table: React.FC<TableType> = ({
  foreignKey,
  rowData,
  columnDefs,
  handleSubmit,
  renderButton,
}) => {
  const [_, setReady] = useState<boolean>(false);
  // use later to provide table reset function
  const init = useCallback(() => {
    columns.value = columnDefs;
    rows.value = rowData;
    fk.value = foreignKey;
    setReady(true);
  }, [columnDefs]);
  useEffect(() => {
    init();
  }, [columnDefs]);
  return (
    <SubmitWrapper handleSubmit={handleSubmit}>
      <table className="min-w-full">
        <Cols />
        <Rows />
      </table>
      {renderButton && renderButton()}
    </SubmitWrapper>
  );
};
