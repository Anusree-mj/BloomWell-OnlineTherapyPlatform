'use client'
import { useState } from "react";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { QuestionnaireItem } from './submitClientDetails';

interface TypeComponentProps {
    questionnaire: QuestionnaireItem[];
    setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
    setQuestionnaireField: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitDetails: React.Dispatch<React.SetStateAction<boolean>>;
}


const ClientQuestionnaire: React.FC<TypeComponentProps> = ({
    questionnaire, setAnswers, setQuestionnaireField,
    setSubmitDetails }) => {

    const [qtnIndex, setQtnIndex] = useState(0);
    const qtn = questionnaire[qtnIndex]


    const handleAnswers = (answer: string | null) => {
        if (!answer) {
            toast.error('Please select an option');
            return;
        }
        setAnswers((prevAnswers) => [...prevAnswers, answer]);
        if (qtnIndex !== questionnaire.length - 1) {
            setQtnIndex((prevQtn) => prevQtn + 1);
            return
        } else {
            setQuestionnaireField(false)
            setSubmitDetails(true);
            return
        }
    }

    return (
        <>
            <FormControl sx={{
                width: '30rem', backgroundColor: 'white',
                padding: 4, maxWidth: '90%', minHeight: { xs: '55vh', sm: '60vh' },
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
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
    )
}
export default ClientQuestionnaire