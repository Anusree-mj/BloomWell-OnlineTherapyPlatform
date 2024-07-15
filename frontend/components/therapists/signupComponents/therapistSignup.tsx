'use client'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios'
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getTherapistSignUpAction, therapistStateType } from '@/store/therapists/therapistReducers';
import OTPInput from '@/components/common/otp';
import UploadIcon from '@mui/icons-material/Upload';
import { apiCall } from '@/services/api';

const TherapistSignupComponent: React.FC<{ roleType: string; }> = ({ roleType }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        phone: 0,
        image: '',
        licenseNum: '',
        password: '',
        confrmPassword: '',
    })
    const [borderChange, setBorderChange] = useState({
        name: 'black',
        email: 'black',
        phone: 'black',
        licenseNum: 'black',
        password: 'black',
        confrmPassword: 'black',
        file: 'black'
    })
    const [spanText, setSpanText] = useState({
        name: '',
        email: '',
        phone: '',
        licenseNum: '',
        password: '',
        confrmPassword: '',
        file: ''
    })

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null);
    const [otpField, setOtpField] = useState(false)
    const [otp, setOtp] = useState('');
    const [disableButton, setDisableButton] = useState(false)
    const isLoading = useSelector((state: { therapist: therapistStateType }) => state.therapist.isLoading);
    const error = useSelector((state: { therapist: therapistStateType }) => state.therapist.error);

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
    const uploadLicense = async () => {
        try {
            handleClearSpan('file');
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/therapist/license`,
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                handleInputChange('image', response.data.imageUrl)
                toast.success('License Successfully Uploaded')
            } else {
                toast.error('No file selected');
            }
        } catch (error) {
            console.log(error);
        }
    };

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
            const { name, email, password, phone, licenseNum, image } = signupInfo
            await dispatch(getTherapistSignUpAction({
                otp, name, email, password, phone, licenseNum, roleType, image,
                handleTherapistSignupSuccess
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleTherapistSignupSuccess = () => {
        router.push('/therapist/welcome')
    }

    const validation = () => {
        let isValid = true
        let message = '';
        if (!signupInfo.name || signupInfo.name.trim() === '') {
            isValid = false;
            message = 'Please provide a valid name'
            handleBorderChange('name'); handleSpanChange('name', message)
        }
        if (!signupInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupInfo.email)) {
            isValid = false;
            message = 'Please provide a valid email.'
            handleBorderChange('email'); handleSpanChange('email', message)
        }
        if (!signupInfo.phone || !/^\d{10}$/.test(signupInfo.phone.toString())) {
            isValid = false;
            message = 'Please provide a valid phone number'
            handleBorderChange('phone'); handleSpanChange('phone', message)
        }
        if (!signupInfo.licenseNum || signupInfo.licenseNum.trim() === '' || !/^[A-Za-z]{3}\/\d+$/.test(signupInfo.licenseNum)) {
            isValid = false;
            message = !signupInfo.licenseNum && signupInfo.licenseNum.trim() === ''
                ? 'Please provide a valid license number'
                : 'License number format is invalid. Format should be ABC/12345'
            handleBorderChange('licenseNum'); handleSpanChange('licenseNum', message)
        }
        if (!signupInfo.password || signupInfo.password.trim() === '' || signupInfo.password.length < 8) {
            isValid = false;
            message = 'Password atleast of 8 characters'
            handleBorderChange('password'); handleSpanChange('password', message)
        }
        if (!signupInfo.confrmPassword || signupInfo.password !== signupInfo.confrmPassword) {
            isValid = false;
            message = !signupInfo.confrmPassword
                ? 'Please confirm your password'
                : 'Password doesn\'t match';

            handleBorderChange('confrmPassword'); handleSpanChange('confrmPassword', message)
        }
        if (!signupInfo.image) {
            isValid = false;
            message = 'Please upload your license proof'
            handleBorderChange('file'); handleSpanChange('file', message)
        }
        return isValid;
    }

    useEffect(() => {
        if (localStorage.getItem('therapistData')) {
            router.push('/therapist/welcome')
        }
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const textFieldItems = [
        { type: 'text', label: 'Name', borderColor: borderChange.name, key: 'name', spanText: spanText.name },
        { type: 'email', label: 'Email', borderColor: borderChange.email, key: 'email', spanText: spanText.email },
        { type: 'number', label: 'Phone', borderColor: borderChange.phone, key: 'phone', spanText: spanText.phone },
        { type: 'text', label: 'License Number', borderColor: borderChange.licenseNum, key: 'licenseNum', spanText: spanText.licenseNum },
        { type: 'password', label: 'Password', borderColor: borderChange.password, key: 'password', spanText: spanText.password },
        { type: 'password', label: 'Confirm Password', borderColor: borderChange.confrmPassword, key: 'confrmPassword', spanText: spanText.confrmPassword },
    ];

    return (
        <Box sx={{
            backgroundColor: '#325343', display: 'flex',
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            minHeight: '85vh', paddingBottom: '2rem'
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
                    }>Create your therapist account by filling this form so we can start processing
                        your application.</Typography>
                    <FormControl sx={{
                        width: '35rem', backgroundColor: 'white', mt: 1, display: 'flex',
                        gap: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: 4, maxWidth: '90%', minHeight: '60vh',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
                        borderRadius: '0.6rem',
                    }}>
                        <Box sx={{
                            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                            justifyContent: 'flex-start', width: '40rem',
                            maxWidth: '100%',
                        }}>
                            {textFieldItems.map((item) => (
                                <Box sx={{
                                    display: 'flex', flexDirection: 'column', m: 1,
                                    maxWidth: '100%',
                                }}>
                                    <TextField id="outlined-basic"
                                        label={item.label} type={item.type} variant="outlined"
                                        required
                                        sx={{
                                            maxWidth: '100%',
                                            backgroundColor: '#F7FCC2',
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: item.borderColor
                                                },
                                            },
                                        }} onChange={(e) => { handleInputChange(item.key, e.target.value) }}
                                        onClick={() => handleClearSpan(item.key)}
                                    />
                                    <span style={{
                                        color: 'red', fontSize: '0.8rem',
                                        marginBottom: '0.6rem', marginLeft: '0.4rem'
                                    }}>{item.spanText}</span>
                                </Box>
                            ))}
                            <Box sx={{
                                ml: 1, maxWidth: '90%',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'flex-start', justifyContent: 'flex-start'
                            }}>
                                <TextField
                                    type="file"
                                    sx={{
                                        mt: 1, mb: 2,
                                        backgroundColor: '#F7FCC2',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: borderChange.file
                                            },
                                        },
                                    }}
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
                                        accept: "image/*"
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={uploadLicense}>
                                                    <UploadIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),

                                    }}
                                    variant="outlined"
                                    label='Add Your License Image'
                                />
                                <span style={{
                                    color: 'red', fontSize: '0.8rem', marginTop: '-.9rem', marginLeft: '0.5rem',
                                    textAlign: 'left'
                                }}>
                                    {spanText.file}</span>

                            </Box>
                        </Box>
                        <LoadingButton
                            onClick={handleGetOtp}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            sx={{
                                mt: 1, borderRadius: '2rem',
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
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 1.1)',
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
export default TherapistSignupComponent;