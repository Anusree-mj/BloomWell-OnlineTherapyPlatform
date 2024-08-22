import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios'
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getClientSignUpAction, clientStateType } from "@/store/clients/clientReducer";
import OTPInput from '@/components/common/otp';
import Image from 'next/image';
import SocialLoginComponent from '@/components/common/socialLogin';
import { apiCall } from '@/services/api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ClientSignupComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        confrmPassword: ''
    })
    const [borderChange, setBorderChange] = useState({
        name: 'black',
        email: 'black',
        password: 'black',
        confrmPassword: 'black'
    })
    const [spanText, setSpanText] = useState({
        name: '',
        email: '',
        password: '',
        confrmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [otpField, setOtpField] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confrnPasswordVisible, setconfrnPasswordVisible] = useState(false)
    const [otp, setOtp] = useState('');
    const [disableButton, setDisableButton] = useState(false)
    const isLoading = useSelector((state: { client: clientStateType }) => state.client.isLoading);
    const error = useSelector((state: { client: clientStateType }) => state.client.error);


    useEffect(() => {
        if (localStorage.getItem('clientData')) {
            router.push('/client/myActivity/ongoing')
        }
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const handleGetOtp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const valid = validation()
            if (valid) {
                setLoading(true)
                const response = await apiCall({
                    method: 'POST',
                    endpoint: `users/getOtp`,
                    body: { email: signupInfo.email }
                });
                if (response.status === 'ok') {
                    setOtpField(true)
                }
            } else {
                return
            }
        } catch (err: unknown) {
            setLoading(false)
            if (axios.isAxiosError(err) && err.response?.status === 400) {
                toast.error(err.response.data.message || 'User already exists');
            } else {
                toast.error('An unexpected error occurred');
            }
            console.error(err, 'error');
        }
    }

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            if (!otp) {
                toast.error('Please enter the otp')
                return;
            }
            const { name, email, password } = signupInfo
            await dispatch(getClientSignUpAction({ otp, name, email, password, handleSignupSuccess }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleSignupSuccess = () => {
        router.push('/client/details')
    }

    const handleBorderChange = (key: string) => {
        setBorderChange(prevState => ({
            ...prevState,
            [key]: 'red'
        }))
    }
    const handleSpanChange = (key: string, message: string) => {
        setSpanText(prevState => ({
            ...prevState,
            [key]: message
        }))
    }
    const validation = () => {
        let isValid = true
        let message = '';
        if (!signupInfo.name || signupInfo.name.trim() === '') {
            isValid = false
            message = 'Please provide a valid name'
            handleBorderChange('name'); handleSpanChange('name', message)
        }
        if (!signupInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupInfo.email)) {
            isValid = false
            message = 'Please provide a valid email.'
            handleBorderChange('email'); handleSpanChange('email', message)
        }
        if (!signupInfo.password || signupInfo.password.trim() === ''
            || signupInfo.password.length < 8) {
            isValid = false
            let message = !signupInfo.password && signupInfo.password.trim() === ''
                ? 'Please provide a password of at least 8 characters'
                : 'Password must be at least 8 characters long';
            handleBorderChange('password'); handleSpanChange('password', message)
        }
        if (!signupInfo.confrmPassword || signupInfo.password !== signupInfo.confrmPassword) {
            isValid = false
            let message = !signupInfo.confrmPassword
                ? 'Please confirm your password'
                : 'Password doesn\'t match';
            handleBorderChange('confrmPassword'); handleSpanChange('confrmPassword', message)
        }
        return isValid;
    }
    const handleClearSpan = (key: string) => {
        setSpanText(prevState => ({
            ...prevState,
            [key]: ''
        }));
        setBorderChange(prevState => ({
            ...prevState,
            [key]: 'black'
        }));
    };

    const handleInputChange = (key: string, value: string) => {
        setSignupInfo(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    return (
        <Box sx={{
            backgroundColor: '#325343', display: 'flex',
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            paddingBottom: '4rem'
        }}>
            {otpField !== true ? (
                <>
                    <Typography sx={{
                        fontSize: '1.2rem', mt: 1,
                        textAlign: 'center', color: 'white', fontWeight: 800
                    }}>
                        Welcome To BloomWell
                    </Typography>
                    <Typography sx={{
                        fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: 'white',
                        width: '30rem', maxWidth: '80%', mb: 2
                    }
                    }>Fill in the registration form with your details.</Typography>
                    <FormControl sx={{
                        width: '30rem', backgroundColor: 'white', mt: 1,
                        padding: 4, maxWidth: '90%', minHeight: '50vh',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                        borderRadius: '0.6rem',
                    }}>
                        <Box sx={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center'
                        }}>

                            <TextField id="outlined-basic" label="Name" variant="outlined"
                                required
                                sx={{
                                    maxWidth: '100%', width: '30rem', backgroundColor: '#F7FCC2',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: borderChange.name,
                                        },
                                    },
                                }} onChange={(e) => { handleInputChange('name', e.target.value) }}
                                onClick={() => handleClearSpan('name')}
                            />
                            <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                            >{spanText.name}</span>
                            <TextField id="outlined-basic" label="Email" variant="outlined"
                                required
                                sx={{
                                    maxWidth: '100%', width: '30rem', backgroundColor: '#F7FCC2', mt: 2,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: borderChange.email,
                                        },
                                    },
                                }} onChange={(e) => { handleInputChange('email', e.target.value) }}
                                onClick={(e) => handleClearSpan('email')}
                            />
                            <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                            >{spanText.email}</span>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type={passwordVisible ? "text" : "password"}
                                required
                                sx={{
                                    maxWidth: '100%', width: '30rem', backgroundColor: '#F7FCC2',
                                    mt: 2,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: borderChange.password,
                                        },
                                    },
                                }} onChange={(e) => { handleInputChange('password', e.target.value) }}
                                onClick={(e) => handleClearSpan('password')}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setPasswordVisible((prevState) => !prevState)}
                                            sx={{ position: 'absolute', right: '1rem', zIndex: 1 }}
                                        >
                                            {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    )
                                }}
                            />
                            <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                            >{spanText.password}</span>
                            <TextField
                                id="outlined-password-input"
                                label="Confirm Password"
                                type={confrnPasswordVisible ? 'text' : "password"}
                                required
                                sx={{
                                    maxWidth: '100%', width: '30rem', backgroundColor: '#F7FCC2',
                                    mt: 2,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: borderChange.confrmPassword,
                                        },
                                    },
                                }} onChange={(e) => { handleInputChange('confrmPassword', e.target.value) }}
                                onClick={(e) => handleClearSpan('confrmPassword')}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setconfrnPasswordVisible((prevState) => !prevState)}
                                            sx={{ position: 'absolute', right: '1rem', zIndex: 1 }}
                                        >
                                            {confrnPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    )
                                }}
                            />
                            <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                            >{spanText.confrmPassword}</span>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <LoadingButton
                                onClick={handleGetOtp}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                sx={{
                                    mt: 3, borderRadius: '2rem',
                                    maxWidth: '100%', width: '30rem', color: '#325343',
                                    backgroundColor: '#a6de9b',
                                    '&:hover': {
                                        backgroundColor: '#325343',
                                        color: 'white'
                                    }
                                }}
                            >
                                Continue
                            </LoadingButton>
                            <SocialLoginComponent />
                            <Typography sx={{
                            color: '#007bff', mt: 1, textDecoration: 'underline', fontSize: '0.9rem',
                            cursor: 'pointer',
                            textDecorationColor: '#007bff'
                        }} onClick={() => router.push('/login')} >
                           Already Signed in? Sign In
                        </Typography>
                        </Box>
                    </FormControl>
                </>
            ) : (
                <>
                    <Typography sx={{
                        fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: '#325343',
                        width: '30rem', maxWidth: '80%', mb: 2
                    }}>Now, Signin with your credentials.</Typography>
                    <FormControl sx={{
                        width: '30rem', backgroundColor: 'white',
                        padding: 2, maxWidth: '95%', minHeight: '50vh',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.6rem',
                    }}>
                        <OTPInput email={signupInfo.email} otp={otp} setOtp={setOtp} disableButton={disableButton}
                            setDisableButton={setDisableButton} />
                        {!disableButton && (
                            <LoadingButton
                                onClick={handleSignup}
                                loading={isLoading}
                                loadingPosition="end"
                                variant="contained"
                                sx={{
                                    mt: 3, borderRadius: '2rem',
                                    maxWidth: '90%', width: '30rem', color: '#325343',
                                    backgroundColor: '#a6de9b',
                                    '&:hover': {
                                        backgroundColor: '#325343',
                                        color: 'white'
                                    }
                                }}
                            >
                                Continue
                            </LoadingButton>
                        )}
                    </FormControl>
                </>
            )}

        </Box>
    )
}
export default ClientSignupComponent;