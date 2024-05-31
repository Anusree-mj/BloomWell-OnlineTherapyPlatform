import React, { useEffect } from 'react';

import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation";
import { getConnectionsAction } from '@/store/clients/clientConnectionReducer';


const ConnectionComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter()


    useEffect(() => {
        const clientData = localStorage.getItem("clientData");
        if (clientData) {
            const parsedData = JSON.parse(clientData);
            const clientId = parsedData._id;
            dispatch(getConnectionsAction(clientId));
        } else {
            router.push('/login')
        }
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: '#F7FCC2',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '85vh',
                paddingBottom: '2rem'
            }}
        >
            <Typography>Hello</Typography>
        </Box>
    );
};

export default ConnectionComponent