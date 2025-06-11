import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Accordion = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full border border-gray-300 dark:border-gray-700 rounded-lg divide-y">
            {children}
        </div>
    );
};

export const AccordionSummary = ({ title, isOpen, toggle }: { title: any; isOpen: boolean; toggle: () => void }) => {
    return (
        <button
            onClick={toggle}
            className={`flex justify-between items-center w-full text-left p-2 text-lg font-medium 
                        bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 
                        transition-colors  text-gray-800 dark:text-white/90
                        ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
        >
            {title}
            <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </button>
    );
};

export const AccordionDetails = ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) => {
    return (
        <div
            className={`grid transition-[grid-template-rows] duration-300 overflow-hidden 
                         border-gray-300 dark:border-gray-700 
                        ${isOpen ? " border grid-rows-[1fr] p-2 rounded-b-lg border-t-0" : "grid-rows-[0fr] p-0"}`}
        >
            <div className="overflow-hidden">{children}</div>
        </div>
    );
};


export const AccordionItem = ({ title, children }: { title: any; children: React.ReactNode, }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="p-4">
            <AccordionSummary title={title} isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
            <AccordionDetails isOpen={isOpen}>{children}</AccordionDetails>
        </div>
    );
};

export const AccordionItems = ({
    title,
    children,
    isOpen,
    onToggle,
}: {
    title: any;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}) => {
    return (
        <div className="p-4">
            <AccordionSummary title={title} isOpen={isOpen} toggle={onToggle} />
            <AccordionDetails isOpen={isOpen}>{children}</AccordionDetails>
        </div>
    );
};
