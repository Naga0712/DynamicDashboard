import React, { useEffect, useState } from 'react';
import ApiManager from '../../services/ApiManager';
import { t, use } from 'i18next';
import TableWrapper from '../../components/form/input/TableWrapper';

const apiClient = new ApiManager().CreateApiClient();

interface ViewqueriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  processId?: number;
}

const ViewQuery: React.FC<ViewqueriesModalProps> = ({ isOpen, onClose ,processId}) => {
  const [comments, setComments] = useState<any[]>([]);
const [users, setUsers] = useState<any[]>([]);  
  useEffect(() => {
    if (isOpen) {
      fetchData();
      fetchUsers();
    }
  }, [isOpen]);

  const fetchData = async () => {

    try {
      const response = await apiClient.getqueries(processId);
      if (!response.hasError && response.result) {
        setComments(response.result);
      }
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };
const fetchUsers = async () => {
  try {
    const response = await apiClient.getAllUsers();
    if (!response.hasError && response.result) {
      setUsers(response.result);
    }
  } catch (error) {
    console.error("Error fetching users", error);
  }
};


  if (!isOpen) return null;
 const columns: any[] = [
    {
      name: <div>{t('COMMENT')}</div>,
      selector: (row: any) => row.comments,
    },
    {
    name: <div>{t('COMMENTED BY')}</div>,
    
    selector: (row: any) => row.commentsusername,
    },
    {
      name: <div>{t('COMMENTED ON')}</div>,
       selector: (row: any) => {
        const date = new Date(row.datecreated);
        return date.toLocaleDateString("en-GB");
      },

    }
   ]
     return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl shadow-lg">
        <h2 className="text-lg font-bold mb-4">Comment History</h2>
         <TableWrapper column={columns} renderData={comments} />
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewQuery;
