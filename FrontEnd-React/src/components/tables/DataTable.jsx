import { flexRender } from "@tanstack/react-table";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDataTable } from "../../hooks/useDataTable";
import { Button } from "../ui/button";
import Icon from "../Icon";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function DataTable({ data, columns, title = "Export" }) {
    const selectionColumn = {
        id: "select",
        header: ({ table }) => (
            <button
                type="button"
                className="flex items-center justify-center p-0.5 rounded hover:bg-muted"
                onClick={table.getToggleAllPageRowsSelectedHandler()}
            >
                {table.getIsAllPageRowsSelected() ? (
                    <Icon name="checkSquare" size={16} />
                ) : table.getIsSomePageRowsSelected() ? (
                    <Icon name="minusSquare" size={16} />
                ) : (
                    <Icon name="square" size={16} />
                )}
            </button>
        ),
        cell: ({ row }) => (
            <button
                type="button"
                className="flex items-center justify-center p-0.5 rounded hover:bg-muted"
                onClick={row.getToggleSelectedHandler()}
            >
                {row.getIsSelected() ? (
                    <Icon name="checkSquare" size={16} />
                ) : (
                    <Icon name="square" size={16} />
                )}
            </button>
        ),
        enableSorting: false,
        enableHiding: false,
        enableColumnFilter: false,
        size: 40,
    };

    const { table, globalFilter, setGlobalFilter } = useDataTable({
        data,
        columns: [selectionColumn, ...columns],
    });

    const [showColumnToggle, setShowColumnToggle] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const columnToggleRef = useRef(null);
    const exportMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                columnToggleRef.current &&
                !columnToggleRef.current.contains(e.target)
            ) {
                setShowColumnToggle(false);
            }
            if (
                exportMenuRef.current &&
                !exportMenuRef.current.contains(e.target)
            ) {
                setShowExportMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedCount = Object.keys(table.getState().rowSelection).length;
    const hasColumnFilters = table.getState().columnFilters.length > 0;

    const clearColumnFilters = () => {
        table.setColumnFilters([]);
    };

    const getExportRows = (onlySelected = false) => {
        const rows = onlySelected
            ? table.getFilteredSelectedRowModel().rows
            : table.getFilteredRowModel().rows;

        return rows.map((row) => {
            const obj = {};
            row.getVisibleCells().forEach((cell) => {
                if (cell.column.id === "select") return;
                const header =
                    cell.column.columnDef.header?.toString() || cell.column.id;
                obj[header] = cell.getValue() ?? "";
            });
            return obj;
        });
    };

    const exportToExcel = (onlySelected = false) => {
        const rows = getExportRows(onlySelected);
        if (!rows.length) return;

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(
            workbook,
            `${title}${onlySelected ? "-selected" : ""}.xlsx`
        );
        setShowExportMenu(false);
    };

    const exportToPDF = (onlySelected = false) => {
        const rows = getExportRows(onlySelected);
        if (!rows.length) return;

        const doc = new jsPDF({ orientation: "landscape" });
        const headers = Object.keys(rows[0]);
        const body = rows.map((row) =>
            headers.map((h) => String(row[h] ?? ""))
        );

        autoTable(doc, {
            head: [headers],
            body,
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [15, 23, 42] },
            margin: { top: 20 },
        });

        doc.save(`${title}${onlySelected ? "-selected" : ""}.pdf`);
        setShowExportMenu(false);
    };

    const exportToWord = (onlySelected = false) => {
        const rows = getExportRows(onlySelected);
        if (!rows.length) return;

        const headers = Object.keys(rows[0]);

        const html = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office"
                  xmlns:w="urn:schemas-microsoft-com:office:word"
                  xmlns="http://www.w3.org/TR/REC-html40">
            <head><meta charset="utf-8"><title>${title}</title></head>
            <body>
                <h2>${title}${onlySelected ? " (Selected)" : ""}</h2>
                <table border="1" cellspacing="0" cellpadding="5"
                       style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:11px;">
                    <thead>
                        <tr style="background:#0f172a;color:white;">
                            ${headers.map((h) => `<th>${h}</th>`).join("")}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows
                .map(
                    (row) => `
                            <tr>
                                ${headers
                            .map((h) => `<td>${row[h] ?? ""}</td>`)
                            .join("")}
                            </tr>`
                )
                .join("")}
                    </tbody>
                </table>
            </body>
            </html>
        `;

        const blob = new Blob(["\ufeff", html], {
            type: "application/msword",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}${onlySelected ? "-selected" : ""}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setShowExportMenu(false);
    };

    const resetColumns = () => {
        table.resetColumnVisibility();
        setShowColumnToggle(false);
    };

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 flex-wrap">
                    <input
                        placeholder="Search all columns..."
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="border border-border rounded-lg md:rounded-none px-3 py-1 w-full sm:w-80 text-sm border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 text-gray-900 placeholder:text-gray-400"
                    />

                    {hasColumnFilters && (
                        <button
                            type="button"
                            onClick={clearColumnFilters}
                            className="text-sm text-teal-700 hover:text-teal-800 whitespace-nowrap underline-offset-2 hover:underline"
                        >
                            Clear column filters
                        </button>
                    )}

                    {selectedCount > 0 && (
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {selectedCount} selected
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {/* Columns Toggle */}
                    <div className="relative" ref={columnToggleRef}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setShowColumnToggle(!showColumnToggle)
                            }
                            className="gap-1.5 px-3 py-1 rounded-lg md:rounded-none"
                        >
                            <Icon name="columns" size={15} />
                            Columns
                            <Icon
                                name="chevronDown"
                                size={14}
                                className="opacity-70"
                            />
                        </Button>

                        {showColumnToggle && (
                            <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-md shadow-lg p-2 z-50 max-h-80 overflow-auto">
                                <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-border">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                        Toggle columns
                                    </span>
                                    <button
                                        onClick={resetColumns}
                                        className="text-xs text-primary hover:underline flex items-center gap-1"
                                    >
                                        <Icon name="refresh" size={12} />
                                        Reset
                                    </button>
                                </div>

                                {table
                                    .getAllLeafColumns()
                                    .filter((col) => col.id !== "select")
                                    .map((column) => (
                                        <label
                                            key={column.id}
                                            className="flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer hover:bg-muted text-sm"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={column.getIsVisible()}
                                                onChange={column.getToggleVisibilityHandler()}
                                                className="rounded border-border"
                                            />
                                            <span className="truncate">
                                                {column.columnDef.header?.toString() ||
                                                    column.id}
                                            </span>
                                        </label>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Export Menu */}
                    <div className="relative" ref={exportMenuRef}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowExportMenu(!showExportMenu)}
                            className="gap-1.5 mx-2 px-3 py-1 rounded-lg md:rounded-none"
                        >
                            <Icon name="download" size={15} />
                            Export
                            <Icon
                                name="chevronDown"
                                size={14}
                                className="opacity-70"
                            />
                        </Button>

                        {showExportMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-md shadow-lg py-1 z-50">
                                <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    All filtered
                                </div>
                                <button
                                    onClick={() => exportToExcel(false)}
                                    className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                                >
                                    <Icon name="fileSpreadsheet" size={15} />
                                    Excel
                                </button>
                                <button
                                    onClick={() => exportToPDF(false)}
                                    className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                                >
                                    <Icon name="filePdf" size={15} />
                                    PDF
                                </button>
                                <button
                                    onClick={() => exportToWord(false)}
                                    className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                                >
                                    <Icon name="fileText" size={15} />
                                    Word
                                </button>

                                {selectedCount > 0 && (
                                    <>
                                        <div className="my-1 border-t border-border" />
                                        <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                            Selected ({selectedCount})
                                        </div>
                                        <button
                                            onClick={() => exportToExcel(true)}
                                            className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                                        >
                                            <Icon
                                                name="fileSpreadsheet"
                                                size={15}
                                            />
                                            Excel
                                        </button>
                                        <button
                                            onClick={() => exportToPDF(true)}
                                            className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                                        >
                                            <Icon name="filePdf" size={15} />
                                            PDF
                                        </button>
                                        <button
                                            onClick={() => exportToWord(true)}
                                            className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                                        >
                                            <Icon name="fileText" size={15} />
                                            Word
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="border border-border overflow-hidden bg-card">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max border-collapse">
                        <thead className="bg-muted sticky top-0 z-5">
                            {/* Column headers + sort */}
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className={`px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap select-none border-b border-border
                                                ${header.column.getCanSort()
                                                    ? "cursor-pointer hover:bg-muted/80"
                                                    : ""
                                                }
                                            `}
                                            onClick={header.column.getToggleSortingHandler()}
                                            style={{
                                                width:
                                                    header.getSize() !== 150
                                                        ? header.getSize()
                                                        : undefined,
                                            }}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {header.column.getIsSorted() ===
                                                    "asc" && <span>↑</span>}
                                                {header.column.getIsSorted() ===
                                                    "desc" && <span>↓</span>}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}

                            {/* Per-column filter row */}
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr
                                    key={`${headerGroup.id}-filters`}
                                    className="bg-muted/60"
                                >
                                    {headerGroup.headers.map((header) => {
                                        const canFilter =
                                            header.column.getCanFilter() &&
                                            header.column.id !== "select" &&
                                            header.column.id !== "actions";

                                        return (
                                            <th
                                                key={`${header.id}-filter`}
                                                className="px-2 py-1.5 border-b border-border font-normal"
                                            >
                                                {canFilter ? (
                                                    <input
                                                        type="text"
                                                        value={
                                                            (header.column.getFilterValue() ??
                                                                "")
                                                        }
                                                        onChange={(e) =>
                                                            header.column.setFilterValue(
                                                                e.target
                                                                    .value ||
                                                                undefined
                                                            )
                                                        }
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        placeholder="Filter…"
                                                        className="w-full min-w-[80px] border border-gray-200 bg-white px-2 py-1 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 rounded-md md:rounded-none"
                                                    />
                                                ) : null}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>

                        <tbody className="divide-y divide-border">
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className={`hover:bg-gray-100 transition-colors ${row.getIsSelected()
                                                ? "bg-cyan-200 hover:bg-cyan-200 hover:text-white"
                                                : ""
                                            }`}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="px-3 py-1 text-sm text-foreground whitespace-nowrap"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={table.getAllColumns().length}
                                        className="px-6 py-10 text-center text-muted-foreground text-sm"
                                    >
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">Rows per page</span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) =>
                            table.setPageSize(Number(e.target.value))
                        }
                        className="border border-border rounded-lg md:rounded-none px-3 py-1 bg-background text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 text-gray-900 placeholder:text-gray-400"
                    >
                        {[10, 20, 50, 100, 200, 500, 700, 1000].map(
                            (pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="flex items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-1 py-1 rounded-lg md:rounded-none"
                    >
                        <ArrowLeft size={10} />
                    </Button>

                    <span className="px-3 font-medium tabular-nums">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount() || 1}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-1 py-1 rounded-lg md:rounded-none"
                    >
                        <ArrowRight size={10} />
                    </Button>
                </div>
            </div>
        </div>
    );
}