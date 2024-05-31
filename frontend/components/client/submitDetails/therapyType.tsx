'use client'
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';
import { individualQuestionnaire } from './questions/individual';
import { coupleQuestionnaire } from './questions/couple';
import { teenQuestionnaire } from './questions/teen';
import { QuestionnaireItem } from './submitClientDetails';

interface TypeComponentProps {
    setType: React.Dispatch<React.SetStateAction<string>>;
    setTypeField: React.Dispatch<React.SetStateAction<boolean>>;
    setAgeField: React.Dispatch<React.SetStateAction<boolean>>;
    questionnaire: QuestionnaireItem[];
    setQuestionnaire: React.Dispatch<React.SetStateAction<QuestionnaireItem[]>>;
}


const TherapyType: React.FC<TypeComponentProps> = ({
    setType, setTypeField, setAgeField, questionnaire, setQuestionnaire }) => {
    const typeItems = ['Individual therapy', 'Couple therapy', 'Teen therapy']

    const handleTypeSubmit = (type: string) => {
        if (type === 'Individual therapy') {
            setQuestionnaire(individualQuestionnaire);
        } else if (type === 'Couple therapy') {
            setQuestionnaire(coupleQuestionnaire)
        } else {
            setQuestionnaire(teenQuestionnaire)
        }
        setType(type);
        setTypeField(false)
        setAgeField(true)
    }

    return (
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
                >What type of therapy are you loodking for?</FormLabel>
                {typeItems.map((item) => (
                    <Button variant="contained" key={item} sx={{
                        color: '#325343', mt: 2, borderRadius: '0.7rem',
                        backgroundColor: '#a6de9b',
                        '&:hover': {
                            backgroundColor: '#325343',
                            color: 'white'
                        }
                    }} onClick={() => handleTypeSubmit(item)}>{item}
                    </Button>
                ))}
            </FormControl>

        </>
    )
}
export default TherapyType