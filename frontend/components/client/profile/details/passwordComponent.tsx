import { useState } from 'react';
import { Divider, Typography, Button, TextField, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { getClientDetailsAction } from "@/store/clients/clientReducer";
import { useDispatch, } from "react-redux";
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { apiCall } from '@/services/api';


const PasswordComponent = (props: { role: string }) => {
    const dispatch = useDispatch()
    const [currentPassWordVisibility, setCurrentPassWordVisibility] = useState({
        isVisible: false,
        isText: false
    })
    const [newPassWordVisibility, setNewPassWordVisibility] = useState({
        isVisible: false,
        isText: false
    })
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [changPasswordInfo, setChangePasswordInfo] = useState({
        currentPassword: '',
        newPassword: ''
    })
    const [validColor, setValidColor] = useState({
        currentPassword: '',
        newPassword: '',
    })
    const [spanText, setSpanText] = useState({
        currentPassword: '',
        newPassword: ''
    })

    const handleInputChange = (key: string, value: string) => {
        setChangePasswordInfo(prevState => ({
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

    const checkValidity = () => {
        let isValid = true;
        if (changPasswordInfo.currentPassword.trim() === ''
            || changPasswordInfo.currentPassword.length < 8) {
            isValid = false;
            handleBorderChange('currentPassword')
            setSpanText(prevState => ({
                ...prevState,
                currentPassword: '* Password should be atleast 8 characters'
            }))
        }
        if (changPasswordInfo.newPassword.trim() === ''
            || changPasswordInfo.newPassword.length < 8) {
            isValid = false;
            handleBorderChange('newPassword')
            setSpanText(prevState => ({
                ...prevState,
                newPassword: '* Password should be atleast 8 characters'
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

    const handleEdit = async () => {
        try {
            const valid = checkValidity();
            if (!valid) {
                return;
            } else {
                const response = await apiCall({
                    method: 'PUT',
                    endpoint: `${props.role}/profile/changePassword`,
                    body: { changPasswordInfo: changPasswordInfo }
                });
                if (response.status === 'ok') {
                    setChangePasswordInfo({
                        currentPassword: '',
                        newPassword: ''
                    })
                    setIsChangePassword(false)
                    dispatch(getClientDetailsAction())
                    toast.success('Successfully changed password!')
                } else {
                    toast.success(`Password doesnt match`)

                }
            }
        } catch (err) {
            console.log('Error found:', err)
            toast.error('Incorrect password')
        }
    }

    const handleCurrentPasswordVisibility = () => {
        setCurrentPassWordVisibility((prevState) => ({
            ...prevState,
            isVisible: !prevState.isVisible,
            isText: !prevState.isText
        }))
    }
    const handleNewPasswordVisibility = () => {
        setNewPassWordVisibility((prevState) => ({
            ...prevState,
            isVisible: !prevState.isVisible,
            isText: !prevState.isText
        }))
    }

    return (
        <Box sx={{
            backgroundColor: 'white', display: 'flex', mt: '2rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 1.3)',
        }}>
            <Typography sx={{
                fontWeight: 800, mb: 1, fontSize: '1rem', cursor: 'pointer',
                textDecoration: 'underline', color: '#325343',
            }} onClick={() => { setIsChangePassword(true) }}
            >Change Password</Typography>
            <Divider sx={{ mb: 2 }} />

            {isChangePassword && (
                <Box sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', width: '80rem', maxWidth: '100%',
                }}>
                    <Box sx={{
                        maxWidth: '100%', width: '70rem', gap: 2,
                        display: 'flex', flexWrap: 'wrap', alignItems: 'cneter',
                        justifyContent: 'center',
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                            <TextField id="outlined-basic" label="Current Password" variant="outlined"
                                required value={changPasswordInfo.currentPassword}
                                type={currentPassWordVisibility.isText ? 'text' : 'password'}
                                sx={{
                                    maxWidth: '100%', width: '30rem', mt: 2,
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: validColor.currentPassword,
                                        },
                                    },
                                }} onChange={(e) => { handleInputChange('currentPassword', e.target.value) }}
                                onClick={() => handleClearSpan('currentPassword')}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={handleCurrentPasswordVisibility}
                                            sx={{ position: 'absolute', right: '1rem', zIndex: 1 }}
                                        >
                                            {currentPassWordVisibility.isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    )
                                }}
                            />
                            <span style={{
                                color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem',
                                marginTop: '0.5rem'
                            }}>{spanText.currentPassword}</span>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField id="outlined-basic" label="New Password" variant="outlined"
                                required value={changPasswordInfo.newPassword}
                                type={newPassWordVisibility.isText ? 'text' : 'password'}
                                sx={{
                                    maxWidth: '100%', width: '30rem', mt: 2,
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: validColor.newPassword,
                                        },
                                    },
                                }} onChange={(e) => { handleInputChange('newPassword', e.target.value) }}
                                onClick={() => handleClearSpan('newPassword')}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={handleNewPasswordVisibility}
                                            sx={{ position: 'absolute', right: '1rem', zIndex: 1 }}
                                        >
                                            {newPassWordVisibility.isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    )
                                }}
                            />
                            <span style={{
                                color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem',
                                marginTop: '0.5rem'
                            }}
                            >{spanText.newPassword}</span>

                        </Box>
                    </Box>
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
                            }} onClick={() => { setIsChangePassword(false) }}
                        >Cancel</Button>
                    </Box>
                </Box>
            )}
        </Box >
    );
}

export default PasswordComponent;
