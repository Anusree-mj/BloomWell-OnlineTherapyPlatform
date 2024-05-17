import axios from 'axios';
import { showConfirmationDialog, handleAction } from './alertConfigManage';

const handleConfirmDelete = async (therapistId: string, therapistName: string) => {
    await handleAction('Delete', therapistId, therapistName, async () => {
        await axios.delete(`http://localhost:8000/admin/therapists/${therapistId}`, { withCredentials: true });
    });
};


const deleteTherapist = async (therapistId: string, therapistName: string) => {
    showConfirmationDialog(therapistId, therapistName, {
        title: 'Confirm Deletion',
        confirmText: 'Yes, delete it!',
        confirmColor: '#d33',
        confirmCallback: handleConfirmDelete,
    });
};

const handleConfirmEdit = async (therapistId: string, therapistName: string) => {
    await handleAction('Unblock', therapistId, therapistName, async () => {
        await axios.put(`http://localhost:8000/admin/therapists/${therapistId}`, {}, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
        });
    });
};

const editTherapist = async (therapistId: string, therapistName: string) => {
    showConfirmationDialog(therapistId, therapistName, {
        title: 'Confirm Unblocking',
        confirmText: 'Yes, Unblock!',
        confirmColor: '#d33',
        confirmCallback: handleConfirmEdit,
    });
};

export {
    deleteTherapist,
    editTherapist
}