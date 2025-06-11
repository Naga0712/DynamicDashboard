import { useEffect, useRef, useState } from "react";

interface Node {
    id: number;
    name: string;
    parentid: number | null;
    children?: Node[];
}

interface FacilitySelectorProps {
    nodes: Node[];
    selectedNodes: Node[];
    onChange: (selected: Node[]) => void;
    t: (key: string) => string;
}

const DropDownTree: React.FC<FacilitySelectorProps> = ({ nodes, selectedNodes, onChange, t }) => {
    const [showTree, setShowTree] = useState(false);
    const [expandedNodes, setExpandedNodes] = useState<number[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
                setShowTree(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleExpand = (id: number) => {
        setExpandedNodes((prev) =>
            prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]
        );
    };

    const isFacilitySelected = (facility: Node): boolean => {
        return selectedNodes.some((f) => f.id === facility.id);
    };

    const getAllChildren = (facility: Node): Node[] => {
        let children: Node[] = [];
        if (facility.children) {
            facility.children.forEach((child) => {
                children.push(child, ...getAllChildren(child));
            });
        }
        return children;
    };

    const handleSelection = (facility: Node) => {
        const isSelected = isFacilitySelected(facility);
        let updatedSelection: Node[];

        if (isSelected) {
            // Deselect parent and all children
            const childIds = new Set(getAllChildren(facility).map((child) => child.id));
            updatedSelection = selectedNodes.filter((f) => f.id !== facility.id && !childIds.has(f.id));
        } else {
            // Select parent and all children
            updatedSelection = [...selectedNodes, facility, ...getAllChildren(facility)];
        }

        onChange(updatedSelection);
    };

    const renderTree = (facility: Node) => {
        const isChecked = isFacilitySelected(facility);
        return (
            <li key={facility.id} className="p-2">
                <div className="flex items-center gap-2">
                    {facility.children && facility.children.length > 0 && (
                        <button type="button" onClick={() => toggleExpand(facility.id)}>
                            {expandedNodes.includes(facility.id) ? "▼" : "▶"}
                        </button>
                    )}

                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSelection(facility)}
                    />
                    <label>{facility.name}</label>
                </div>

                {expandedNodes.includes(facility.id) && facility.children && (
                    <ul className="pl-6">{facility.children.map((child) => renderTree(child))}</ul>
                )}
            </li>
        );
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className="w-full p-2 border rounded bg-white text-left"
                onClick={() => setShowTree(!showTree)}
            >
                {selectedNodes.length > 0
                    ? selectedNodes.map((f) => f.name).join(", ")
                    : t("SELECT_DROPDOWN")}
            </button>

            {showTree && (
                <div className="absolute z-10 w-full p-2 mb-1 bg-white border rounded shadow max-h-32 overflow-y-auto bottom-full">
                    <ul>
                        {nodes.filter((item) => item.parentid === null).map((parent) => renderTree(parent))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDownTree;
