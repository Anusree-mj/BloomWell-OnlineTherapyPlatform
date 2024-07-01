'use client'
import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import TherapyType from './therapyType';
import ClientQuestionnaire from './clientQuestionnaire';
import AgeComponent from './ageComponent';
import { saveClientDetailsAction, clientStateType } from '@/store/clients/clientReducer';
import { toast } from 'react-toastify';

export interface QuestionnaireItem {
    question: string;
    options: string[];
}

const ClientDetailsComponent = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state: { client: clientStateType }) => state.client.isLoading);
    const error = useSelector((state: { client: clientStateType }) => state.client.error);
    const router = useRouter();

    const [typeField, setTypeField] = useState(true);
    const [type, setType] = useState('')
    const [age, setAge] = useState('')
    const [ageField, setAgeField] = useState(false)
    const [questionnaire, setQuestionnaire] = useState<QuestionnaireItem[]>([]);
    const [questionnaireField, setQuestionnaireField] = useState(false)
    const [answers, setAnswers] = useState<string[]>([])
    const [submitDetails, setSubmitDetails] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');
        const { email, questionnaire } = clientData
        console.log(email, 'email got')
        setEmail(email);
        if (questionnaire.length !== 0) {
            router.push('/client/payment')
        }
        if (Object.keys(clientData).length === 0) {
            router.push('/login')
        }
    }, [])

    useEffect(() => {
        toast.error(error);
    }, [error])


    const handleDetailSubmission = () => {
        dispatch(saveClientDetailsAction({ email, type, age, answers, handleDetailSubmissionSuccess }))
    }
    const handleDetailSubmissionSuccess = () => {
        router.push('/client/payment')
    }
    return (
        <Box sx={{
            backgroundColor: '#325343', display: 'flex',
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            minHeight: '90vh', paddingBottom: '2rem'
        }}>
            {!submitDetails && (
                <>
                    <Typography sx={{
                        fontSize: '1.2rem', fontWeight: 800,
                        textAlign: 'center', color: 'white', mt: 2, mb: 1
                    }}>
                        Help us match you to the right therapist
                    </Typography>
                    <Typography sx={{
                        fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: 'white',
                        width: '40rem', maxWidth: '100%', mb: 5
                    }
                    }>The following questions are designed to match you to a licensed therapist based on your
                        therapy needs and personal preferences.</Typography>
                </>
            )}
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
                        fontSize: '1.2rem', fontWeight: 800,
                        textAlign: 'center', color: 'white', mt: 4, mb: 1
                    }}>
                        You Have Succesfully Completed The Questionnaire!
                    </Typography>
                    <Typography sx={{
                        fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: 'white',
                        width: '30rem', maxWidth: '80%', mb: 2
                    }
                    }>Let's get started.</Typography>

                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="end"
                        variant="contained"
                        sx={{
                            color: '#325343', mt: 2, borderRadius: '0.7rem',
                            backgroundColor: '#a6de9b', mb: 3,
                            '&:hover': {
                                backgroundColor: '#325343',
                                color: 'white'
                            }
                        }}
                        onClick={handleDetailSubmission}
                    >
                        Continue</LoadingButton>

                </>
            )}
        </Box>
    )
}

export default ClientDetailsComponent;