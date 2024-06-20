import { useState, useEffect } from 'react';
import {
    Box, Typography, Avatar, Accordion, AccordionDetails, AccordionSummary,
    Rating, Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { getTherapistDetailsAction, therapistStateType } from '@/store/therapists/therapistReducers';
import { useRouter } from "next/navigation";
import ChatComponent from '@/components/common/therapy/chatComponent';
import TherapySidebarComponent from '../../common/therapy/sidebarComponent';

const ClientTherapyComponent: React.FC<{ therapistId: string; }> = ({ therapistId }) => {
    const dispatch = useDispatch();
    const therapist = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const ratings = useSelector((state: { therapist: therapistStateType }) => state.therapist.ratings) || 0;

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
    }
    return (
        <Box
            sx={{
                backgroundColor: '#F7FCC2',
                display: 'flex', flexWrap: 'wrap-reverse',
                justifyContent: { md: 'space-between', xs: 'center' },
                alignItems: 'center',
                minHeight: '90vh',
            }}>
            <TherapySidebarComponent
                AccordionItems={AccordionItems} AccordionContent={AccordionContent} />
            <ChatComponent reciever={reciever} />
        </Box>
    )
}

export default ClientTherapyComponent