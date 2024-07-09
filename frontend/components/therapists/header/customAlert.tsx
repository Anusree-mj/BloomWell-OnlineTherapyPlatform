// components/CustomAlert.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface CustomAlertProps {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onAnswer: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ open, title, message, onClose, onAnswer }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <div>{message}</div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onAnswer} color="primary">
                    Answer
                </Button>
                <Button onClick={onClose} color="secondary">
                    Ignore
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomAlert;
