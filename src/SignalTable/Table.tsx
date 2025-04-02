import { useCallback, useEffect, useState } from 'react';
import {
  signal,
} from '@preact/signals-react';
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

export const columns = signal<ColumnDefsType>([]);
export const cellChangeMap = signal(new Map());
export const rows = signal<Array<TableRecordType>>([]);
export const fk = signal<string>('');
export const sortBy = signal<string>('');
export const sortDirection = signal<SortDirectionType>('none');
export const columnWidths = signal<Record<string, number>>({});


export const Table: React.FC<TableType> = ({
  foreignKey,
  rowData,
  columnDefs,
  handleSubmit,
  renderButton,
}) => {
  const [_, setReady] = useState<boolean>(false);

  const init = useCallback(() => {
    if(columnDefs && rowData) {
      columns.value = columnDefs;
      fk.value = foreignKey;
      sortBy.value = '';
      sortDirection.value = 'none';
      rows.value = rowData.map(r => {
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
      setReady(true);
    }
  }, [columnDefs, rowData]);

  useEffect(() => {
    init();
  }, [columnDefs, rowData]);

  return (
    <>
      <SubmitWrapper handleSubmit={handleSubmit}>
        <div className="w-full max-h-96 overflow-scroll">
          <table className="w-full whitespace-nowrap border-collapse border border-slate-700 text-sm text-left text-gray-500 dark:text-gray-400">
            <Cols />
            <Rows />
          </table>
        </div>
        {renderButton && renderButton()}
      </SubmitWrapper>
    </>
  );
};
