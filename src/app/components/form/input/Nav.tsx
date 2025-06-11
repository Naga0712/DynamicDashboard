import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface NavItem {
    key: string;
    name: string;
    url?: string;
    isExpanded?: boolean;
    children?: NavItem[];
}

interface NavProps {
    items: NavItem[];
    onSelect?: (key: string) => void;
    onRenderGroupHeader?: (item: NavItem) => React.ReactNode;
    onRenderLink?: (item: NavItem) => React.ReactNode;
}

const NavItemComponent: React.FC<{
    item: NavItem;
    level: number;
    isRoot: boolean;
    onSelect?: (key: string) => void;
    onRenderGroupHeader?: (item: NavItem) => React.ReactNode;
    onRenderLink?: (item: NavItem) => React.ReactNode;
}> = ({ item, level, isRoot, onSelect, onRenderGroupHeader, onRenderLink }) => {
    const [isOpen, setIsOpen] = useState(item.isExpanded ?? false);
    const hasChildren = !!item.children;

    return (
        <div>
            {hasChildren ? (
                <div>
                    {isRoot && onRenderGroupHeader ? (
                        <div onClick={() => setIsOpen(!isOpen)}>
                            {onRenderGroupHeader(item)}
                        </div>
                    ) : (
                        <button
                            className="flex items-center w-full text-left px-4 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            style={{ paddingLeft: `${level * 16}px` }}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="mr-2">
                                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </span>
                            {onRenderLink ? onRenderLink(item) : item.name}
                        </button>
                    )}
                </div>
            ) : (
                <div>
                    {onRenderLink ? (
                        <div onClick={() => onSelect && onSelect(item.key)}>
                            {onRenderLink(item)}
                        </div>
                    ) : (
                        <button
                            className="flex items-center w-full text-left px-4 py-2 rounded-lg text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            style={{ paddingLeft: `${level * 16}px` }}
                            onClick={() => onSelect && onSelect(item.key)}
                        >
                            {item.name}
                        </button>
                    )}
                </div>
            )}

            {isOpen && item.children && (
                <div className="ml-4 border-l border-gray-300 dark:border-gray-600">
                    {item.children.map((child) => (
                        <NavItemComponent
                            key={child.key}
                            item={child}
                            level={level + 1}
                            isRoot={false}
                            onSelect={onSelect}
                            onRenderGroupHeader={onRenderGroupHeader}
                            onRenderLink={onRenderLink}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Nav: React.FC<NavProps> = ({ items, onSelect, onRenderGroupHeader, onRenderLink }) => {
    return (
        <nav className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
            {items.map((item) => (
                <NavItemComponent
                    key={item.key}
                    item={item}
                    level={1}
                    isRoot={true}
                    onSelect={onSelect}
                    onRenderGroupHeader={onRenderGroupHeader}
                    onRenderLink={onRenderLink}
                />
            ))}
        </nav>
    );
};

export default Nav;