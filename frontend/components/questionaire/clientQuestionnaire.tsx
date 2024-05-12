'use client'
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import OTPInput from "../common/otp/otp";
import ClientSignupComponent from "../signupComponents/client/clientSignup";

interface Question {
    question: string;
    options: string[];
}

const ClientQuestionnaire: React.FC<{ type: string; questionnaire: Question[] }> = ({ type, questionnaire }) => {
    const [qtnIndex, setQtnIndex] = useState(0);
    const qtn = questionnaire[qtnIndex]
    const [answers, setAnswers] = useState<string[]>([])
    const [selectedValue, setSelectedValue] = useState<string | null>('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confrmPassword, setConfrmPassword] = useState('');
    const [questionnaireField, setQuestionnaireField] = useState(true)
    const [signUpField, setSignupField] = useState(false)
    const [otpField, setOtpField] = useState(false)
    const [otp, setOtp] = useState('');

    const handleAnswers = (answer: string | null) => {
        if (!answer) {
            toast.error('Please select an option');
            console.log('answerrr', answer)
            return;
        }
        if (qtnIndex === questionnaire.length - 1) {
            setQuestionnaireField(false);
            setSignupField(true)
        }
        setAnswers((prevAnswers) => [...prevAnswers, answer]);
        setSelectedValue(null)
        setQtnIndex((prevQtn) => prevQtn + 1)
    }


    const handleOtp = () => {
        console.log(otp, 'ottpppp')
    }
    // const checkIsValid = () => {
    //     let isValid = true;
    //     if (!name) {
    //         toast.error('Please include your name')
    //         isValid=false
    //     }if(!email){
    //         toast.e
    //     }
    // }
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 4,
            flexDirection: 'column', backgroundColor: '#F7FCC2',
        }}>
            {questionnaireField && (
                <>
                    <Typography sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        textAlign: 'center', color: '#325343', mt: 4, mb: 1
                    }}>
                        Help us match you to the right therapist
                    </Typography>
                    <Typography sx={{
                        fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: '#325343',
                        width: '30rem', maxWidth: '80%', mb: 2
                    }
                    }>The following questions are designed to match you to a licensed therapist based on your
                        therapy needs and personal preferences.</Typography>
                    <FormControl sx={{
                        width: '30rem', backgroundColor: 'white',
                        padding: 4, maxWidth: '90%', minHeight: { xs: '55vh', sm: '60vh' },
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.6rem',
                    }}>
                        <FormLabel id="demo-controlled-radio-buttons-group"
                            sx={{ fontSize: '1.2rem', fontWeight: 700 }}
                        >{qtn.question}</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group" sx={{ mt: 2 }}
                            value={selectedValue}
                            onChange={(event) => setSelectedValue(event.target.value)}
                        >
                            {qtn.options.map((item) => (
                                <FormControlLabel key={item} value={item} control={<Radio color="success" />}
                                    label={item} />
                            ))}
                        </RadioGroup>
                        <Button variant="contained" sx={{
                            width: '20rem', maxWidth: '30%', color: '#325343',
                            ml: { xs: 22, sm: 36 }, backgroundColor: '#a6de9b',
                            '&:hover': {
                                backgroundColor: '#325343',
                                color: 'white'
                            }
                        }} onClick={() => { handleAnswers(selectedValue) }}>Next</Button>
                    </FormControl>
                </>
            )}{signUpField && (
                <>
                    <Typography sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        textAlign: 'center', color: '#325343', mt: 2, mb: 1
                    }}>
                        You've completed the questionaire !
                    </Typography>
                    <Typography sx={{
                        fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: '#325343',
                        width: '30rem', maxWidth: '80%', mb: 2
                    }
                    }>Now, Signin with your credentials.</Typography>
                    <ClientSignupComponent name={name} setName={setName} email={email} setEmail={setEmail}
                        password={password} setPassword={setPassword} confrmPassword={confrmPassword} setConfrmPassword={setConfrmPassword}
                        setSignupField={setSignupField} setOtpField={setOtpField}
                    />
                </>
            )}
            {otpField && (
                <>
                    <Typography sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        textAlign: 'center', color: '#325343', mt: 2, mb: 1
                    }}>
                        You've completed the questionaire !
                    </Typography>
                    <Typography sx={{
                        fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: '#325343',
                        width: '30rem', maxWidth: '80%', mb: 2
                    }
                    }>Now, Signin with your credentials.</Typography>
                    <FormControl sx={{
                        width: '30rem', backgroundColor: 'white',
                        padding: 4, maxWidth: '90%', minHeight: '50vh',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.6rem',
                    }}>
                        <OTPInput otp={otp} setOtp={setOtp} />
                        <Button variant="contained"
                            sx={{
                                mt: 3, borderRadius: '2rem',
                                maxWidth: '90%', width: '30rem', color: '#325343',
                                backgroundColor: '#a6de9b',
                                '&:hover': {
                                    backgroundColor: '#325343',
                                    color: 'white'
                                }
                            }} onClick={handleOtp}
                        >Continue</Button>
                    </FormControl>
                </>
            )}
        </Box>
    )
}
export default ClientQuestionnaire