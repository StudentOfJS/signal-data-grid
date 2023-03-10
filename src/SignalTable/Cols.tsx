import { columns } from './TableContext';

export function Cols() {
  return (
    <thead className="bg-white border-b">
      <tr>
        {columns.value.map(({ field }) => (
          <th
            className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
            scope="col"
            key={field}
          >
            {field}
          </th>
        ))}
      </tr>
    </thead>
  );
}
