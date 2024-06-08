import { useState } from 'react'
import { useSelector } from "react-redux";
import { therapistStateType } from '@/store/therapists/therapistReducers';
import { Box } from '@mui/system';
import { Button, MenuItem, TextField, Typography } from '@mui/material';



interface EditPersonalInfoProps {
    setEditAboutInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AboutInfo {
    description: string
}


const EditTherapistAboutComponent: React.FC<EditPersonalInfoProps> = ({ setEditAboutInfo }) => {
    const therapistDetails = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);

    const [description, setDescription] = useState(therapistDetails.description);

    return (
        <Box sx={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-around', width: '80rem', maxWidth: '90%',
        }}>

            <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                sx={{ width: '100%' }}
            />
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                maxWidth: '100%', justifyContent: 'center', width: '50rem'
            }}>
                <Button variant="outlined"
                    sx={{
                        mt: 5, width: '30rem', maxWidth: '90%',
                        color: '#325343', border: '2px solid #325343',
                        '&:hover': {
                            backgroundColor: '#95C08D',
                            color: '#325343',
                            border: '2px solid #95C08D'
                        },
                    }}
                >Edit</Button>
                <Button variant="contained"
                    sx={{
                        mt: 2, backgroundColor: '#325343', width: '30rem', maxWidth: '90%',
                        '&:hover': {
                            backgroundColor: '#49873D',
                            color: 'white',
                        }
                    }} onClick={() => { setEditAboutInfo(false) }}
                >Cancel</Button>
            </Box>
        </Box>
    )
}

export default EditTherapistAboutComponent