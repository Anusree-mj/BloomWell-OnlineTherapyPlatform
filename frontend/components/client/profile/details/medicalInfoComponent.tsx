import { useEffect, useState } from 'react';
import { Divider, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { individualQuestionnaire } from '../../submitDetails/questions/individual';
import { teenQuestionnaire } from '../../submitDetails/questions/teen';
import { coupleQuestionnaire } from '../../submitDetails/questions/couple';
import EditMedicalInfoComponent from '../edit/editMedicalInfo';

interface MedicalInfoProps {
    medicalInfoItems: {
        sessionType: string,
        questionnaire: string[]
    },
    readOnly: boolean
}

const MedicalInfoComponent: React.FC<MedicalInfoProps> = ({ medicalInfoItems, readOnly }) => {
    const [showMore, setShowMore] = useState(false);
    const [editMedicalInfo, setEditMedicalInfo] = useState(false)

    useEffect(() => {
        console.log('medical info itemssssss', medicalInfoItems)
    }, [])
    let questions = [];
    if (medicalInfoItems.sessionType === 'Individual therapy') {
        questions = individualQuestionnaire;
    } else if (medicalInfoItems.sessionType === 'Teen therapy') {
        questions = teenQuestionnaire;
    } else {
        questions = coupleQuestionnaire;
    }

    const toggleShowMore = () => {
        setShowMore(!showMore);
    }

    const displayedQuestions = showMore ? questions : questions.slice(0, 3);

    return (
        <Box sx={{
            backgroundColor: 'white', display: 'flex', mt: '2rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 1.1)',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#325343' }}>Medical Info (Filled In Questionnaires) </Typography>
                {!readOnly && (
                    <EditNoteIcon sx={{ fontWeight: 800, color: '#325343' }} onClick={() => { setEditMedicalInfo(true) }} />
                )}
            </Box>
            <Divider sx={{ mb: 2 }} />
            {!editMedicalInfo ? (
                <>
                    {displayedQuestions.map((question, index) => (
                        <Box key={index} sx={{ mt: 1 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#325343' }}>{question.question}</Typography>
                            <Typography sx={{ fontWeight: 200, fontSize: '1rem', color: '#325343' }}>{medicalInfoItems.questionnaire[index]}</Typography>
                        </Box>
                    ))}
                    {questions.length > 3 && (
                        <Button variant='text' onClick={toggleShowMore} sx={{
                            mt: 2, alignSelf: 'flex-start', textTransform: 'none', p: 0, fontWeight: 800,
                            color: '#325343', textDecoration: 'underline', fontSize: '0.9rem',
                        }}>
                            {showMore ? 'Show Less' : 'Show more'}
                        </Button>
                    )}
                </>
            ) : (
                <EditMedicalInfoComponent setEditMedicalInfo={setEditMedicalInfo} questions={questions} />
            )}
        </Box>
    );
}

export default MedicalInfoComponent;
