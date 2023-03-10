import { useEffect, useState } from 'react';
import { SubmitWrapper } from '../SignalTable/SubmitWrapper';
import { columns, rows, fk } from '../SignalTable/TableContext';
import { Cols } from './Cols';
import { Rows } from './Rows';

interface TableInterface {
  rowData: Array<Record<string, string | number | boolean | null>>;
  foreignKey: string;
  columnDefs: Array<{
    field: string;
    cellType?: 'text' | 'number' | 'date' | 'boolean' | 'email';
    isEditable?: boolean;
    validation?: {
      // zod schema???
    };
  }>;
  renderButton?: () => JSX.Element;
  handleSubmit?: (
    data: Array<Record<string, string | number | boolean | null | undefined>>
  ) => void;
}

export const Table: React.FC<TableInterface> = ({
  foreignKey,
  rowData,
  columnDefs,
  handleSubmit,
  renderButton,
}) => {
  const [_, setReady] = useState<boolean>(false);
  useEffect(() => {
    columns.value = columnDefs;
    rows.value = rowData;
    fk.value = foreignKey;
    setReady(true);
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
