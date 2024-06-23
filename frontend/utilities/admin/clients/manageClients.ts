import axios from 'axios';
import { showConfirmationDialog, handleAction } from './alertConfig';

const handleConfirmDelete = async (clientId: string, clientName: string) => {
  await handleAction('Delete', clientId, clientName, async () => {
    await axios.delete(`http://localhost:8000/admin/clients/${clientId}`, { withCredentials: true });
  });
};


const deleteClient = async (clientId: string, clientName: string) => {
  showConfirmationDialog(clientId, clientName, {
    title: 'Confirm Deletion',
    confirmText: 'Yes, delete it!',
    confirmColor: '#d33',
    confirmCallback: handleConfirmDelete,
  });
};

const handleConfirmEdit = async (clientId: string, clientName: string) => {
  await handleAction('Unblock', clientId, clientName, async () => {
    await axios.put(`http://localhost:8000/admin/clients/${clientId}`, {}, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
  });
};

const editClient = async (clientId: string, clientName: string) => {
  showConfirmationDialog(clientId, clientName, {
    title: 'Confirm Unblocking',
    confirmText: 'Yes, Unblock!',
    confirmColor: '#d33',
    confirmCallback: handleConfirmEdit,    
  });
};

export {
  deleteClient,
  editClient
}