'use client'
import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import TherapyType from './therapyType';
import ClientQuestionnaire from './clientQuestionnaire';
import AgeComponent from './ageComponent';


export interface QuestionnaireItem {
    question: string;
    options: string[];
}

const ClientDetailsComponent = () => {
    const [typeField, setTypeField] = useState(true);
    const [type, setType] = useState('')
    const [age, setAge] = useState('')
    const [ageField, setAgeField] = useState(false)
    const [questionnaire, setQuestionnaire] = useState<QuestionnaireItem[]>([]);
    const [questionnaireField, setQuestionnaireField] = useState(false)
    const [answers, setAnswers] = useState<string[]>([])
    const [submitDetails, setSubmitDetails] = useState(false);

    const handleDetailSubmission = () => { 
        
    }

    return (
        <Box sx={{
            backgroundColor: '#F7FCC2', display: 'flex',
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            minHeight: '85vh', paddingBottom: '2rem'
        }}>
            {typeField && (
                <TherapyType setType={setType} setTypeField={setTypeField}
                    setAgeField={setAgeField}
                    questionnaire={questionnaire} setQuestionnaire={setQuestionnaire} />
            )}
            {ageField && (
                <AgeComponent type={type} age={age}
                    setAge={setAge} setAgeField={setAgeField}
                    setQuestionnaireField={setQuestionnaireField} />
            )}
            {questionnaireField && (
                <ClientQuestionnaire questionnaire={questionnaire}
                    setQuestionnaireField={setQuestionnaireField}
                    setAnswers={setAnswers} setSubmitDetails={setSubmitDetails} />
            )}
            {submitDetails && (
                <>
                    <Typography sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        textAlign: 'center', color: '#325343', mt: 4, mb: 1
                    }}>
                        You Have Succesfully Completed The Questionnaire!
                    </Typography>
                    <Typography sx={{
                        fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: '#325343',
                        width: '30rem', maxWidth: '80%', mb: 2
                    }
                    }>Let's get started.</Typography>

                    <Button variant="contained"
                        sx={{
                            color: '#325343', mt: 2, borderRadius: '0.7rem',
                            backgroundColor: '#a6de9b', mb: 3,
                            '&:hover': {
                                backgroundColor: '#325343',
                                color: 'white'
                            }
                        }}
                        onClick={handleDetailSubmission}>
                        Continue</Button>

                </>
            )}
        </Box>
    )
}

export default ClientDetailsComponent;