import axios from 'axios';
import { showConfirmationDialog, handleAction } from './alertConfig';

const handleVerifyTherapists = async (therapistId: string, therapistName: string, verifyStatus: string) => {
    await handleAction('Verify', therapistId, therapistName, verifyStatus, async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/admin/therapists/${therapistId}/verify`,
            { verifyStatus }, { withCredentials: true });
    });
};


const verifyTherapists = async (therapistId: string, therapistName: string, verifyStatus: string) => {
    showConfirmationDialog(therapistId, therapistName, verifyStatus, {
        title: 'Confirm Verify',
        confirmText: `Yes ${verifyStatus === 'Granted' ? 'Give access' : 'Deny access'}`,
        confirmColor: '#d33',
        confirmCallback: handleVerifyTherapists,
    });
};

export {
    verifyTherapists,
}