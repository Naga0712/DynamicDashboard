import React from 'react'
import { Modal } from '../../ui/modal';
import Button from '../../ui/button/Button';

interface Props {
    toggleConfirmationPopup: () => void;
    isOpen: boolean;
    title: string;
    // message: string;
    yesButtonText: string;
    noButtonText: string;
    response: (response: boolean) => void
}

function CommonConfirmationDialog({ isOpen, title, yesButtonText, noButtonText, response, toggleConfirmationPopup }: Readonly<Props>) {

    const responseData = (res: boolean) => {
        toggleConfirmationPopup();
        response(res);
    }

    return (
        <Modal isOpen={isOpen} onClose={() => toggleConfirmationPopup()}
            className="max-w-[470px] p-6 lg:p-10"
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 animate-fadeIn">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
                {/* <p className="text-gray-600 dark:text-gray-300 mt-2">{message}</p> */}
                <div className="mt-4 flex justify-end space-x-3">
                    <Button
                        onClick={() => responseData(false)}
                        variant='outline'
                    >
                        {noButtonText}
                    </Button>
                    <Button
                        onClick={() => responseData(true)}
                    >
                        {yesButtonText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default CommonConfirmationDialog;