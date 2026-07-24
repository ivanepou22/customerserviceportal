import { flexRender } from '@tanstack/react-table';
import { useDataTable } from '../hooks/useDataTable';
import { useState } from 'react';

export default function DataTable({ data, columns }) {
    const { table, globalFilter, setGlobalFilter } = useDataTable({ data, columns });
    const [showColumnToggle, setShowColumnToggle] = useState(false);

    return (
        <div className="space-y-4">
            {/* Top Controls */}
            <div className="flex items-center justify-between">
                <input
                    placeholder="Search all columns..."
                    value={globalFilter ?? ""}
                    onChange={e => setGlobalFilter(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <div className="relative">
                    <button
                        onClick={() => setShowColumnToggle(!showColumnToggle)}
                        className="px-4 py-2 border border-border rounded-md hover:bg-muted flex items-center gap-2"
                    >
                        Columns <span>▼</span>
                    </button>

                    {showColumnToggle && (
                        <div className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-md shadow-lg p-3 z-50 max-h-80 overflow-auto">
                            {table.getAllLeafColumns().map(column => (
                                <label key={column.id} className="flex items-center gap-2 py-1 cursor-pointer hover:bg-muted px-2 rounded">
                                    <input
                                        type="checkbox"
                                        checked={column.getIsVisible()}
                                        onChange={column.getToggleVisibilityHandler()}
                                        className="rounded"
                                    />
                                    {column.columnDef.header?.toString() || column.id}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="border border-border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer select-none"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() && (
                                            <span>{header.column.getIsSorted() === 'desc' ? ' ↓' : ' ↑'}</span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-muted transition-colors">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={table.getAllColumns().length} className="px-6 py-8 text-center text-muted-foreground">
                                    No results found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                    <span>Rows per page:</span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                        className="border border-border rounded px-2 py-1"
                    >
                        {[10, 20, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>{pageSize}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}