import { useState, useEffect } from 'react';
import { Box, } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getTherapistDetailsAction, therapistStateType } from '@/store/therapists/therapistReducers';
import ChatComponent from '@/components/common/therapy/chatComponent';
import TherapySidebarComponent from '../../common/therapy/sidebarComponent';
import { clientStateType } from '@/store/clients/clientReducer';
import { clientAuth } from '@/utilities/auth';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { clientMyActivityStateType, getBookedSlotsDetailsAction } from '@/store/clients/clientMyActionReducer';

const ClientTherapyComponent: React.FC<{ therapistId: string; }> = ({ therapistId }) => {
    const dispatch = useDispatch();
    const router = useRouter()
    const therapist = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const ratings = useSelector((state: { therapist: therapistStateType }) => state.therapist.ratings) || 0;
    const clientId = useSelector((state: { client: clientStateType }) => state.client.client._id);
    const activeSlotId = useSelector((state: { client: clientStateType }) => state.client.client.activeSlotId);
    const slotDetails = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.bookedSlot)

    useEffect(() => {
        const { status } = clientAuth()
        if (status === 'ok') {
            const { clientDetails } = clientAuth();
            if (!clientDetails.isConnected) {
                router.push('/client/connection')
            }
            dispatch(getTherapistDetailsAction(therapistId));
            dispatch(getBookedSlotsDetailsAction(activeSlotId))
        } else {
            const { message } = clientAuth()
            toast.error(message)
            router.push('/login')
        }
    }, []);

    const AccordionItems = [
        { title: 'Therapist', button: 'View Profile', url: `therapist/view/${therapist._id}` },
        { title: 'Schedules', button: 'Book Slot', url: `#` },
        { title: 'Remarks', button: 'View All', url: `#` },
        { title: 'Goals', button: 'View All', url: `#` },
        { title: 'Worksheets', button: 'View All', url: `#` },
    ]
    const AccordionContent = [
        { content: ['No schedules yet'] },
        { content: ['No remarks yet'] },
        { content: ['No goals yet'] },
        { content: ['No worksheets yet'] }
    ]

    const messageData = {
        reciever: {
            image: therapist.image,
            name: therapist.name,
            recieverId: therapist._id,
            role: 'Therapists'
        },
        sender: {
            senderId: clientId,
            role: 'Client'
        }
    }
    return (
        <Box
            sx={{
                backgroundColor: '#325343', pb: '4rem',
                display: 'flex', flexWrap: 'wrap-reverse', gap: 3,
                justifyContent: { md: 'space-between', xs: 'center' },
                alignItems: 'center',
                minHeight: '90vh',
            }}>
            <TherapySidebarComponent
                AccordionItems={AccordionItems} AccordionContent={AccordionContent} rating={ratings}
                reciever={messageData.reciever} />
            <ChatComponent messageData={messageData} slotDetails={slotDetails} />
        </Box>
    )
}

export default ClientTherapyComponent