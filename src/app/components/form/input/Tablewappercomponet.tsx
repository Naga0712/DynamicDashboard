import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Checkbox from "./Checkbox";

interface Column {
    key: string;
    name: React.ReactNode;
    selector: (row: any, index: number) => React.ReactNode;
    sortable?: boolean;
}

interface TableProps {
    column: Column[];
    renderData: any[];
    rowSelection?: boolean;
    rowKey?: string;
    rowsPerPageOptions?: number[];
    onRowClick?: (row: any, index: number) => void;
    onSelectionChange?: (selectedRows: any[]) => void;
}

const TableWrapperComponent = ({
    column,
    renderData = [],
    rowKey = "id",
    rowSelection = false,
    rowsPerPageOptions = [5, 10, 20],
    onRowClick,
    onSelectionChange
}: Readonly<TableProps>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [selectedRows, setSelectedRows] = useState<Map<string | number, any>>(new Map());
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

    const totalPages = Math.max(1, Math.ceil(renderData.length / rowsPerPage));

    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig?.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...renderData].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        const aValue = a[key] ?? "";
        const bValue = b[key] ?? "";
        return direction === "asc"
            ? aValue.toString().localeCompare(bValue.toString(), undefined, { numeric: true })
            : bValue.toString().localeCompare(aValue.toString(), undefined, { numeric: true });
    });

    const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const toggleSelectRow = (row: any) => {
        const key = row[rowKey];
        setSelectedRows(prev => {
            const newSelected = new Map(prev);
            if (newSelected.has(key)) {
                newSelected.delete(key);
            } else {
                newSelected.set(key, row);
            }
            onSelectionChange?.(Array.from(newSelected.values()));
            return newSelected;
        });
    };

    const toggleSelectAll = () => {
        const newSelected = new Map();
        if (selectedRows.size !== paginatedData.length) {
            paginatedData.forEach(row => {
                const key = row[rowKey];
                newSelected.set(key, row);
            });
        }
        setSelectedRows(newSelected);
        onSelectionChange?.(Array.from(newSelected.values()));
    };

    return (
        <div className="w-full max-w-full border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] rounded-lg">
            <div className="relative">
                <Table className="w-full table-fixed">
                    <TableHeader className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            {rowSelection && (
                                <TableCell className="px-[10px] py-3" style={{ width: "48px", minWidth: "48px" }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                                        onChange={toggleSelectAll}
                                        className="cursor-pointer"
                                    />
                                </TableCell>
                            )}
                            {column.map(col => (
                                <TableCell
                                    key={col.key}
                                    isHeader
                                    className="max-w-[200px] px-[10px] py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer"
                                    onClick={() => col.sortable && handleSort(col.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {col.name}
                                        {col.sortable && (sortConfig?.key === col.key
                                            ? sortConfig.direction === "asc" ? "↑" : "↓"
                                            : "↕")}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={column.length + (rowSelection ? 1 : 0)} className="text-center py-4 text-gray-500 dark:text-gray-400">
                                    No records found
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((row, index) => {
                                const globalIndex = index + 1 + (currentPage - 1) * rowsPerPage;
                                const key = row[rowKey];
                                return (
                                    <TableRow key={key} onClick={() => onRowClick?.(row, globalIndex)}>
                                        {rowSelection && (
                                            <TableCell className="px-[10px] py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.has(key)}
                                                    onChange={() => toggleSelectRow(row)}
                                                    className="cursor-pointer"
                                                />
                                            </TableCell>
                                        )}
                                        {column.map(col => (
                                            <TableCell
                                                key={col.key}
                                                className="max-w-[200px] px-[10px] py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                                            >
                                                <div className="overflow-hidden truncate whitespace-nowrap" title={typeof col.selector(row, globalIndex) === 'string' ? col.selector(row, globalIndex)?.toString() : undefined}>
                                                    {col.selector(row, globalIndex)}
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-white/[0.05]">
                <div className="flex items-center space-x-2">
                    <label className="text-gray-500 dark:text-gray-400">Rows per page:</label>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="py-1 border rounded bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400"
                    >
                        {rowsPerPageOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="mx-2">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableWrapperComponent;
