import Swal from 'sweetalert2';
import store from '@/store';
import { getAdminConnectionRequestAction } from '@/store/admin/adminConnectionReducer';

export interface ActionOptions {
    title: string;
    confirmText: string;
    confirmColor: string;
    confirmCallback: (connectionId: string, therapistName: string, clientName: string, connectionStatus: string) => Promise<void>;
}

export const showConnectionConfirmationDialog = (connectionId: string, therapistName: string, clientName: string, connectionStatus: string,
    options: ActionOptions) => {
    Swal.fire({
        title: options.title,
        text: `Are you sure you want to ${connectionStatus} 
    the user ${clientName}'s connection request to the therapist ${therapistName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: options.confirmColor,
        cancelButtonColor: '#3085d6',
        confirmButtonText: options.confirmText,
    }).then((result) => {
        if (result.isConfirmed) {
            options.confirmCallback(connectionId, therapistName, clientName, connectionStatus);
        }
    });
};

export const handleAction = async (
    actionName: string,
    connectionId: string,
    therapistName: string,
    clientName: string,
    connectionStatus: string,
    callback: (connectionId: string, therapistName: string, clientName: string, connectionStatus: string) => Promise<void>,
) => {
    try {
        await callback(connectionId, therapistName, clientName, connectionStatus);
        showSuccessAlert(`${actionName} successful.`);
    } catch (error) {
        showErrorAlert(`An error occurred while ${actionName.toLowerCase()} the user ${clientName}.`);
    }
};

export const showSuccessAlert = (message: string) => {
    Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
    }).then(() => {
        store.dispatch(getAdminConnectionRequestAction());
    });
};

export const showErrorAlert = (message: string) => {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
    });
};
