'use client'
import FormControl from '@mui/material/FormControl';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { MenuItem, TextField } from "@mui/material";

interface TypeComponentProps {
    type: string;
    age: string;
    setAge: React.Dispatch<React.SetStateAction<string>>;
    setAgeField: React.Dispatch<React.SetStateAction<boolean>>;
    setQuestionnaireField: React.Dispatch<React.SetStateAction<boolean>>;
}

export const teenAgeItems = ['11', '12', '13', '14', '15', '16', '17'];
export const ageItems = ['18-20 years old', '20-30 years old', '31-40 years old', '41-50 years old',
    '51-60 years old', '61-70 years old', '70 above'];

const AgeComponent: React.FC<TypeComponentProps> = ({
    type, age, setAge, setAgeField, setQuestionnaireField }) => {

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
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                borderRadius: '0.6rem',
            }}>
                <Typography
                    sx={{
                        fontSize: '1.2rem', fontWeight: 700,
                        color: '#325343'
                    }}>
                    How old are you </Typography>
                <TextField
                    id="experience"
                    select
                    label="Select your age"
                    value={age}
                    sx={{
                        width: '100%',
                        mt: 2
                    }}
                >
                    {type === 'Teen therapy' ? (
                        <>
                            {teenAgeItems.map((option) => (
                                <MenuItem key={option} value={option}
                                    onClick={() => {
                                        setAge(option), setAgeField(false),
                                        setQuestionnaireField(true)
                                    }}>
                                    {option}
                                </MenuItem>
                            ))}
                        </>
                    ) : (
                        <>
                            {ageItems.map((option) => (
                                <MenuItem key={option} value={option}
                                    onClick={() => {
                                        setAge(option), setAgeField(false),

                                        setQuestionnaireField(true)
                                    }}>

                                    {option}
                                </MenuItem>
                            ))}
                        </>
                    )}
                </TextField>
            </FormControl>
        </>
    )
}
export default AgeComponent