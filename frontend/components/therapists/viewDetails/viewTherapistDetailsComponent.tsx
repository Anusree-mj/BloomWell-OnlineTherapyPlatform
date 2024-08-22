import { useState, useEffect } from 'react';
import {
    Box, Typography, Avatar, Accordion, AccordionDetails, AccordionSummary,
    Rating, useTheme, Paper, Button, MobileStepper,
    Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { getTherapistDetailsAction, therapistStateType } from '@/store/therapists/therapistReducers';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const ViewTherapistComponent: React.FC<{ therapistId: string; }> = ({ therapistId }) => {
    const dispatch = useDispatch();
    const therapist = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const ratings = useSelector((state: { therapist: therapistStateType }) => state.therapist.ratings) || 0;
    const reviews = useSelector((state: { therapist: therapistStateType }) => state.therapist.reviews) || [];

    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = reviews.length;

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    useEffect(() => {
        dispatch(getTherapistDetailsAction(therapistId));
    }, [dispatch, therapistId]);

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
            backgroundColor: '#325343',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <Avatar src={therapist.image} sx={{ width: 200, height: 200, mt: 4 }} />
            <Typography variant="h6" noWrap component="div" sx={{ color: '#325343', fontWeight: 800 }}>
                {therapist.name}
            </Typography>
            <Rating name="read-only" sx={{ mt: 1 }} value={ratings} readOnly />
            <Typography sx={{ color: '#325343', fontSize: '0.9rem' }}>
                ( {reviews.length} reviews)
            </Typography>
            <Box sx={{
                display: 'flex', justifyContent: 'center', maxWidth: '100%',
                flexDirection: 'column', alignItems: 'center', pt: 1, pb: 6,
            }}>
                <Box sx={{ maxWidth: '90%', width: '80rem', mt: 1, }}>
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
                <Divider sx={{ width: '100%', backgroundColor: 'white', height: '3px', mt:6}} />
                {/* reviews */}
                <Box sx={{
                    maxWidth: '100%', width: '90rem',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                    flexGrow: 1, mt: 2, backgroundColor: '#325343',
                    minHeight: '40vh', // Set a minimum height
                    overflow: 'visible', // Ensure overflow is visible
                }}>
                    <Box sx={{
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                        backgroundColor: '#F7FCC2', borderRadius: '0.6rem',
                        p: 2, mb: 1, width: '50rem', maxWidth: '90%',
                        overflow: 'hidden', // Prevent overflow outside the Box
                        display: 'flex',
                        flexDirection: 'column', // Allow content to expand vertically
                    }}>
                        <Paper
                            square
                            elevation={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                height: 'auto', // Remove fixed height
                                pl: 2, mt: 2,
                                backgroundColor: '#F7FCC2',
                                overflow: 'visible', // Allow Paper to grow with content
                            }}
                        >
                            {reviews.length > 0 ? (
                                <Typography>{reviews[activeStep].comments}</Typography>
                            ) : (
                                <Typography>No reviews available</Typography>
                            )}
                        </Paper>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {reviews.map((item, index) => (
                                <div key={index}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <Typography
                                            sx={{
                                                fontSize: '1rem', fontWeight: 400, color: '#325343',
                                                textAlign: 'end', mr: 1
                                            }}
                                        >-{item.clientName} </Typography>

                                    ) : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                    </Box>

                    <MobileStepper sx={{ backgroundColor: 'transparent' }}
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep} backButton={undefined} nextButton={undefined}                        // nextButton and backButton props are removed to hide the buttons
                    />
                </Box>

            </Box>
        </Box>
    );
};

export default ViewTherapistComponent;
