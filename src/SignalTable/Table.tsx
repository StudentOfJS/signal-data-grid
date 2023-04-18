import { createContext, useCallback, useEffect, useState } from 'react';
import {
  useSignal,
  useComputed,
  type ReadonlySignal,
  type Signal,
} from '@preact/signals-react';
import { sort } from './sort';
import { SubmitWrapper } from './SubmitWrapper';
import { Cols } from './Cols';
import { Rows } from './Rows';
import { Row } from './Row';

type ColumnDefsType = Array<{
  field: string;
  cellOptions?: React.InputHTMLAttributes<HTMLInputElement>
  isEditable?: boolean;
  isSortable?: boolean;
  validation?: (value: string | number | boolean) => boolean // field validation function -> return true if valid
}>;

type TableRecordType = Record<string, string | number | boolean | null | JSX.Element | undefined>

interface TableType {
  rowData?: Array<Record<string, string | number | boolean | null>>;
  foreignKey: string;
  columnDefs: ColumnDefsType;
  renderButton?: () => JSX.Element;
  handleSubmit?: (
    data: Array<TableRecordType>
  ) => void;
}

export type SortDirectionType = 'asc' | 'dsc' | 'none';

export const TableContext = createContext<{
  sortedRows: ReadonlySignal<
    TableRecordType[]
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
  const [rd, setRd] = useState<Array<TableRecordType>>()
  const columns = useSignal<ColumnDefsType>([]);
  const cellChangeMap = useSignal(new Map());
  const rows = useSignal<Array<TableRecordType>>([]);
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
    rows.value = rd!;
    fk.value = foreignKey;
    setReady(true);
  }, [columnDefs, rd]);

  useEffect(() => {
    init();
  }, [columnDefs, rd]);

  useEffect(() => {
    if(rowData) {
      let x: TableRecordType[] = rowData.map(r => {
        let uniqueId = r[foreignKey] as string;
        return (
          {
            ...r,
            id: uniqueId,
            element: (
              <Row
                row={
                  Object.entries(r).filter((rr) =>
                  columnDefs.map((c) => c.field).includes(rr[0])
                  ) as [string, string][]
                }
                rowId={`${uniqueId}`}
              />
            )
          }
        )
      })
      setRd(x)
    }
  }, [rowData]);

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
        <table className="min-w-full table-auto border border-slate-400">
          <Cols />
          <Rows />
        </table>
        {renderButton && renderButton()}
      </SubmitWrapper>
    </TableContext.Provider>
  );
};
