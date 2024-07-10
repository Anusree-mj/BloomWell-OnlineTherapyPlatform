import { useEffect, useState } from "react";
import { Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import axios from 'axios';
import { clientMyActivityStateType, getBookedSlotsDetailsAction } from "@/store/clients/clientMyActionReducer";
import { format } from 'date-fns';
import { toast } from "react-toastify";
import { getClientDetailsAction } from "@/store/clients/clientReducer";
import { apiCall } from "@/services/api";

interface CancelComponent {
    setIsActiveSlot: React.Dispatch<React.SetStateAction<boolean>>;
}

const CancelComponent: React.FC<CancelComponent> = ({ setIsActiveSlot }) => {
    const dispatch = useDispatch();
    const bookedSlot = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.bookedSlot)


    useEffect(() => {
        const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');
        const { activeSlotId } = (clientData);
        console.log('activeSlotId gound:', activeSlotId)
        dispatch(getBookedSlotsDetailsAction(activeSlotId))

    }, [dispatch]);

    const formatDate = (dateString: string): string => {
        const [day, month, year] = dateString.split('-').map(Number);
        const date = new Date(2000 + year, month - 1, day);
        return format(date, "do MMM");
    };
    const formattedDate = bookedSlot?.date ? formatDate(bookedSlot.date) : '';

    const handleCancel = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to cancel the slot you booked?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await apiCall({
                    method: 'PUT',
                    endpoint: `client/slot/cancel`,
                    body: { slotId: bookedSlot._id }
                });
                if (response.status === 'ok') {
                    dispatch(getClientDetailsAction())
                    toast.success('Your slot succesfully cancelled!');
                    setIsActiveSlot(false)
                }

            } catch (error) {
                toast.error('Something went wrong cant cancel your slot!');
            }
        }
    };

    return (
        <Box sx={{
            display: 'flex', maxWidth: '90%', alignItem: 'flex-start',
            width: '30rem',
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', maxWidth: '100%',
                width: '30rem', p: '1rem 1.2rem', borderRadius: '1rem',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
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
                }} variant="contained"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}

export default CancelComponent