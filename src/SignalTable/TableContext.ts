import { signal, computed } from '@preact/signals-react';
import { sort } from '../SignalTable/sort';

export type ColumnDefsType = Array<{
  field: string;
  cellType?: 'text' | 'number' | 'date' | 'boolean' | 'email';
  isEditable?: boolean;
  isSortable?: boolean;
  validation?: any; //field schema tbd
}>;

export interface TableType {
  rowData: Array<Record<string, string | number | boolean | null>>;
  foreignKey: string;
  columnDefs: ColumnDefsType;
  renderButton?: () => JSX.Element;
  handleSubmit?: (
    data: Array<Record<string, string | number | boolean | null | undefined>>
  ) => void;
}

export type SortDirectionType = 'asc' | 'dsc' | 'none';

export const columns = signal<ColumnDefsType>([]);
export const cellChangeMap = signal(new Map());
export const rows = signal<
  Array<Record<string, string | number | boolean | null>>
>([]);
export const fk = signal<string>('');
export const sortBy = signal<string>('');
export const sortDirection = signal<SortDirectionType>('none');
export const sortedRows = computed(() =>
  sortDirection.value === 'none'
    ? rows.value
    : sort(rows.value, sortBy.value, sortDirection.value === 'dsc')
);
