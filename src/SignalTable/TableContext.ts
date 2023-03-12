import { signal } from '@preact/signals-react';

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

export const columns = signal<ColumnDefsType>([]);
export const cellChangeMap = signal(new Map());
export const rows = signal<
  Array<Record<string, string | number | boolean | null>>
>([]);
export const fk = signal<string>('');
