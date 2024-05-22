import { toast } from 'react-toastify';
import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

interface DescriptionComponentProps {
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setDescriptionField: React.Dispatch<React.SetStateAction<boolean>>;
    setPhotoField: React.Dispatch<React.SetStateAction<boolean>>;
}

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
    description, setDescription, setDescriptionField,
    setPhotoField }) => {

    const handleNext = () => {
        if (!description || description.trim() === '') {
            toast.error('Please give a proper description.');
            return;
        }
        setDescriptionField(false);
        setPhotoField(true)
    }

    return (
        <>
            <Typography sx={{
                fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: '#325343',
                width: '30rem', maxWidth: '80%', mt: 3
            }}>This information will be displayed on your public profile page for clients
                to learn about you and your areas of expertise.</Typography>
            <Box sx={{
                mt: 3,
                display: 'flex', justifyContent: 'center',
                alignItems: 'center', flexDirection: 'column',
                gap: '1rem',
                width: '30rem',
                backgroundColor: 'white',
                padding: 4,
                maxWidth: '90%',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.6rem',
            }}>
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ width: '100%' }}
                />

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

export default DescriptionComponent;