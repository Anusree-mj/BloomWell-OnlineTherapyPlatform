import { useState } from 'react'
import { useSelector } from "react-redux";
import { clientStateType } from "@/store/clients/clientReducer";
import { Box } from '@mui/system';
import { Button, MenuItem, TextField } from '@mui/material';
import { ageItems, teenAgeItems } from '../../submitDetails/ageComponent';
import { typeItems } from '../../submitDetails/therapyType';

interface PersonalInfo {
    name: string,
    email: string,
    age: string,
    sessionPreferred: string
}

interface EditPersonalInfoProps {
    setEditInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPersonalInfoComponent: React.FC<EditPersonalInfoProps> = ({ setEditInfo }) => {
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const [changeEmail, setChangeEmail] = useState(false);
    const [editPersonalInfo, setEditPersonalInfo] = useState<PersonalInfo>({
        name: clientDetails.name,
        email: clientDetails.email,
        age: clientDetails.age,
        sessionPreferred: clientDetails.sessionType
    })
    const [validColor, setValidColor] = useState<PersonalInfo>({
        name: 'black',
        email: 'black',
        age: 'black',
        sessionPreferred: 'black'
    })
    const [spanText, setSpanText] = useState<PersonalInfo>({
        name: '',
        email: '',
        age: '',
        sessionPreferred: ''
    })

    const handleInputChange = (key: string, value: string) => {
        if (key === 'email') setChangeEmail(true)
        setEditPersonalInfo(prevState => ({
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
                    required value={editPersonalInfo.name} type="text"
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
                    required value={editPersonalInfo.email} type="email"
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
            <TextField
                id="experience"
                select
                label="Age"
                value={editPersonalInfo.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                sx={{
                    maxWidth: '100%', width: '30rem', mt: 3,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: validColor.name,
                        },
                    },
                }}
            >
                {editPersonalInfo.sessionPreferred === 'Teen therapy' ? (
                    teenAgeItems.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))
                ) : (
                    ageItems.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))
                )}
            </TextField>

            <TextField
                id="experience"
                select
                label="Session Preferred"
                value={editPersonalInfo.sessionPreferred}
                sx={{
                    maxWidth: '100%', width: '30rem', mt: 3,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: validColor.name,
                        },
                    },
                }}
            >
                {typeItems.map((option) => (
                    <MenuItem key={option} value={option}
                        onClick={() => {
                            handleInputChange('sessionPreferred', option)
                        }}>
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
                    }}
                >Edit</Button>
                <Button variant="contained"
                    sx={{
                        mt: 2, backgroundColor: '#325343', width: '30rem', maxWidth: '90%',
                        '&:hover': {
                            backgroundColor: '#49873D',
                            color: 'white',
                        }
                    }} onClick={() => { setEditInfo(false) }}
                >Cancel</Button>
            </Box>
        </Box>
    )
}

export default EditPersonalInfoComponent