'use client'
import { toast } from 'react-toastify';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';

interface ExpertiseComponentProps {
    expertise: string[];
    setExpertise: React.Dispatch<React.SetStateAction<string[]>>;
    setLicenseField: React.Dispatch<React.SetStateAction<boolean>>;
    setexpertiseField: React.Dispatch<React.SetStateAction<boolean>>;
}

const expertiseButtonItems = ['Couple therapy', 'Individual therapy', 'Teen therapy', 'Stress',
    'Depression', 'Anxiety Disorders', 'Trauma Recovery', 'Postpartum', 'Addiction', 
     'Parenting skills', 'Sexual Dysfunction', 'Communication Issues',
    'Relationship Enrichment', 'Social Skills', 'Suicidal Ideation',
    'Family Conflict'
]

const ExpertiseComponent: React.FC<ExpertiseComponentProps> = ({
    expertise, setExpertise, setLicenseField, setexpertiseField }) => {

    const addExpertise = (item: string) => {
        if (expertise.includes(item)) {
            setExpertise(expertise.filter(expertiseItem => expertiseItem !== item));
        } else {
            setExpertise([...expertise, item]);
        }
    }

    const handleNext = () => {
        if (expertise.length < 5) {
            toast.error('Please choose atleast 5 expertise fields');
            return;
        }
        setexpertiseField(false);
        setLicenseField(true)
    }

    return (
        <>
            <Typography sx={{
                fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: '#325343',
                width: '30rem', maxWidth: '80%', mb: 2
            }}>Add atleast 5 areas of expertise that you’d like to offer to clients in therapy.</Typography>
            <Box sx={{
                display: 'flex', justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                width: '50rem',
                backgroundColor: 'white',
                padding: 4,
                maxWidth: '90%',
                minHeight: '50vh',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.6rem',
            }}>
                {expertiseButtonItems.map((item) => (
                    <Button key={item} variant="contained" sx={{
                        width: { xs: '5rem', sm: '10rem' }, mb: '0.6rem',
                        fontSize: { xs: '0.54rem', sm: '0.85rem' },
                        backgroundColor: expertise.includes(item) ? '#49873D' : 'white',
                        border: '1px solid black',
                        color: expertise.includes(item) ? 'white' : '#325343',
                        '&:hover': {
                            backgroundColor: '#49873D', color: 'white'
                        }
                    }} onClick={() => { addExpertise(item) }}>{item}</Button>
                ))}
                <Button
                    onClick={handleNext}
                    variant="contained"
                    sx={{
                        borderRadius: '0.7rem',
                        maxWidth: '90%', width: '10rem', color: '#325343',
                        backgroundColor: '#a6de9b',
                        '&:hover': {
                            backgroundColor: '#325343',
                            color: 'white'
                        }
                    }}
                >
                    Next
                </Button>
            </Box>
        </>
    );
};

export default ExpertiseComponent