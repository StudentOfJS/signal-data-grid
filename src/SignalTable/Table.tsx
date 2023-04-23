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

type TableDataType = Array<Record<string, string | number | boolean | null>>

type TableRecordType = Record<string, string | number | boolean | null | JSX.Element | undefined>

interface TableType {
  rowData?: TableDataType;
  foreignKey: string;
  columnDefs: ColumnDefsType;
  groupBy?: string;
  showGroupByColumn?: boolean;
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
  foreignKey: string;
  cellChangeMap: Signal<Map<string, any>>;
  columnDefs: ColumnDefsType;
  groupBy?: string;
  showGroupByColumn?: boolean;
} | null>(null);

export const Table: React.FC<TableType> = ({
  foreignKey,
  rowData,
  columnDefs,
  groupBy,
  showGroupByColumn,
  handleSubmit,
  renderButton,
}) => {
  const [_, setReady] = useState<boolean>(false);
  const [colors] = useState(["cyan", "green", "indigo", "red", "teal", "emerald", "rose", "purple", "violet", "fuchsia", "blue", "orange", "amber", "lime", "yellow", "pink", "sky"]);
  const [rd, setRd] = useState<Array<TableRecordType>>()
  const cellChangeMap = useSignal(new Map());
  const rows = useSignal<Array<TableRecordType>>([]);
  const sortBy = useSignal<string>('');
  const sortDirection = useSignal<SortDirectionType>('none');
  const sortedRows = useComputed(() => {
    if(rows.value && sortDirection.value === 'none' && groupBy) {
      return sort(rows.value, groupBy, true)
    }
    return (
      sortDirection.value === 'none'
      ? rows.value
      : sort(rows.value, sortBy.value, sortDirection.value === 'dsc')
    )
  }
  
);
  // use later to provide table reset function
  const init = useCallback(() => {
    rows.value = rd!;
    setReady(true);
  }, [columnDefs, rd]);

  useEffect(() => {
    init();
  }, [columnDefs, rd]);

  useEffect(() => {
    if(rowData) {
      let count = 0
      let groupColorMap = new Map<string, number>([])
      let colorsUsed = new Set()
      let x: TableRecordType[] = []
      for (const item of rowData) {
        let uniqueId = item[foreignKey] as string;
        let color = ""
        let hasColor = groupBy && groupColorMap.has(item[groupBy]  as string)
        if(groupBy && hasColor) {
          color = colors[groupColorMap.get(item[groupBy]  as string) as number]
        }
        if(groupBy && !hasColor){
          count += 1
          groupColorMap.set(item[groupBy] as string, count)
          color = colors[count]
        }
        x.push(
          {
            ...item,
            id: uniqueId,
            element: (
              <Row
                color={color}
                row={
                  Object.entries(item).filter((rr) =>
                  columnDefs.map((c) => c.field).includes(rr[0])
                  ) as [string, string][]
                }
                rowId={`${uniqueId}`}
              />
            )
          }
        )
      }
      setRd(x)
    }
  }, [rowData]);

  return (
    <TableContext.Provider
      value={{
        sortedRows,
        sortDirection,
        sortBy,
        foreignKey,
        cellChangeMap,
        columnDefs,
        groupBy,
        showGroupByColumn
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
