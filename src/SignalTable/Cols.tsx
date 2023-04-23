import { useSignalEffect } from '@preact/signals-react';
import { useContext, useState } from 'react';
import { SortDirectionType, TableContext } from '../SignalTable/Table';

export function Cols() {
  const ctx = useContext(TableContext);
  return (
    <thead className="bg-white border-b block md:table-header-group">
      <tr className="border border-slate-400 block md:table-row">
        {ctx?.columnDefs.map(({ field, isSortable }) =>
          field === ctx.groupBy && !ctx.showGroupByColumn ? (
            <th
              className="hidden"
              scope="col"
              key={field}
              style={{ position: 'relative' }}
            >
              {field}
              {isSortable && <Sort field={field} />}
            </th>
          ) : (
            <th
              className="text-sm font-medium text-white bg-slate-700 px-6 py-4 text-center block md:table-cell"
              scope="col"
              key={field}
              style={{ position: 'relative' }}
            >
              {field}
              {isSortable && <Sort field={field} />}
            </th>
          )
        )}
      </tr>
    </thead>
  );
}

function Sort({ field }: { field: string }) {
  const ctx = useContext(TableContext);
  return (
    <button
      type="button"
      className="m-0 ml-4 p-1"
      onClick={() => {
        if (ctx) {
          let { sortBy, sortDirection } = ctx;
          sortBy.value = field;
          switch (sortDirection.value) {
            case 'none':
              sortDirection.value = 'asc';
              break;
            case 'asc':
              sortDirection.value = 'dsc';
              break;
            default:
              sortDirection.value = 'asc';
          }
        }
      }}
      style={{
        position: 'absolute',
        right: 5,
        bottom: 5,
        transition: 'all 0.8s ease-in',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        style={{ width: 15, height: 15, pointerEvents: 'none' }}
      >
        <PathWarrior field={field} />
      </svg>
    </button>
  );
}

function PathWarrior({ field }: { field: string }) {
  const ctx = useContext(TableContext);
  const [sort, setSort] = useState<SortDirectionType>('none');
  useSignalEffect(() => {
    if (ctx?.sortBy.value === field) {
      setSort(ctx?.sortDirection.value ?? 'none');
    } else {
      setSort('none');
    }
  });
  if (sort === 'asc') {
    return <AscSortIcon />;
  }
  if (sort === 'dsc') {
    return <DescSortIcon />;
  }
  return <UnsortedPath />;
}

function UnsortedPath() {
  return (
    <path
      fillRule="evenodd"
      d="M2.24 6.8a.75.75 0 001.06-.04l1.95-2.1v8.59a.75.75 0 001.5 0V4.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L2.2 5.74a.75.75 0 00.04 1.06zm8 6.4a.75.75 0 00-.04 1.06l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75a.75.75 0 00-1.5 0v8.59l-1.95-2.1a.75.75 0 00-1.06-.04z"
      clipRule="evenodd"
    />
  );
}

function DescSortIcon() {
  return (
    <path
      fillRule="evenodd"
      d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
      clipRule="evenodd"
    />
  );
}
function AscSortIcon() {
  return (
    <path
      fillRule="evenodd"
      d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
      clipRule="evenodd"
    />
  );
}
