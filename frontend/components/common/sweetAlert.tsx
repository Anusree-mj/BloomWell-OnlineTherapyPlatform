import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CustomAlertDialogProps {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    title: string;
    message: string;
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({ open, handleClose, handleConfirm, title, message }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Ignore
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Answer
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CustomAlertDialog;
