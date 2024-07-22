import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { apiCall } from "@/services/api";

// test
const FeedBackComponent = () => {
    const [feedback, setFeedback] = useState('')
    const [spanText, setSpanText] = useState('')

    const handleSubmit = async () => {
        try {
            if (feedback === '') {
                setSpanText('* This field is required');
                return;
            } else {
                setFeedback('')
                const response = await apiCall({
                    method: 'POST',
                    endpoint: `client/feedback`,
                    body: { feedback }
                });
                if (response.status === 'ok') {
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
                backgroundColor: '#325343',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '90vh',
                paddingBottom: '2rem',
            }} >
            <Typography sx={{
                width: '80rem', maxWidth: '90%', textAlign: 'center',
                color: 'white', fontWeight: 800, fontSize: '1rem', mt: 4
            }}>We hope you found our services helpful. Your feedback is always welcome and valuable in improving BloomWell.
            </Typography>
            <Box sx={{
                backgroundColor: 'white', display: 'flex', mt: '2rem', justifyContent: 'center', alignItems: 'center',
                flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 1.1)',
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
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black'
                            },
                        },
                    }} onClick={() => { setSpanText('') }}
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
