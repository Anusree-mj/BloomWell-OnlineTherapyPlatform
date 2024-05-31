import { useState, useEffect } from 'react';
import {
    Box, Typography, Avatar, Accordion, AccordionDetails, AccordionSummary,
    Rating, useTheme, Paper, Button, MobileStepper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { getTherapistProfileAction, therapistStateType } from '@/store/therapists/therapistReducers';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';




const ViewTherapistComponent: React.FC<{ therapistId: string; }> = ({ therapistId }) => {
    const dispatch = useDispatch();
    const therapist = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const ratings = useSelector((state: { therapist: therapistStateType }) => state.therapist.ratings);
    const reviews = useSelector((state: { therapist: therapistStateType }) => state.therapist.reviews);

    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = reviews.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
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
            <Rating name="read-only" value={ratings} readOnly />
            <Box sx={{
                display: 'flex', justifyContent: 'center', maxWidth: '100%',
                flexDirection: 'column', alignItems: 'center', pt: 4, pb: 6,
            }}>
                <Box sx={{ maxWidth: '80%', width: '80rem', mt: 4 }}>
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

                <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 50,
                            pl: 2,
                            bgcolor: 'background.default',
                        }}
                    >
                        <Typography>{reviews[activeStep].comments}</Typography>
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
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 255,
                                            display: 'block',
                                            maxWidth: 400,
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                        src={item.clientName}
                                        alt={item.clientName}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Back
                            </Button>
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ViewTherapistComponent;
