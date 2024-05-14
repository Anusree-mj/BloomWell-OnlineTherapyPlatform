import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios'
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getSignUpAction, clientStateType } from "@/store/clients/clientReducer";
import OTPInput from '@/components/common/otp/otp';

const ClientSignupComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confrmPassword, setConfrmPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [nameSpan, setNameSpan] = useState('black')
    const [nameTextSpan, setNameTextSpan] = useState('')
    const [emailSpan, setEmailSpan] = useState('black')
    const [emailTextSpan, setEmailTextSpan] = useState('')
    const [passwordSpan, setPasswordSpan] = useState('black')
    const [passwordTextSpan, setPasswordTextSpan] = useState('')
    const [confrmPasswordSpan, setConfrmPasswordSpan] = useState('black')
    const [confrmPasswordTextSpan, setConfrmPasswordTextSpan] = useState('')
    const [otpField, setOtpField] = useState(false)
    const [otp, setOtp] = useState('');
    const [disableButton, setDisableButton] = useState(false)
    const dispatch = useDispatch();
    const isLoading = useSelector((state: { client: clientStateType }) => state.client.isLoading);
    const error = useSelector((state: { client: clientStateType }) => state.client.error);
    const router = useRouter();

    const handleGetOtp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const valid = validation()
            if (valid) {
                setLoading(true)
                const response = await axios.post(`http://localhost:8000/client/getOtp`, { email: email });
                if (response.status === 200) {
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
            await dispatch(getSignUpAction({ otp, name, email, password, handleSignupSuccess }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleSignupSuccess = () => {
        router.push('/client/welcome')
    }

    const validation = () => {
        let isValid = true
        if (!name) {
            setNameSpan('red')
            setNameTextSpan('Please provide a valid name')
            isValid = false
        } else if (name.trim() === '') {
            setNameTextSpan('Please provide a valid name')
            isValid = false
        } if (!email) {
            setEmailSpan('red')
            setEmailTextSpan('Please provide a valid email.')
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailTextSpan('Please provide a valid email.')
            isValid = false
        } if (!password) {
            setPasswordSpan('red')
            setPasswordTextSpan('Please provide a password of at least 8 characters')
            isValid = false
        } else if (password.trim() === '') {
            setPasswordTextSpan('Password must be at least 8 characters long')
            isValid = false
        } else if (password.length < 8) {
            setPasswordTextSpan('Password must be at least 8 characters long')
            isValid = false
        } if (!confrmPassword) {
            setConfrmPasswordSpan('red')
            setConfrmPasswordTextSpan(`Please confirm your password`)
            isValid = false
        } else if (password !== confrmPassword) {
            setConfrmPasswordTextSpan(`Password doesn't match`)
            isValid = false
        }
        return isValid
    }

    const clearSpan = (e: { preventDefault: () => void; }, fieldName: string) => {
        e.preventDefault();
        switch (fieldName) {
            case 'name':
                setNameTextSpan('');
                setNameSpan('');
                break;
            case 'email':
                setEmailTextSpan('');
                setEmailSpan('');
                break;
            case 'password':
                setPasswordSpan('')
                setPasswordTextSpan('')
                break;
            case 'confrmPassword':
                setConfrmPasswordSpan('')
                setConfrmPasswordTextSpan('')
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (localStorage.getItem('clientData')) {
            router.push('/client/welcome')
        }
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    return (
        <Box sx={{
            backgroundColor: '#F7FCC2', display: 'flex',
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            height: '85vh', paddingBottom: '2rem'
        }}>
            {otpField !== true ? (
                <>
                    <Typography sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' }, mt: 1,
                        textAlign: 'center', color: '#325343',
                    }}>
                        Welcome To BloomWell
                    </Typography>
                    <Typography sx={{
                        fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: '#325343',
                        width: '30rem', maxWidth: '80%', mb: 2
                    }
                    }>Fill in the registration form with your details.</Typography>
                    <FormControl sx={{
                        width: '30rem', backgroundColor: 'white', mt: 1,
                        padding: 4, maxWidth: '90%', minHeight: '50vh',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.6rem',
                    }}>
                        <TextField id="outlined-basic" label="Name" variant="outlined"
                            required
                            sx={{
                                maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: nameSpan,
                                    },
                                },
                            }} onChange={(e) => { setName(e.target.value) }}
                            onClick={(e) => clearSpan(e, 'name')}
                        />
                        <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                        >{nameTextSpan}</span>
                        <TextField id="outlined-basic" label="Email" variant="outlined"
                            required
                            sx={{
                                maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2', mt: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: emailSpan,
                                    },
                                },
                            }} onChange={(e) => { setEmail(e.target.value) }}
                            onClick={(e) => clearSpan(e, 'email')}
                        />
                        <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                        >{emailTextSpan}</span>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            required
                            sx={{
                                maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                                mt: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: passwordSpan,
                                    },
                                },
                            }} onChange={(e) => { setPassword(e.target.value) }}
                            onClick={(e) => clearSpan(e, 'password')}
                        />
                        <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                        >{passwordTextSpan}</span>
                        <TextField
                            id="outlined-password-input"
                            label="Confirm Password"
                            type="password"
                            required
                            sx={{
                                maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                                mt: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: confrmPasswordSpan,
                                    },
                                },
                            }} onChange={(e) => { setConfrmPassword(e.target.value) }}
                            onClick={(e) => clearSpan(e, 'confrmPassword')}
                        />
                        <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                        >{confrmPasswordTextSpan}</span>
                        <LoadingButton
                            onClick={handleGetOtp}
                            loading={loading}
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
                        padding: 4, maxWidth: '90%', minHeight: '50vh',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.6rem',
                    }}>
                        <OTPInput email={email} otp={otp} setOtp={setOtp} disableButton={disableButton}
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