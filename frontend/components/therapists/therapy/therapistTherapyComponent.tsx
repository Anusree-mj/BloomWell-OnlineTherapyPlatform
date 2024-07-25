import { useEffect } from 'react';
import { Box, } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ChatComponent from '@/components/common/therapy/chatComponent';
import TherapySidebarComponent from '../../common/therapy/sidebarComponent';
import { getAnyClientDetailsAction, clientStateType } from "@/store/clients/clientReducer";
import { therapistStateType } from '@/store/therapists/therapistReducers';
import { getChatAction } from '@/store/user/userReducer';
import { clientMyActivityStateType, getBookedSlotsDetailsAction } from '@/store/clients/clientMyActionReducer';

const TherapistTherapyComponent: React.FC<{ clientId: string; }> = ({ clientId }) => {
    const dispatch = useDispatch();
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const therapistId = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist._id);
    const slotDetails = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.bookedSlot)

    useEffect(() => {
        dispatch(getAnyClientDetailsAction({ clientId }));
    }, [clientId]);

    useEffect(() => {
        const { isActiveSlots } = clientDetails
        if (isActiveSlots) {
            const { activeSlotId } = clientDetails
            dispatch(getBookedSlotsDetailsAction(activeSlotId))
        }
    }, [clientDetails])

    const AccordionItems = [
        { title: 'Client', button: 'View Profile', url: `client/medicalInfo/${clientId}` },
        { title: 'Upcoming Schedule', button: 'View All', url: `therapist/activities/schedules`, },
        { title: 'Description', isAdd: true },
        { title: 'Remarks',isAdd: true },
    ]
    const AccordionContent = [
        {
            content: [slotDetails.date !== '' ? `Scheduled on ${slotDetails.date} at ${slotDetails.time}.
            ` : 'No Schedules yet']
        },
        {
            content: [clientDetails.description && clientDetails.description !== '' ? clientDetails.description : 'No description added yet']
        },
        { content: [clientDetails.remarks && clientDetails.remarks !== '' ? clientDetails.remarks : 'No remarks yet'] },

    ]

    const messageData = {
        reciever: {
            name: clientDetails.name,
            recieverId: clientDetails._id,
            image: '',
            role: 'Client'
        },
        sender: {
            senderId: therapistId,
            role: 'Therapists'
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
            }} >
            <TherapySidebarComponent
                AccordionItems={AccordionItems} AccordionContent={AccordionContent} reciever={messageData.reciever} rating={0} />
            <ChatComponent messageData={messageData} />
        </Box >
    )
}

export default TherapistTherapyComponent