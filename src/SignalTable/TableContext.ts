import { signal } from '@preact/signals-react';

export const cellChangeMap = signal(new Map());
export const columns = signal<
  Array<{
    field: string;
    cellType?: 'text' | 'number' | 'date' | 'boolean' | 'email';
    isEditable?: boolean;
    validation?: {
      // zod schema???
    };
  }>
>([]);
export const rows = signal<
  Array<Record<string, string | number | boolean | null>>
>([]);
export const fk = signal<string>('');
