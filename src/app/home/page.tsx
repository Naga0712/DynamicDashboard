'use client'

import { useEffect, useState } from "react";
import SearchBox from "../components/form/input/SearchBox";
import TableWrapper from "../components/form/input/TableWrapper";
import Button from "../components/ui/button/Button";
import { Modal } from "../components/ui/modal";
import { useModal } from "../components/hooks/useModal";
import HomeDetails from "./homeDetails";
import api from "../lib/axios";

export default function HomePage() {

    const [searchValue, setSearchValue] = useState<string>("");
    const { isOpen, openModal, closeModal } = useModal();
    const [users, setPosts] = useState<any>();

    useEffect(() => {
        api.get('/users') // calls https://jsonplaceholder.typicode.com/posts
            .then((res) => setPosts(res.data.slice(0, 10))) // limit to 10 posts
            .catch((err) => console.error('Failed to fetch posts:', err));
    }, []);

    const columns = [
        {
            key: 'title',
            name: 'Title',
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            key: 'body',
            name: 'Content',
            selector: (row: any) => row.username,
        },
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
            <TableWrapper column={columns} renderData={users} showCheckboxes={false} />
            {isOpen && (
                <div>
                    <Modal
                        isOpen={true}
                        onClose={closeModal}
                        className="max-w-[600px] p-6 lg:p-10"
                    >
                        <HomeDetails
                            data={users || []}
                        />
                    </Modal>
                </div>)}
        </div>

    )
}


