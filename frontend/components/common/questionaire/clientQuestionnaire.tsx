'use client'
import { useEffect, useState } from "react";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import OTPInput from "../common/otp/otp";
import ClientSignupComponent from "../signupComponents/client/clientSignup";
import { useDispatch, useSelector } from 'react-redux'
import { getSignUpAction, clientStateType } from "@/store/clients/clientReducer";
import LoadingButton from "@mui/lab/LoadingButton";

interface Question {
    question: string;
    options: string[];
}

const ClientQuestionnaire: React.FC<{ type: string; questionnaire: Question[] }> = ({ type, questionnaire }) => {
    const [qtnIndex, setQtnIndex] = useState(0);
    const qtn = questionnaire[qtnIndex]
    const [answers, setAnswers] = useState<string[]>([])
    const [questionnaireField, setQuestionnaireField] = useState(true)

    const handleAnswers = (answer: string | null) => {
        if (!answer) {
            toast.error('Please select an option');
            console.log('answerrr', answer)
            return;
        }
        setAnswers((prevAnswers) => [...prevAnswers, answer]);
        setQtnIndex((prevQtn) => prevQtn + 1)
    }

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
                        {qtn.options.map((item) => (
                            <Button variant="contained" key={item} sx={{
                                color: '#325343', mt: 2, borderRadius: '0.7rem',
                                backgroundColor: '#a6de9b',
                                '&:hover': {
                                    backgroundColor: '#325343',
                                    color: 'white'
                                }
                            }} onClick={() => { handleAnswers(item) }}>{item}</Button>
                        ))}
                    </FormControl>
                </>
            )}
        </Box>
    )
}
export default ClientQuestionnaire