import { useEffect } from 'react';
import { Box, } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ChatComponent from '@/components/common/therapy/chatComponent';
import TherapySidebarComponent from '../../common/therapy/sidebarComponent';
import { getAnyClientDetailsAction, clientStateType } from "@/store/clients/clientReducer";
import { therapistStateType } from '@/store/therapists/therapistReducers';
import { getChatAction } from '@/store/user/userReducer';

const TherapistTherapyComponent: React.FC<{ clientId: string; }> = ({ clientId }) => {
    const dispatch = useDispatch();
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const therapistId = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist._id);

    useEffect(() => {
        console.log('entered in useeffect clientId changed')
        dispatch(getAnyClientDetailsAction({ clientId }));
        dispatch(getChatAction({ recieverId: clientId, senderId: therapistId }));

    }, [clientId]);

    const AccordionItems = [
        { title: 'Client', button: 'View Profile', url: `client/medicalInfo/${clientId}` },
        { title: 'Upcoming Schedule', button: 'View All', url: `#`, },
        { title: 'Description', isAdd: true },
        { title: 'Remarks', button: 'View All', url: `#`, isAdd: true },
        { title: 'Goals', button: 'View All', url: `#`, isAdd: true },
        { title: 'Worksheets', button: 'View All', url: `#`, isAdd: true },
    ]
    const AccordionContent = [
        { content: ['No schedules yet'] },
        { content: ['No description added yet'] },
        { content: ['No remarks yet'] },
        { content: ['No goals yet'] },
        { content: ['No worksheets yet'] }
    ]
    // const reciever = {
    //     name: clientDetails.name,
    //     recieverId: clientDetails._id,
    //     image: '',
    //     role: 'Client'
    // }

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
                backgroundColor: '#F7FCC2', p: '1rem 0 4rem 0',
                display: 'flex', flexWrap: 'wrap-reverse', gap: 2,
                justifyContent: { md: 'space-between', xs: 'center' },
                alignItems: 'center',
                minHeight: '90vh',
            }}>
            <TherapySidebarComponent
                AccordionItems={AccordionItems} AccordionContent={AccordionContent} reciever={messageData.reciever} rating={0} />
            <ChatComponent messageData={messageData} />
        </Box>
    )
}

export default TherapistTherapyComponent