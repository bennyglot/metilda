/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";

export interface TableProps<T> {
  data: T[];
  onRowClick?: (row: T) => void;
}

export interface TableHook<T> {
  headers: string[];
  rows: T[];
  handleRowClick: (row: T) => void;
}

export const useTable = <T extends Record<string, any>>(
    data: T[],
    onRowClick?: (row: T) => void
): TableHook<T> => {
    const headers = useMemo(() => {
        const excludedKeys = ['_id'];
        if (!data || data.length === 0) return [];
        const keys = Object.keys(data[0]);
        
        return keys.filter(key => !excludedKeys.includes(key));
    }, [data]);

    const handleRowClick = (row: T) => {
        if (onRowClick) onRowClick(row);
    };

    return { headers, rows: data, handleRowClick };
};