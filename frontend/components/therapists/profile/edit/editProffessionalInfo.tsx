import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTherapistProfileAction, therapistStateType } from '@/store/therapists/therapistReducers';
import { Box } from '@mui/system';
import { Button, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import { experienceOptions, genderOptions } from '../../detailsSubmission/licenseComponent';
import { therapistRoleContents } from '@/components/user/therapistJob/queryComponent';
import axios from 'axios';
import UploadIcon from '@mui/icons-material/Upload';
import { toast } from 'react-toastify';
import { apiCall } from '@/services/api';

interface ProffessionalInfoProps {
    licenseNo: string,
    licenseProof: string,
    experience: string,
    expertise: string[]
}
interface validateInfo {
    licenseNo: string,
    expertise: string,
}

interface EditProffessionalInfoProps {
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProffessionalInfoComponent: React.FC<EditProffessionalInfoProps> = ({ setIsEdit }) => {
    const therapistDetails = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const dispatch = useDispatch()
    const [isChange, setIsChange] = useState(false)
    const [file, setFile] = useState<File | null>(null);
    const [isCountryChange, setIsCountryChange] = useState(false)
    const [editProffessionalInfo, setEditProffessionalInfo] = useState<ProffessionalInfoProps>({
        licenseNo: therapistDetails.license.licenseNo,
        licenseProof: therapistDetails.license.licenseProof,
        experience: therapistDetails.experience,
        expertise: therapistDetails.expertise,
    })

    const [spanText, setSpanText] = useState<validateInfo>({
        licenseNo: '',
        expertise: '',
    })

    const handleEdit = async () => {
        try {
            if (!isChange) {
                setIsEdit(false);
                return;
            }
            const valid = checkValidity();
            if (!valid) {
                setIsEdit(false);
                return;
            }
            else {
                console.log('axios called')
                const response = await apiCall({
                    method: 'PUT',
                    endpoint: `therapist/profile/proffessional`,
                    body: { proffessionalInfo: editProffessionalInfo }
                });
                if (response.status === 'ok') {
                    setIsEdit(false)
                    dispatch(getTherapistProfileAction())
                }
            }
        } catch (err) {
            console.log('Error found:', err)
        }
    }

    const checkValidity = () => {
        let isValid = true;
        if (editProffessionalInfo.licenseNo.trim() === '') {
            isValid = false;
            setSpanText(prevState => ({
                ...prevState,
                licenseNo: '* This field is required'
            }))
        }
        // if (editProffessionalInfo.expertise.length > 5) {
        //     console.log('not experirse valid')
        //     isValid = false;
        //     setSpanText(prevState => ({
        //         ...prevState,
        //         expertise: '* Atleast 5 items should be selected'
        //     }))
        // }
        return isValid;
    }

    const handleInputChange = (key: string, value: string) => {
        setIsChange(true)
        setEditProffessionalInfo(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleClearSpan = (key: string) => {
        setSpanText(prevState => ({
            ...prevState,
            [key]: ''
        }));
    };

    const uploadLicense = async () => {
        try {
            if (file) {

                const formData = new FormData();
                formData.append('file', file);

                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/therapist/license`,
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setEditProffessionalInfo(prevState => ({
                    ...prevState,
                    licenseProof: response.data.imageUrl
                }))
                toast.success('License Successfully Uploaded')
            } else {
                toast.error('No file selected');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-around', width: '80rem', maxWidth: '90%',
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column',
                maxWidth: '100%', width: '30rem', mt: 2,
            }}>

                <TextField id="outlined-basic" label="licenseNo" variant="outlined"
                    required value={editProffessionalInfo.licenseNo} type="text"
                    sx={{
                        maxWidth: '100%', width: '30rem', mt: 2,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black',
                            },
                        },
                    }} onChange={(e) => { handleInputChange('licenseNo', e.target.value) }}
                    onClick={() => handleClearSpan('licenseNo')}
                />
                <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                >{spanText.licenseNo}</span>
            </Box>
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
                            <IconButton onClick={uploadLicense}>
                                <UploadIcon />
                            </IconButton>
                        </InputAdornment>
                    ),

                }}
                sx={{
                    maxWidth: '100%', width: '30rem', mt: 4,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'black',
                        },
                    },
                }}
                label="Choose Image"
            />
            <TextField
                id="experience"
                select
                label="Experience"
                value={editProffessionalInfo.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                sx={{
                    maxWidth: '100%', width: '30rem', mt: 3,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'black',
                        },
                    },
                }}
            >
                {experienceOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}

            </TextField>
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
                    }} onClick={handleEdit}
                >Edit</Button>
                <Button variant="contained"
                    sx={{
                        mt: 2, backgroundColor: '#325343', width: '30rem', maxWidth: '90%',
                        '&:hover': {
                            backgroundColor: '#49873D',
                            color: 'white',
                        }
                    }} onClick={() => { setIsEdit(false) }}
                >Cancel</Button>
            </Box>
        </Box>
    )
}

export default EditProffessionalInfoComponent