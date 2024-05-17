import Swal from 'sweetalert2';
import store from '@/store';
import { getTherapistsDetailsAction } from '@/store/admin/adminReducer';

export interface ActionOptions {
  title: string;
  confirmText: string;
  confirmColor: string;
  confirmCallback: (therapistId: string, therapistName: string, verifyStatus: string) => Promise<void>;
}

export const showConfirmationDialog = (therapistId: string, therapistName: string, verifyStatus: string,
  options: ActionOptions) => {
  Swal.fire({
    title: options.title,
    text: `Are you sure you want to ${verifyStatus === 'Granted' ? 'give access to' : 'deny access of'} 
    this user ${therapistName}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: options.confirmColor,
    cancelButtonColor: '#3085d6',
    confirmButtonText: options.confirmText,
  }).then((result) => {
    if (result.isConfirmed) {
      options.confirmCallback(therapistId, therapistName, verifyStatus);
    }
  });
};

export const handleAction = async (
  actionName: string,
  therapistId: string,
  therapistName: string,
  verifyStatus: string,
  callback: (therapistId: string, therapistName: string, verifyStatus: string) => Promise<void>,
) => {
  try {
    await callback(therapistId, therapistName, verifyStatus);
    showSuccessAlert(`${actionName} successful.`);
  } catch (error) {
    showErrorAlert(`An error occurred while ${actionName.toLowerCase()} the user ${therapistName}.`);
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
    store.dispatch(getTherapistsDetailsAction());
  });
};

export const showErrorAlert = (message: string) => {
  Swal.fire({
    title: 'Error!',
    text: message,
    icon: 'error',
  });
};
