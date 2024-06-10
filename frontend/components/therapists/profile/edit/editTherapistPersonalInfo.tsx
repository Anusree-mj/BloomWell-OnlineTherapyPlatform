import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTherapistProfileAction, therapistStateType } from '@/store/therapists/therapistReducers';
import { Box } from '@mui/system';
import { Button, MenuItem, TextField } from '@mui/material';
import { genderOptions } from '../../detailsSubmission/licenseComponent';
import { therapistRoleContents } from '@/components/user/therapistJob/queryComponent';
import axios from 'axios';


interface PersonalInfo {
    name: string,
    email: string,
    phone: number,
    gender: string,
    role: string,
}
interface validateInfo {
    name: string,
    email: string,
    phone: string,
}

interface EditPersonalInfoProps {
    setEditPersonalInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTherapistPersonalInfoComponent: React.FC<EditPersonalInfoProps> = ({ setEditPersonalInfo }) => {
    const therapistDetails = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const dispatch = useDispatch()
    const [isChange, setIsChange] = useState(false)
    const [changeEmail, setChangeEmail] = useState(false);
    const [editPersonalInfos, setEditPersonalInfos] = useState<PersonalInfo>({
        name: therapistDetails.name,
        email: therapistDetails.email,
        phone: therapistDetails.phone,
        gender: therapistDetails.gender,
        role: therapistDetails.role,
    })
    const [validColor, setValidColor] = useState<validateInfo>({
        name: 'black',
        email: 'black',
        phone: 'black',

    })
    const [spanText, setSpanText] = useState<validateInfo>({
        name: '',
        email: '',
        phone: '',
    })

    const handleEdit = async () => {
        try {
            if (!isChange) {
                setEditPersonalInfo(false);
                return;
            }
            const valid = checkValidity();
            if (!valid) {
                return;
            }
             else {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/therapist/profile/personal`,
                    { personalInfo: editPersonalInfos }, { withCredentials: true, });
                if (response.status === 200) {
                    setEditPersonalInfo(false)
                    dispatch(getTherapistProfileAction())
                }
            }
        } catch (err) {
            console.log('Error found:', err)
        }
    }

    const checkValidity = () => {
        let isValid = true;
        if (editPersonalInfos.name.trim() === '') {
            isValid = false;
            handleBorderChange('name')
            setSpanText(prevState => ({
                ...prevState,
                name: '* This field is required'
            }))
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editPersonalInfos.email)) {
            isValid = false;
            handleBorderChange('email')
            setSpanText(prevState => ({
                ...prevState,
                email: '* Provide valid email'
            }))
        }
        if (!/^\d{10}$/.test(editPersonalInfos.phone.toString())) {
            isValid = false;
            handleBorderChange('email')
            setSpanText(prevState => ({
                ...prevState,
                phone: '* Provide valid phone number'
            }))
        }
        return isValid;
    }

    const handleBorderChange = (key: string) => {
        setValidColor(prevState => ({
            ...prevState,
            [key]: 'red'
        }))
    }

    const handleInputChange = (key: string, value: string) => {
        setIsChange(true)
        if (key === 'email') setChangeEmail(true)
        setEditPersonalInfos(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleClearSpan = (key: string) => {
        setSpanText(prevState => ({
            ...prevState,
            [key]: ''
        }));
        setValidColor(prevState => ({
            ...prevState,
            [key]: 'black'
        }));
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

                <TextField id="outlined-basic" label="Name" variant="outlined"
                    required value={editPersonalInfos.name} type="text"
                    sx={{
                        maxWidth: '100%', width: '30rem', mt: 2,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: validColor.name,
                            },
                        },
                    }} onChange={(e) => { handleInputChange('name', e.target.value) }}
                    onClick={() => handleClearSpan('name')}
                />
                <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                >{spanText.name}</span>
            </Box>
            <Box sx={{
                display: 'flex', flexDirection: 'column',
                maxWidth: '100%', width: '30rem', mt: 4,
            }}>
                <TextField id="outlined-basic" label="Email" variant="outlined"
                    required value={editPersonalInfos.email} type="email"
                    sx={{
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: validColor.email,
                            },
                        },
                    }} onChange={(e) => { handleInputChange('email', e.target.value) }}
                    onClick={() => handleClearSpan('email')}
                />
                <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                >{spanText.email}</span>
            </Box>
            <Box sx={{
                display: 'flex', flexDirection: 'column',
                maxWidth: '100%', width: '30rem', mt: 2,
            }}>

                <TextField id="outlined-basic" label="Phone Number" variant="outlined"
                    required value={editPersonalInfos.phone} type="number"
                    sx={{
                        maxWidth: '100%', width: '30rem', mt: 2,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: validColor.phone,
                            },
                        },
                    }} onChange={(e) => { handleInputChange('phone', e.target.value) }}
                    onClick={() => handleClearSpan('phone')}
                />
                <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                >{spanText.phone}</span>
            </Box>
            <TextField
                id="experience"
                select
                label="Gender"
                value={editPersonalInfos.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                sx={{
                    maxWidth: '100%', width: '30rem', mt: 3,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'black',
                        },
                    },
                }}
            >
                {genderOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}

            </TextField>

            <TextField
                id="experience"
                select
                label="Role"
                value={editPersonalInfos.role}
                sx={{
                    maxWidth: '100%', width: '30rem', mt: 3,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'black',
                        },
                    },
                }}
            >
                {therapistRoleContents.map((option) => (
                    <MenuItem key={option.role} value={option.role}
                        onClick={() => {
                            handleInputChange('role', option.role)
                        }}>
                        {option.role}
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
                    }} onClick={() => { setEditPersonalInfo(false) }}
                >Cancel</Button>
            </Box>
        </Box>
    )
}

export default EditTherapistPersonalInfoComponent