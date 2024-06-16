import { useState, useEffect } from 'react';
import {
    Box, Typography, Avatar, Accordion, AccordionDetails, AccordionSummary,
    Rating, useTheme, Paper, Button, MobileStepper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { getTherapistDetailsAction, therapistStateType } from '@/store/therapists/therapistReducers';
import { useRouter } from "next/navigation";
import ChatComponent from '@/components/common/chatComponent';

const ClientTherapyComponent: React.FC<{ therapistId: string; }> = ({ therapistId }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const therapist = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const ratings = useSelector((state: { therapist: therapistStateType }) => state.therapist.ratings) || 0;

    useEffect(() => {
        dispatch(getTherapistDetailsAction(therapistId));
    }, [dispatch, therapistId]);

    const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

    const handleExpansion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : false);
    };


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
    const handleButtonClick = (url: string) => {
        router.push(`/${url}`)
    }
    const role = {
        image: therapist.image,
        name: therapist.name
    }
    return (
        <Box
            sx={{
                backgroundColor: '#F7FCC2',
                display: 'flex', flexWrap: 'wrap-reverse',
                justifyContent: { md: 'space-between', xs: 'center' },
                alignItems: 'center',
                minHeight: '90vh',
            }}
        >
            <Box sx={{
                width: { md: '20rem', xs: '30rem' }, maxWidth: { xs: '100%', md: '90%' },
                backgroundColor: 'white', pt: 1,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', height: { md: '85vh' },
                border:'1px solid red'
            }}>
                {AccordionItems.map((item, index) => (
                    <Accordion
                        key={item.title}
                        expanded={expandedPanel === item.title}
                        onChange={handleExpansion(item.title)}
                        sx={{ p: 1 }} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography noWrap component="div" sx={{ color: '#325343', fontSize: '1.1rem', fontWeight: 700 }}>
                                {item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{
                            display: 'flex', flexDirection: 'column',
                            alignItem: 'center', justifyContent: 'center'
                        }}>
                            {index === 0 ? (
                                <Box sx={{
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Box sx={{
                                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <Avatar src={therapist.image} sx={{ width: 100, height: 100 }} />
                                        <Box sx={{
                                            display: 'flex', flexDirection: 'column',
                                            justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <Typography variant="h6" noWrap component="div" sx={{ color: '#325343', fontSize: '1rem', fontWeight: 600 }}>
                                                {therapist.name}
                                            </Typography>
                                            <Rating name="read-only" value={ratings} readOnly size="small" />
                                        </Box>
                                    </Box>
                                    <Button variant="contained"
                                        sx={{
                                            mt: 2, backgroundColor: '#325343', width: '20rem', maxWidth: '80%', p: '0.2rem',
                                            '&:hover': {
                                                backgroundColor: '#49873D',
                                                color: 'white',
                                            }
                                        }} onClick={() => { handleButtonClick(item.url) }}
                                    >{item.button}</Button>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {AccordionContent[index - 1].content.map((item) => (
                                        <Box sx={{
                                            display: 'flex', flexDirection: 'column',
                                            justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <Typography variant="h6" noWrap component="div" sx={{ color: '#325343', fontSize: '1rem', fontWeight: 600 }}>
                                                {item}
                                            </Typography>
                                        </Box>
                                    ))}
                                    <Button variant="contained"
                                        sx={{
                                            mt: 2, backgroundColor: '#325343', width: '20rem', maxWidth: '80%', p: '0.2rem',
                                            '&:hover': {
                                                backgroundColor: '#49873D',
                                                color: 'white',
                                            }
                                        }} onClick={() => { handleButtonClick(item.url) }}
                                    >{item.button}</Button>
                                </Box>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            <ChatComponent role={role} />
        </Box>
    )
}

export default ClientTherapyComponent