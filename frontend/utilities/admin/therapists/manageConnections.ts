import axios from 'axios';
import { showConnectionConfirmationDialog, handleAction } from './connectionAlertConfig';

const manageConnectionRequestAction = async (connectionId: string, therapistName: string,
    clientName: string, connectionStatus: string) => {
    await handleAction('Verify', connectionId, therapistName, clientName, connectionStatus, async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/admin/therapists/connections`,
            { connectionStatus, connectionId }, { withCredentials: true });
    });
};


const manageConnectionRequest = async (connectionId: string, therapistName: string, clientName: string, connectionStatus: string) => {
    showConnectionConfirmationDialog(connectionId, therapistName, clientName, connectionStatus, {
        title: 'Confirm Request',
        confirmText: `Yes ${connectionStatus}`,
        confirmColor: '#d33',
        confirmCallback: manageConnectionRequestAction,
    });
};

export {
    manageConnectionRequest,
}