import React from 'react';

interface TableRowProps {
  row: any;
  columnDefs: any[];
  foreignKey: string;
}

export const TableRow: React.FC<TableRowProps> = ({ row, columnDefs, foreignKey }) => {
  return (
    <tr key={row[foreignKey]} className="border-b border-gray-200">
      {columnDefs.map((col) => (
        <td key={col.field} className="px-4 py-2">
          {col.isEditable ? (
            <input
              type={col.cellOptions.type}
              defaultValue={row[col.field]}
              aria-label={col.field}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          ) : (
            <span>{row[col.field]}</span>
          )}
        </td>
      ))}
    </tr>
  );
};
