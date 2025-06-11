import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";

interface Column {
    key: string;
    name: React.ReactNode;
    selector: (row: any, index: number) => React.ReactNode;
    sortable?: boolean;
    width?: string;
}

interface TableProps {
    column: Column[];
    renderData: any[];
    rowsPerPageOptions?: number[];
    onRowClick?: (row: any, index: number) => void;
    onSelectionChange?: (selectedIds: any[]) => void;
    clearSelectionTrigger?: number;
    selectedRowId?: any;
    showCheckboxes?: boolean;
}

function TableWrapper({
    column,
    renderData = [],
    rowsPerPageOptions = [5, 10, 20],
    onRowClick,
    onSelectionChange,
    clearSelectionTrigger,
    selectedRowId,
    showCheckboxes = true,
}: TableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

    const totalPages = Math.max(1, Math.ceil(renderData.length / rowsPerPage));

    useEffect(() => {
        setSelectedRows(new Set());
        onSelectionChange?.([]);
    }, [clearSelectionTrigger]);

    useEffect(() => {
        if (selectedRowId !== undefined && selectedRowId !== null) {
            const newSet = new Set<number>();
            newSet.add(selectedRowId);
            setSelectedRows(newSet);
        }
    }, [selectedRowId]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

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

    const toggleSelection = (id: number) => {
        setSelectedRows((prevSelected) => {
            const newSelected = new Set(prevSelected);
            newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
            onSelectionChange?.(Array.from(newSelected));
            return newSelected;
        });
    };

    const toggleSelectAll = () => {
        if (selectedRows.size === paginatedData.length) {
            setSelectedRows(new Set());
            onSelectionChange?.([]);
        } else {
            const newSelected = new Set(paginatedData.map((row) => row.id));
            setSelectedRows(newSelected);
            onSelectionChange?.(Array.from(newSelected));
        }
    };

    return (
      <div className="w-full max-w-full border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] rounded-lg">
  <div className="w-full overflow-x-auto">
    <div className="min-w-[1200px] max-h-[330px] overflow-y-auto">
      <Table className="w-full table-fixed">
        <TableHeader className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-white/[0.05]">
          <TableRow>
            {showCheckboxes && (
              <TableCell
                className="px-[10px] py-3 font-medium text-gray-500 text-start"
                style={{ width: "48px", minWidth: "48px" }}
              >
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={toggleSelectAll}
                  className="cursor-pointer"
                />
              </TableCell>
            )}
            {column.map((col) => (
              <TableCell
                key={col.key}
                isHeader
                className="px-[10px] py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer"
                style={col.width ? { width: col.width, minWidth: col.width } : { minWidth: "200px" }}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex row gap-2">
                  {col.name}
                  {col.sortable &&
                    (sortConfig?.key === col.key
                      ? sortConfig.direction === "asc"
                        ? "↑"
                        : "↓"
                      : "↕")}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={column.length + 1} className="text-center py-4 text-gray-500 dark:text-gray-400">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, index) => {
              const globalIndex = index + 1 + (currentPage - 1) * rowsPerPage;
              return (
                <TableRow key={row.id} onClick={() => onRowClick?.(row, globalIndex)}>
                  {showCheckboxes && (
                    <TableCell className="px-[10px] py-3" style={{ width: "48px", minWidth: "48px" }}>
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={() => toggleSelection(row.id)}
                        className="cursor-pointer"
                      />
                    </TableCell>
                  )}
                  {column.map((col) => (
                    <TableCell
                      key={col.key}
                      className="px-[10px] py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 cursor-pointer"
                      style={col.width ? { width: col.width, minWidth: col.width } : { minWidth: "200px" }}
                    >
                      <div
                        className="overflow-hidden truncate whitespace-nowrap"
                        title={(() => {
                          const content = col.selector?.(row, globalIndex);
                          if (
                            typeof content === "string" &&
                            isNaN(Number(content)) &&
                            !/^https?:\/\//.test(content)
                          ) {
                            return content;
                          }
                          return undefined;
                        })()}
                      >
                        {col.selector ? col.selector(row, globalIndex) : null}
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
  </div>

  {/* Pagination */}
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
        {rowsPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    <div>
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</div>

    );
}

export default TableWrapper;
