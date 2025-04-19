/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useTable, TableProps } from "./useTable";

export function Table<T extends Record<string, any>>({ data, onRowClick }: TableProps<T>) {
  const { headers, rows, handleRowClick } = useTable(data, onRowClick);

  // Local state for pagination controls
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const total = data.length;
  const totalPages = Math.ceil(total / itemsPerPage);

  // Paginate the rows for display
  const paginatedRows = rows.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (!rows || rows.length === 0) return <div>No data</div>;

  return (
    <div>
      <table className="table-responsive">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, idx) => (
            <tr key={idx} onClick={() => handleRowClick(row)} style={{ cursor: onRowClick ? "pointer" : "default" }}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
          <span style={{ margin: "0 8px" }}>
            Page {page} of {totalPages}
          </span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
        </div>
        <div>
          <label>
            Items per page:{" "}
            <select
              value={itemsPerPage}
              onChange={e => {
                setItemsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              {[5, 10, 20, 50, 100].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}