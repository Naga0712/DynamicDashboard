// components/common/PageWithAutoTableAndDetails.tsx

import React, { useEffect, useState } from "react";
import SearchBox from "../../form/input/SearchBox";
import IconWrapper from "../../form/input/IconWrapper";
import TableWrapper from "../../form/input/TableWrapper";
import CardViewTopic from "./CardViewTopic";


interface RowData {
    id: string | number;
    name: string;
    description?: string;
    [key: string]: any;
}

interface Attribute {
    name: string;
    value: string;
}
interface Questions {
    id: number;
    value: string;
}

interface WrapperProps {
    title: string;
    columns: any[];
    data: RowData[];
    attributes: Attribute[];
    guidenceText: string;
    referenceAnswerText: string;
    onRowSelect?: (row: RowData | null) => void; // Optional callback for external logic
    showCheckboxes?: boolean;
    questionName?: Questions[];
}

const PageWithAutoTableAndDetails: React.FC<WrapperProps> = ({
    title,
    columns,
    data,
    attributes,
    guidenceText,
    referenceAnswerText,
    onRowSelect,
    showCheckboxes,
    questionName
}) => {
    const [copyData, setCopyData] = useState<RowData[]>([]);
    const [displayData, setDisplayData] = useState<RowData[]>([]);
    const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [clearSelectionCounter, setClearSelectionCounter] = useState(0);

    useEffect(() => {
        setCopyData(data);
        setDisplayData(data);
        setClearSelectionCounter((prev) => prev + 1);
    }, [data]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toLowerCase();
        setSearchValue(val);
        setDisplayData(val ? copyData.filter(d => d.name?.toLowerCase().includes(val)) : copyData);
    };

    const handleArrow = (direction: "up" | "down") => {
        if (!selectedRow) return;
        const index = displayData.findIndex(r => r.id === selectedRow.id);
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < displayData.length) {
            const newRow = displayData[newIndex];
            setSelectedRow(newRow);
            onRowSelect?.(newRow);
        }
    };

    const handleRefresh = () => {
        setDisplayData(copyData);
        setSearchValue("");
        setClearSelectionCounter((prev) => prev + 1);
        setSelectedRow(null);
        onRowSelect?.(null);
    };

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className={selectedRow ? "col-span-8" : "col-span-12"}>
                <div className="flex justify-start mb-2">
                    <span style={{ color: "#6a9fb8" }}>{title}</span>
                </div>

                <div className="grid grid-cols-12 gap-4 mb-2 items-center">
                    <div className="col-span-5 max-w-[50%]">
                        <SearchBox onChange={handleSearch} value={searchValue} placeholder="Search..." />
                    </div>
                    <div className="col-span-4 grid grid-cols-4 gap-2"></div>
                    <div className="col-span-1">
                        <IconWrapper name="ArrowDown" onClick={() => handleArrow("down")} />
                    </div>
                    <div className="col-span-1">
                        <IconWrapper name="ArrowUp" onClick={() => handleArrow("up")} />
                    </div>
                    <div className="col-span-1 mt-1.5 flex justify-end">
                        <IconWrapper name="RefreshCcw" onClick={handleRefresh} />
                    </div>
                </div>

                <TableWrapper
                    column={columns}
                    renderData={displayData}
                    onRowClick={(row) => {
                        const isSame = selectedRow?.id === row.id;
                        const newRow = isSame ? null : row;
                        setSelectedRow(newRow);
                        onRowSelect?.(newRow);
                    }}
                    selectedRowId={selectedRow?.id}
                    clearSelectionTrigger={clearSelectionCounter}
                    onSelectionChange={(ids) => {
                        const lastId = Array.isArray(ids) ? ids.at(-1) : ids;
                        const found = displayData.find((row) => row.id === lastId);
                        setSelectedRow(found || null);
                        onRowSelect?.(found || null);
                    }}
                    showCheckboxes={showCheckboxes}
                />
            </div>
            <div className="col-span-4 flex flex-col overflow-y-auto max-h-[calc(100vh-150px)] p-2  border-gray-200">
                {selectedRow && (
                    <div className="bg-white shadow-md rounded-xl p-4">
                        <CardViewTopic
                            attributes={attributes}
                            guidence={guidenceText}
                            referenceAnswer={referenceAnswerText}
                            questions={questionName}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageWithAutoTableAndDetails;
