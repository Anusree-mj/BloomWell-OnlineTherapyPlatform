import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { getTherapistProfileAction, therapistStateType } from '@/store/therapists/therapistReducers';

const ViewTherapistComponent: React.FC<{ therapistId: string; }> = ({ therapistId }) => {
    const dispatch = useDispatch();
    const therapist = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);

    useEffect(() => {
        dispatch(getTherapistProfileAction(therapistId));
    }, []);

    const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

    const handleExpansion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : false);
    };

    const accordionItems = [
        { title: 'About', content: [`${therapist.description}`] },
        {
            title: 'Personal Details', content: [
                `Name: ${therapist.name}`,
                `Email: ${therapist.email}`,
                `Phone: ${therapist.phone}`
            ]
        },
        {
            title: 'Experiences', content: [
                `License No: ${therapist.license.licenseNo}`,
                `Country: ${therapist.license.country}`,
                `Experience: ${therapist.experience}`
            ]
        },
        {
            title: 'Expertise',
            content: [`Role: ${therapist.role}`, `Expertise: ${therapist.expertise}`]
        }
    ];

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <Avatar src={therapist.image} sx={{ width: 200, height: 200, mt: 4 }} />
            <Typography variant="h6" noWrap component="div" sx={{ color: '#325343', fontWeight: 800 }}>
                {therapist.name}
            </Typography>
            <Box sx={{
                display: 'flex', justifyContent: 'center', maxWidth: '100%',
                flexDirection: 'column', alignItems: 'center', pt: 4, pb: 6,
            }}>

                <Box sx={{ maxWidth: '95%', width: '90rem', mt: 4 }}>
                    {accordionItems.map((item) => (
                        <Accordion
                            key={item.title}
                            expanded={expandedPanel === item.title}
                            onChange={handleExpansion(item.title)}
                            sx={{
                                '& .MuiAccordionSummary-content': {
                                    fontSize: '1.2rem',
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography>{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {item.content.map((subItem, index) => (
                                    <Typography key={index}>{subItem}</Typography>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ViewTherapistComponent;
