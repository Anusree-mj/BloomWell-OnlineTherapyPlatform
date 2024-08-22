import { useState, useEffect } from 'react';
import { Box, } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getTherapistDetailsAction, therapistStateType } from '@/store/therapists/therapistReducers';
import ChatComponent from '@/components/common/therapy/chatComponent';
import TherapySidebarComponent from '../../common/therapy/sidebarComponent';
import { clientStateType } from '@/store/clients/clientReducer';
import { clientAuth } from '@/utilities/auth';
import { clientMyActivityStateType, getBookedSlotsDetailsAction } from '@/store/clients/clientMyActionReducer';
import { toast } from 'react-toastify';

const ClientTherapyComponent: React.FC<{ therapistId: string; }> = ({ therapistId }) => {
    const dispatch = useDispatch();
    const therapist = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const ratings = useSelector((state: { therapist: therapistStateType }) => state.therapist.ratings) || 0;
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const slotDetails = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.bookedSlot)

    useEffect(() => {
        const { status } = clientAuth();
        if (status === 'ok') {
            const { clientDetails } = clientAuth()
            console.log('clientdetails', clientDetails)
            // if (clientDetails && !clientDetails.connectionDetails.isActive) {
            //     router.push('/client/connection')
            // }
            dispatch(getTherapistDetailsAction(therapistId));
            // dispatch(getBookedSlotsDetailsAction(activeSlotId))
        }
    }, []);

    useEffect(() => {
        if (slotDetails.date) {
            const today = new Date().toISOString().split('T')[0]; 
            if (slotDetails.date === today) {
                toast.success(`Gentle reminder! Live session scheduled today at ${slotDetails.time}`);
            }
        }
    }, [slotDetails]);

    useEffect(() => {
        console.log('therapistsdetailssss', therapist)
    }, [therapist])

const AccordionItems = [
    { title: 'Therapist', button: 'View Profile', url: `therapist/view/${therapist._id}` },
    { title: 'Schedules', button: slotDetails.date !== '' ? 'Cancel' : 'BookSlot', url: `/client/myActivity/bookSlot`, },
    { title: 'Remarks' },
]
const AccordionContent = [
    {
        content: [slotDetails.date !== '' ? `Your upcoming schedules is on ${slotDetails.date} at ${slotDetails.time}.
            ` : 'No Schedules yet']
    },
    { content: [clientDetails.remarks && clientDetails.remarks !== '' ? clientDetails.remarks : 'No remarks yet'] },
]

const messageData = {
    reciever: {
        image: therapist.image,
        name: therapist.name,
        recieverId: therapist._id,
        role: 'Therapists'
    },
    sender: {
        senderId: clientDetails._id,
        role: 'Client',
    },
}
console.log('messagedattaaaaaaaaaaaaaaaa', messageData)
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