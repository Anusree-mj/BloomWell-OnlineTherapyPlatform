import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/navigation";

export interface SnackbarMessageProps {
    message: string;
    viewURL: string;
}

const AlertComponent: React.FC<SnackbarMessageProps> = ({ message, viewURL }) => {
    const router = useRouter()
    const [open, setOpen] = useState(true);
    useEffect(() => {
        setOpen(true)
    }, [message])

    const handleClose = () => {
        setOpen(false);
    };
    const handleView = () => {
        router.push(viewURL)
    }
    return (
        <Box sx={{ width: 500 }}>
            <Snackbar sx={{ mt: 8 }}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={open}
                onClose={handleClose}
                message={message}
                key={'top' + 'left'}
                action={
                    <>
                        <Button color="secondary" size="small" onClick={handleView}>
                            View
                        </Button>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            />
        </Box>
    );
}

export default AlertComponent;
