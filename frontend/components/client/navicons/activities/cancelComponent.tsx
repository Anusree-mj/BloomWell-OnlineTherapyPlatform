import { useEffect, useState } from "react";
import { Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from "react-redux";
import {
    getAvailableSlotsAction, clientMyActivityStateType,
    getBookedSlotsDetailsAction
} from "@/store/clients/clientMyActionReducer";
import { format } from 'date-fns';

const CancelComponent = () => {
    const dispatch = useDispatch();
    const bookedSlot = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.bookedSlot)


    useEffect(() => {
        const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');
        const { activeSlotId } = (clientData);
        console.log('activeSlotId gound:', activeSlotId)
        dispatch(getBookedSlotsDetailsAction(activeSlotId))

    }, [dispatch]);

    const formatDate = (dateString: string): string => {
        const [day, month, year] = dateString.split('-').map(Number); // Convert strings to numbers
        const date = new Date(2000 + year, month - 1, day); // Use 2000 + year for correct century
        return format(date, "do MMM"); // Formats the date to '29th Jun'
    };
    const formattedDate = bookedSlot?.date ? formatDate(bookedSlot.date) : '';

    return (
        <Box sx={{
            display: 'flex', maxWidth: '90%', alignItem: 'flex-start',
            width: '30rem',
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', maxWidth: '100%',
                width: '30rem', p: '1rem 1.2rem', borderRadius: '1rem',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'
            }}>
                <Typography
                    sx={{ textAlign: 'center', letterSpacing: '1px', color: '#325343' }}>
                    Your slot on <span style={{ fontWeight: '800' }}>{formattedDate}</span> at <span style={{ fontWeight: '800' }}>{bookedSlot.time}</span> has been successfully booked.
                    Awaiting confirmation from your therapist.
                    You will be notified once it is confirmed.
                </Typography>
                <Button component="a" sx={{
                    my: 2, mx: 2, color: 'white', backgroundColor: '#325343',
                    display: 'block', fontWeight: 600,
                    '&:hover': {
                        backgroundColor: '#a6de9b',
                        color: '#325343'
                    }
                }} variant="contained">
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}

export default CancelComponent