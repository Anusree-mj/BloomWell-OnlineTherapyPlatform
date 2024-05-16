import { toast } from 'react-toastify';
import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import axios from 'axios';

interface ProfileComponentProps {
    image: string;
    setImage: React.Dispatch<React.SetStateAction<string>>;
    setDisableButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({
    image, setImage, setDisableButton }) => {
    const [file, setFile] = useState<File | null>(null);

    const uploadPhoto = async () => {
        try {
            if (file) {
                const response = await axios.post(`http://localhost:8000/therapist/uploadImage`, file);
                setImage(response.data.imageUrl)
                toast.success('Image Successfully Uploaded')
            } else {
                toast.error('No file selected');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Typography sx={{
                fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: '#325343',
                width: '30rem', maxWidth: '80%', mt: 3
            }}>Please upload a professional photo of yourself for use on  your profile description.</Typography>
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
                <Avatar src="/broken-image.jpg" sx={{
                    width: 200, height: 200
                }} />
                <TextField
                    type="file"
                    onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (target.files && target.files.length > 0) {
                            setFile(target.files[0]);
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        accept: "image/*"  // Accept only images
                    }}
                    variant="outlined"
                    sx={{ width: '100%' }}
                    label="Choose Image"
                />
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: '0.7rem', mt: 1,
                        maxWidth: '90%', width: '10rem', color: '#325343',
                        backgroundColor: '#a6de9b',
                        '&:hover': {
                            backgroundColor: '#325343',
                            color: 'white'
                        }
                    }} onClick={uploadPhoto}
                >
                    Upload photo
                </Button>
            </Box >
        </>
    );
};

export default ProfileComponent;