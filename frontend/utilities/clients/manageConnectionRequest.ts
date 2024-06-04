import axios from 'axios';
import { showConfirmationDialog, handleAction } from './clientAlertConfig';

const manageConnectionRequestAction = async (connectionId: string, clientName: string, connectionStatus: string) => {
    await handleAction('Verify', connectionId, clientName, connectionStatus, async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/therapist/connections`,
            { connectionStatus,connectionId }, { withCredentials: true });
    });
};


const manageConnectionRequest = async (connectionId: string, clientName: string, connectionStatus: string) => {
    showConfirmationDialog(connectionId, clientName, connectionStatus, {
        title: 'Confirm Request',
        confirmText: `Yes ${connectionStatus}`,
        confirmColor: '#d33',
        confirmCallback: manageConnectionRequestAction,
    });
};

export {
    manageConnectionRequest,
}