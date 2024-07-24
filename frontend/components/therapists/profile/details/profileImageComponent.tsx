import { useState } from "react";
import { Avatar, Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import UploadIcon from '@mui/icons-material/Upload';
import { useDispatch } from "react-redux";
import { getTherapistProfileAction } from '@/store/therapists/therapistReducers';

interface ProfileImageProps {
    image: string;
    setImage: React.Dispatch<React.SetStateAction<string>>;
}



const TherapistProfileImageComponent: React.FC<ProfileImageProps> = ({ image, setImage }) => {
    const dispatch = useDispatch()
    const [file, setFile] = useState<File | null>(null);
    const [isProfilePicChange, setIsProfilePicChange] = useState(false)
    const [isImageUploaded, setIsImageUploaded] = useState(false)
    const uploadPhoto = async () => {
        try {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/therapist/uploadImage`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 200) {
                    setImage(response.data.imageUrl)
                    setIsImageUploaded(true)
                    toast.success('Image Successfully Uploaded')
                }
            } else {
                toast.error('No file selected');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageChange = async () => {
        try {
            if (!isImageUploaded) {
                toast.error("No File Selected");
                return
            } else {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/therapist/profile/image`,
                    { image: image }, { withCredentials: true, });
                if (response.status === 200) {
                    dispatch(getTherapistProfileAction())
                    setIsProfilePicChange(false)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <Avatar src={image} sx={{
                width: 200, height: 200,
                alignSelf: 'center'
            }} />

            {isProfilePicChange ? (
                <>
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={uploadPhoto}>
                                        <UploadIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),

                        }}
                        sx={{ width: '60%', mt: 2 }}
                        label="Choose Image"
                    />
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        maxWidth: '100%', justifyContent: 'center', width: '50rem'
                    }}>
                        <Button variant="outlined"
                            sx={{
                                mt: 2, width: '10rem', maxWidth: '90%',
                                color: '#325343', border: '2px solid #325343',
                                '&:hover': {
                                    backgroundColor: '#95C08D',
                                    color: '#325343',
                                    border: '2px solid #95C08D'
                                },
                            }} onClick={handleImageChange}
                        >Done</Button>
                        <Button variant="contained"
                            sx={{
                                mt: 2, backgroundColor: '#325343', width: '10rem', maxWidth: '90%',
                                '&:hover': {
                                    backgroundColor: '#49873D',
                                    color: 'white',
                                }
                            }} onClick={() => { setIsProfilePicChange(false) }}
                        >Cancel</Button>
                    </Box>
                </>
            ) : (
                <Button variant="contained"
                    sx={{
                        mt: 1, backgroundColor: '#325343',
                        '&:hover': {
                            backgroundColor: '#49873D',
                            color: 'white',
                        }
                    }}
                    onClick={() => { setIsProfilePicChange(true) }}
                >Change</Button>
            )}

        </Box>

    );
};

export default TherapistProfileImageComponent;
