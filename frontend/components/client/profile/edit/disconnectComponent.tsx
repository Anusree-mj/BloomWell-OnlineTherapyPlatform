import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getClientDetailsAction, clientStateType } from "@/store/clients/clientReducer";
import { Box } from '@mui/system';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiCall } from '@/services/api';



interface DisconnectInfo {
    setIsDisConnect: React.Dispatch<React.SetStateAction<boolean>>;
    connectionId: string
}


const DisconnectComponent: React.FC<DisconnectInfo> = ({ setIsDisConnect, connectionId }) => {
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const dispatch = useDispatch()
    const reasonItems = ['Lack Of Progress', 'Personal Preference', 'Communication Issues',
        'Financial Constraints', 'Availability Conflicts', `Therapist's Approach`
    ]

    const handleDisconnection = async (reason: string) => {
        try {
            const response = await apiCall({
                method: 'PUT',
                endpoint: `client/connection`,
                body: { reason, connectionId }
            });
            if (response.status === 'ok') {
                toast.success('Disconnected Successfully!');
                dispatch(getClientDetailsAction())
                setIsDisConnect(false);
            }
            else {
                toast.error('Failed to Disconnect. Try again!')
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            maxWidth: '100%', justifyContent: 'center',
        }}>
            <Typography sx={{
                fontWeight: 600, fontSize: '1rem', color: '#325343',
                mb: 1, alignSelf: 'flex-start'
            }}>Choose a reason for disconnection</Typography>
            <Box sx={{
                display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                justifyContent: 'space-around', width: '80rem', maxWidth: '100%',
                p: 2
            }}>
                {reasonItems.map((item) => (
                    <Button variant="outlined"
                        sx={{
                            width: '20rem', maxWidth: '80%',
                            color: '#325343', mb: 2,
                            borderColor: '#325343',
                            '&:hover': {
                                backgroundColor: '#49873D',
                                color: 'white', borderColor: '#325343'
                            }
                        }} onClick={() => { handleDisconnection(item) }}
                    >{item}</Button>
                ))}
                <Button variant="contained"
                    sx={{
                        mt: 2, backgroundColor: '#325343', width: '30rem', maxWidth: '90%',
                        '&:hover': {
                            backgroundColor: '#49873D',
                            color: 'white',
                        }
                    }} onClick={() => { setIsDisConnect(false) }}
                >Cancel</Button>
            </Box>
        </Box>
    )
}

export default DisconnectComponent