import { useState, useEffect } from 'react';
import { Box, } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getTherapistDetailsAction, therapistStateType } from '@/store/therapists/therapistReducers';
import ChatComponent from '@/components/common/therapy/chatComponent';
import TherapySidebarComponent from '../../common/therapy/sidebarComponent';
import { clientStateType } from '@/store/clients/clientReducer';

const ClientTherapyComponent: React.FC<{ therapistId: string; }> = ({ therapistId }) => {
    const dispatch = useDispatch();
    const therapist = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const ratings = useSelector((state: { therapist: therapistStateType }) => state.therapist.ratings) || 0;
    const clientId = useSelector((state: { client: clientStateType }) => state.client.client._id);

    useEffect(() => {
        dispatch(getTherapistDetailsAction(therapistId));
    }, [dispatch, therapistId]);

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
    const reciever = {
        image: therapist.image,
        name: therapist.name,
        recieverId: therapist._id,
        role:'Therapists'
    }

    const sender = {
        senderId: clientId,
        role: 'Client'
    }

    return (
        <Box
            sx={{
                backgroundColor: '#F7FCC2', p: '1rem 0 4rem 0',
                display: 'flex', flexWrap: 'wrap-reverse',
                justifyContent: { md: 'space-between', xs: 'center' },
                alignItems: 'center',
                minHeight: '90vh',
            }}>
            <TherapySidebarComponent
                AccordionItems={AccordionItems} AccordionContent={AccordionContent} rating={ratings}
                reciever={reciever} />
            <ChatComponent reciever={reciever} sender={sender} />
        </Box>
    )
}

export default ClientTherapyComponent