'use client';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function Table<T extends { id?: number | string }>({ columns, data, loading, emptyMessage = 'No data found', onRowClick }: TableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-3 p-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50">
            {columns.map((col) => (
              <th key={col.key} className={cn('px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap', col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row.id ?? i}
                className={cn('hover:bg-slate-50 transition-colors', onRowClick && 'cursor-pointer')}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3 text-slate-700', col.className)}>
                    {col.render ? col.render(row) : String((row as any)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
