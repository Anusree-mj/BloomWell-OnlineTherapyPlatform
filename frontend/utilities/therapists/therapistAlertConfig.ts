import Swal from 'sweetalert2';
import store from '@/store';
import { getTherapistsConnectionRequestAction } from '@/store/therapists/therapistConnectionHandlerReducers';

export interface ActionOptions {
  title: string;
  confirmText: string;
  confirmColor: string;
  confirmCallback: (connectionId: string, clientName: string, connectionStatus: string) => Promise<void>;
}

export const showConfirmationDialog = (connectionId: string, clientName: string, connectionStatus: string,
  options: ActionOptions) => {
  Swal.fire({
    title: options.title,
    text: `Are you sure you want to ${connectionStatus} 
    this user ${clientName}'s connection request?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: options.confirmColor,
    cancelButtonColor: '#3085d6',
    confirmButtonText: options.confirmText,
  }).then((result) => {
    if (result.isConfirmed) {
      options.confirmCallback(connectionId, clientName, connectionStatus);
    }
  });
};

export const handleAction = async (
  actionName: string,
  connectionId: string,
  clientName: string,
  connectionStatus: string,
  callback: (connectionId: string, clientName: string, connectionStatus: string) => Promise<void>,
) => {
  try {
    await callback(connectionId, clientName, connectionStatus);
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
    store.dispatch(getTherapistsConnectionRequestAction());
  });
};

export const showErrorAlert = (message: string) => {
  Swal.fire({
    title: 'Error!',
    text: message,
    icon: 'error',
  });
};
