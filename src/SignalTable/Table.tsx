import { createContext, useCallback, useEffect, useState } from 'react';
import {
  useSignal,
  useComputed,
  type ReadonlySignal,
  type Signal,
} from '@preact/signals-react';
import { sort } from '../SignalTable/sort';
import { SubmitWrapper } from '../SignalTable/SubmitWrapper';
import { Cols } from './Cols';
import { Rows } from './Rows';

type ColumnDefsType = Array<{
  field: string;
  // cellType?: 'text' | 'number' | 'date' | 'boolean' | 'email';
  cellOptions?: React.InputHTMLAttributes<HTMLInputElement>
  isEditable?: boolean;
  isSortable?: boolean;
  validation?: (value: string | number | boolean) => boolean // field validation function -> return true if valid
}>;

interface TableType {
  rowData: Array<Record<string, string | number | boolean | null>>;
  foreignKey: string;
  columnDefs: ColumnDefsType;
  renderButton?: () => JSX.Element;
  handleSubmit?: (
    data: Array<Record<string, string | number | boolean | null | undefined>>
  ) => void;
}

export type SortDirectionType = 'asc' | 'dsc' | 'none';

export const TableContext = createContext<{
  sortedRows: ReadonlySignal<
    Record<string, string | number | boolean | null>[]
  >;
  sortDirection: Signal<SortDirectionType>;
  sortBy: Signal<string>;
  fk: Signal<string>;
  cellChangeMap: Signal<Map<string, any>>;
  columns: Signal<ColumnDefsType>;
} | null>(null);

export const Table: React.FC<TableType> = ({
  foreignKey,
  rowData,
  columnDefs,
  handleSubmit,
  renderButton,
}) => {
  const [_, setReady] = useState<boolean>(false);
  const columns = useSignal<ColumnDefsType>([]);
  const cellChangeMap = useSignal(new Map());
  const rows = useSignal<
    Array<Record<string, string | number | boolean | null>>
  >([]);
  const fk = useSignal<string>('');
  const sortBy = useSignal<string>('');
  const sortDirection = useSignal<SortDirectionType>('none');
  const sortedRows = useComputed(() =>
    sortDirection.value === 'none'
      ? rows.value
      : sort(rows.value, sortBy.value, sortDirection.value === 'dsc')
  );
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
    <TableContext.Provider
      value={{
        sortedRows,
        sortDirection,
        sortBy,
        fk,
        cellChangeMap,
        columns,
      }}
    >
      <SubmitWrapper handleSubmit={handleSubmit}>
        <table className="min-w-full">
          <Cols />
          <Rows />
        </table>
        {renderButton && renderButton()}
      </SubmitWrapper>
    </TableContext.Provider>
  );
};
