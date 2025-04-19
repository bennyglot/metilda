/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTable, TableProps } from "./useTable";

export function Table<T extends Record<string, any>>({ data, onRowClick }: TableProps<T>) {
  const { headers, rows, handleRowClick } = useTable(data, onRowClick);

  if (!rows || rows.length === 0) return <div>No data</div>;
 
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} onClick={() => handleRowClick(row)} style={{ cursor: onRowClick ? "pointer" : "default" }}>
            {headers.map((header) => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}