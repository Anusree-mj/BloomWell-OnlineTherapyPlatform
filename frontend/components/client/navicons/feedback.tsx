import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Radio from '@mui/material/Radio';
import { pink } from '@mui/material/colors';
import axios from "axios";
import { toast } from "react-toastify";


const FeedBackComponent = () => {
    const router = useRouter();
    const [feedback, setFeedback] = useState('')
    const [spanText, setSpanText] = useState('')

    useEffect(() => {
        const clientData = localStorage.getItem("clientData");
        if (!clientData) {
            router.push('/login');
        }
    }, []);

    const handleSubmit = async () => {
        try {
            if (feedback === '') {
                setSpanText('* This field is required');
                return;
            } else {
                setFeedback('')
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/client/feedback`,
                    { feedback }, { withCredentials: true });
                if (response.data.status === 'ok') {
                    toast.success('Thankyou for your feedback!')
                }
            }
        } catch (err) {
            console.log('ERRor found:', err)
        }
    }

    return (
        <Box
            sx={{
                backgroundColor: '#F7FCC2',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '85vh',
                paddingBottom: '2rem',
            }} >
            <Typography sx={{
                width: '80rem', maxWidth: '90%', textAlign: 'center',
                color: '#325343', fontWeight: 800, fontSize: '1rem', mt: 4
            }}>We hope you found our services helpful. Your feedback is always welcome and valuable in improving BloomWell.
            </Typography>
            <Box sx={{
                backgroundColor: 'white', display: 'flex', mt: '2rem', justifyContent: 'center', alignItems: 'center',
                flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.3)',
                width: '60rem', maxWidth: '90%'
            }}>
                <Typography sx={{
                    fontWeight: 600, fontSize: '1rem', color: '#325343',
                    mt: 2, alignSelf: 'flex-start'
                }}>Feedback</Typography>
                <span style={{
                    color: 'red', fontSize: '0.8rem', marginTop: '0.1rem',
                    marginLeft: '0.9rem', textAlign: 'start', width: '70rem', maxWidth: '100%',
                }}
                >{spanText}</span>
                <TextField id="outlined-basic" label="Feedback"
                    required type="text"
                    multiline
                    rows={4}
                    value={feedback}
                    sx={{
                        alignSelf: 'flex-start',
                        maxWidth: '100%', width: '30rem', mt: 1,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black'
                            },
                        },
                    }}  onClick={() => { setSpanText('') }}
                    onChange={(e) => { setFeedback(e.target.value) }}
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

export default FeedBackComponent;
