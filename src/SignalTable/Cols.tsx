import { useState } from 'react';
import { columns } from './TableContext';

export function Cols() {
  return (
    <thead className="bg-white border-b">
      <tr>
        {columns.value.map(({ field, isSortable }) =>
          isSortable ? (
            <SortableCol name={field} />
          ) : (
            <th
              className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
              scope="col"
              key={field}
            >
              {field}
            </th>
          )
        )}
      </tr>
    </thead>
  );
}

function SortableCol({ name }: { name: string }) {
  const [sort, setSort] = useState<'asc' | 'dsc' | 'none'>('none');
  return (
    <th
      className="flex items-center justify-center text-sm font-medium text-gray-900 px-6 py-4 text-center"
      scope="col"
    >
      <div>{name}</div>
      <div className="pt-2 pl-4">
        {sort === 'asc' && <AscSortIcon />}
        {sort === 'dsc' && <DescSortIcon />}
        {sort === 'none' && <UnsortedIcon />}
      </div>
    </th>
  );
}

function UnsortedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      style={{ width: 15, height: 15 }}
    >
      <path
        fillRule="evenodd"
        d="M2.24 6.8a.75.75 0 001.06-.04l1.95-2.1v8.59a.75.75 0 001.5 0V4.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L2.2 5.74a.75.75 0 00.04 1.06zm8 6.4a.75.75 0 00-.04 1.06l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75a.75.75 0 00-1.5 0v8.59l-1.95-2.1a.75.75 0 00-1.06-.04z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DescSortIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: 14, height: 14 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
      />
    </svg>
  );
}
function AscSortIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: 14, height: 14 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>
  );
}
