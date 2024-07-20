import { Accordion, AccordionSummary, Typography, AccordionDetails, Avatar, Rating, Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from "next/navigation";
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { apiCall } from '@/services/api';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { toast } from 'react-toastify';

interface AccordionItem {
    title: string;
    button?: string;
    url?: string;
    isAdd?: boolean;
}
interface AccordionContentItem {
    content: string[];
}
interface TherapySidebarComponentProps {
    rating: number;
    AccordionItems: AccordionItem[];
    AccordionContent: AccordionContentItem[];
    reciever: {
        name: string;
        recieverId: string;
        image: string;
    };
}

const TherapySidebarComponent: React.FC<TherapySidebarComponentProps> = ({
    AccordionItems, AccordionContent, reciever, rating }) => {
    const router = useRouter();
    const [values, setValues] = useState<{ [key: string]: string }>({});
    const [expandedPanel, setExpandedPanel] = useState<string | false>(false);
    const [addValue, setAddValue] = useState<{ [key: string]: boolean }>({});
    const [data, setData] = useState<{ [key: string]: string }>({});

    const handleExpansion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : false);
    };

    const handleButtonClick = (url: string) => {
        router.push(`/${url}`)
    }

    const handleAddDetails = async (key: string) => {
        const value = values[key];
        if (value) {
            const response = await apiCall({
                method: 'POST',
                endpoint: `therapist/add/${key}`,
                body: { value, clientId: reciever.recieverId }
            });
            if (response.status === 'ok') {
                setData(prevValues => ({ ...prevValues, [key]: value }))
                setValues(prevValues => ({ ...prevValues, [key]: '' }));
                console.log('response got', response);
            }
        } else {
            toast.error(`Add ${key}`);
        }
    };
    const handleChange = (title: string, value: string) => {
        setValues(prevValues => ({ ...prevValues, [title]: value }));
    };

    const handleAddClick = (title: string) => {
        setAddValue(prevState => ({ ...prevState, [title]: !prevState[title] }));
    };

    return (
        <Box sx={{
            width: { md: '20rem', xs: '40rem' }, maxWidth: { xs: '95%', md: '90%' },
            backgroundColor: 'white', pt: 1, mt: 1,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)', minHeight: '87vh',
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
                                    <Avatar
                                        src={reciever.image !== '' ? reciever.image : "/broken-image.jpg"}
                                        sx={{ width: 100, height: 100 }} />
                                    <Box sx={{
                                        display: 'flex', flexDirection: 'column',
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Typography variant="h6" noWrap component="div"
                                            sx={{ color: '#325343', fontSize: '1rem', fontWeight: 600, ml: 2 }}>
                                            {reciever.name}
                                        </Typography>
                                        {rating !== 0 &&
                                            <Rating name="read-only" value={rating} readOnly size="small" />
                                        }
                                    </Box>
                                </Box>
                                <Button variant="contained"
                                    sx={{
                                        mt: 2, backgroundColor: '#325343', width: '20rem', maxWidth: '80%', p: '0.2rem',
                                        '&:hover': {
                                            backgroundColor: '#49873D',
                                            color: 'white',
                                        }
                                    }} onClick={() => { handleButtonClick(item.url ? item.url : '') }}
                                >{item.button}</Button>
                            </Box>
                        ) : (
                            <Box sx={{
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                {AccordionContent[index - 1].content.map((content) => (
                                    <Box key={content} sx={{
                                        display: 'flex',
                                        justifyContent: 'space-around', alignItems: 'center', width: '100%'
                                    }}>
                                        <Typography sx={{
                                            color: '#325343', fontSize: '1rem', fontWeight: 600,
                                            alignSelf: 'center'
                                        }}>
                                            {data[item.title] && data[item.title] !== '' ? data[item.title] : content}                                        </Typography>
                                        {item.isAdd && (
                                            <AddCircleOutlineIcon sx={{ color: '#325343', cursor: 'pointer' }} onClick={() => handleAddClick(item.title)} />
                                        )}
                                    </Box>
                                ))}
                                {item.button && (
                                    <Button variant="contained"
                                        sx={{
                                            mt: 2, backgroundColor: '#325343', width: '20rem', maxWidth: '80%', p: '0.2rem',
                                            '&:hover': {
                                                backgroundColor: '#49873D',
                                                color: 'white',
                                            }
                                        }} onClick={() => { router.push(`${item.url}`) }}
                                    > {item.button}
                                    </Button>
                                )}
                                {item.isAdd && addValue[item.title] &&
                                    <Box
                                        sx={{
                                            display: 'flex', flexDirection: 'column',
                                            alignItems: 'center', justifyContent: 'center'
                                        }}>
                                        <TextField
                                            id="outlined-basic"
                                            label={`Add ${item.title}`}
                                            variant="outlined"
                                            value={values[item.title] || ''}
                                            sx={{ maxWidth: '90%', width: '100%', mt: 2 }}
                                            onChange={(e) => handleChange(item.title, e.target.value)}
                                        />

                                        <Button variant="contained"
                                            sx={{
                                                mt: 2, backgroundColor: '#325343', width: '20rem', maxWidth: '80%', p: '0.2rem',
                                                '&:hover': {
                                                    backgroundColor: '#49873D',
                                                    color: 'white',
                                                }
                                            }} onClick={() => { handleAddDetails(item.title) }}
                                        > {item.title === 'Description' &&
                                            AccordionContent[1].content[0] !== 'No description added yet'
                                            ? 'EDIT'
                                            : 'ADD'}
                                        </Button>
                                    </Box>
                                }
                            </Box>
                        )}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>)
}

export default TherapySidebarComponent
