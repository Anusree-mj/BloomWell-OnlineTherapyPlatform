import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Divider, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import Radio from '@mui/material/Radio';
import axios from "axios";
import { apiCall } from "@/services/api";


const TherapistQuitComponent = () => {
    const router = useRouter();
    const [quitInfo, setQuitInfo] = useState({
        reason: '',
        feedback: ''
    })
    const [spanInfo, setSpanInfo] = useState({
        reason: '',
        feedback: ''
    })
    useEffect(() => {
        const therapistData = localStorage.getItem("therapistData");
        if (!therapistData) {
            router.push('/login');
        }
    }, []);
    const reasonItems = ['Poor User Experience', 'Billing and Payment Issues', 'Technical Issues',
        'Personal Reasons', 'Work-Life Balance', 'Lack of Professional Growth']
    const handleOnChange = (key: string, item: string) => {
        setQuitInfo(prevState => ({
            ...prevState,
            [key]: item
        }))
    }
    const checkValid = () => {
        let isValid = true;
        if (quitInfo.reason === '') {
            isValid = false;
            handleSpanChange('reason')
        } if (quitInfo.feedback === '') {
            isValid = false;
            handleSpanChange('feedback')
        }
        return isValid
    }
    const handleSpanChange = (key: string) => {
        setSpanInfo(prevState => ({
            ...prevState,
            [key]: '*This field is required'
        }))
    }
    const clearSpan = (key: string) => {
        setSpanInfo(prevState => ({
            ...prevState,
            [key]: ''
        }))
    }
    const handleSubmit = async () => {
        try {
            const valid = checkValid()
            if (!valid) {
                return;
            } else {
                const response = await apiCall({
                    method: 'PUT',
                    endpoint: `therapist/quit`,
                    body: { quitInfo }
                });
                if (response.status === 'ok') {
                    router.push('/therapist/activities/active')
                }
            }
        } catch (err) {
            console.log('ERRor found:', err)
        }

    }

    return (
        <Box
            sx={{
                backgroundColor: '#325343',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '85vh', pb: 8
            }}
        >
            <Typography sx={{
                width: '80rem', maxWidth: '90%', textAlign: 'center',
                color: 'white', fontWeight: 800, fontSize: '1rem', mt: 4
            }}>We're sorry to see you leave. Your feedback is valuable in improving BloomWell. Please share your reasons for leaving to
                help us enhance our services.</Typography>
            <Box sx={{
                backgroundColor: 'white', display: 'flex', mt: '2rem', justifyContent: 'center', alignItems: 'center',
                flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 1.1)',
                width: '60rem', maxWidth: '90%'
            }}>
                <Typography sx={{
                    fontWeight: 600, fontSize: '1rem', color: '#325343',
                    alignSelf: 'flex-start'
                }}>Choose a reason for quiting</Typography>
                <span style={{
                    color: 'red', fontSize: '0.8rem', marginTop: '0.1rem',
                    marginLeft: '0.9rem', textAlign: 'start', width: '70rem', maxWidth: '100%',
                }}
                >{spanInfo.reason}</span>
                <FormGroup sx={{ alignSelf: 'flex-start' }}>
                    {reasonItems.map((item) => (
                        <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio
                                sx={{
                                    color: '#325343',
                                    '&.Mui-checked': {
                                        color: '#325343',
                                    },
                                }}
                            />}
                            label={item} onClick={() => { clearSpan('reason') }}
                            onChange={() => { handleOnChange('reason', item) }}
                            checked={quitInfo.reason === item}
                        />
                    ))}
                </FormGroup>
                <Divider sx={{ width: '100%', mt: 1, mb: 1 }} />

                <Typography sx={{
                    fontWeight: 600, fontSize: '1rem', color: '#325343',
                    mt: 2, alignSelf: 'flex-start'
                }}>Feedback</Typography>
                <span style={{
                    color: 'red', fontSize: '0.8rem', marginTop: '0.1rem',
                    marginLeft: '0.9rem', textAlign: 'start', width: '70rem', maxWidth: '100%',
                }}
                >{spanInfo.feedback}</span>
                <TextField id="outlined-basic" label="Feedback"
                    required type="text"
                    multiline
                    rows={4}
                    value={quitInfo.feedback}
                    sx={{
                        alignSelf: 'flex-start',
                        maxWidth: '100%', width: '30rem', mt: 1,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black'
                            },
                        },
                    }} onClick={() => { clearSpan('feedback') }}
                    onChange={(e) => { handleOnChange('feedback', e.target.value) }}
                // onClick={() => handleClearSpan('name')}
                />
                <Button variant="contained"
                    sx={{
                        alignSelf: { sm: 'flex-end' },
                        mt: 4, backgroundColor: '#325343', width: '10rem', maxWidth: '90%',
                        '&:hover': {
                            backgroundColor: '#49873D',
                            color: 'white',
                        }
                    }} onClick={handleSubmit}
                >Submit</Button>
            </Box>

        </Box>
    );
};

export default TherapistQuitComponent;
