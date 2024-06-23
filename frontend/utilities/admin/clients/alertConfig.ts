import Swal from 'sweetalert2';
import store from '@/store';
import { getAllClientsDetailsAction } from '@/store/admin/adminReducer';

export interface ActionOptions {
  title: string;
  confirmText: string;
  confirmColor: string;
  confirmCallback: (clientId: string, clientName: string) => Promise<void>;
}

export const showConfirmationDialog = (clientId: string, clientName: string, options: ActionOptions) => {
  Swal.fire({
    title: options.title,
    text: `Are you sure you want to ${options.title.toLowerCase()} this user ${clientName}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: options.confirmColor,
    cancelButtonColor: '#3085d6',
    confirmButtonText: options.confirmText,
  }).then((result) => {
    if (result.isConfirmed) {
      options.confirmCallback(clientId, clientName);
    }
  });
};

export const handleAction = async (
  actionName: string,
  clientId: string,
  clientName: string,
  callback: (clientId: string, clientName: string) => Promise<void>,
) => {
  try {
    await callback(clientId, clientName);
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
    store.dispatch(getAllClientsDetailsAction());
  });
};

export const showErrorAlert = (message: string) => {
  Swal.fire({
    title: 'Error!',
    text: message,
    icon: 'error',
  });
};
