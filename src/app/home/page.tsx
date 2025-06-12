'use client'

import { useState } from "react";
import SearchBox from "../components/form/input/SearchBox";
import TableWrapper from "../components/form/input/TableWrapper";
import Button from "../components/ui/button/Button";
import { Modal } from "../components/ui/modal";
import { useModal } from "../components/hooks/useModal";
import HomeDetails from "./homeDetails";
import Input from "../components/form/input/InputField";

export default function HomePage() {

    const [searchValue, setSearchValue] = useState<string>("");
    const { isOpen, openModal, closeModal } = useModal();

    const column = [
        {
            key: "name",
            name: "Name",
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            key: "email",
            name: "Email",
            selector: (row: any) => row.email,
            sortable: true,
        },
    ];

    const data = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
        { id: 3, name: "Charlie", email: "charlie@example.com" },
    ];

    const handleSearch = (e: any) => {
        const value = e.target.value;
        setSearchValue(value);

    };

    const handleCancel = () => {
        alert("Gethu bro......");
    };

    return (
        <div className="p-4 space-y-4">
            <div className="text-2xl font-bold">Welcome Home</div>

            <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">
                    <SearchBox
                        onChange={handleSearch}
                        value={searchValue}
                        placeholder={"SEARCH PROCESS NAME"}
                    />
                </div>
                <div className="col-span-3" />
                <div className="col-span-5 flex justify-end gap-2">
                    <Button className="bg-blue-500 text-white" onClick={openModal}>Add</Button>
                    <Button className="bg-red-500 text-white" onClick={() => handleCancel()}>Cancel</Button>
                </div>
            </div>
            <TableWrapper column={column} renderData={data} showCheckboxes={false} />
            {isOpen && (
                <div>
                    <Modal
                        isOpen={true}
                        onClose={closeModal}
                        className="max-w-[600px] p-6 lg:p-10"
                    >
                        <HomeDetails
                            data={data || []}
                        />
                    </Modal>
                </div>)}
        </div>

    )
}


