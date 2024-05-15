'use client'

import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import { FormControl } from '@mui/material';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import OTPInput from '../otp/otp';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [emailSpan, setEmailSpan] = useState('black')
    const [emailTextSpan, setEmailTextSpan] = useState('')
    const [loading, setLoading] = useState(false)
    const [otpField, setOtpField] = useState(false)
    const [otp, setOtp] = useState('');
    const [disableButton, setDisableButton] = useState(false)

    const handleGetOtp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const valid = validation()
            if (valid) {
                // setLoading(true)
                const response = await axios.post(`http://localhost:8000/users/forgotPassword/getOtp`, { email: email });
                if (response.status === 200) {
                    setOtpField(true)
                    setLoading(false)
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

    const validation = () => {
        let isValid = true;
        if (!email) {
            setEmailSpan('red')
            setEmailTextSpan('Please provide a valid email.')
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailTextSpan('Please provide a valid email.')
            isValid = false
        }
        return isValid
    }

    const clearSpan = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setEmailTextSpan('');
        setEmailSpan('');
    }

    const verifyOTP = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            if (!otp) {
                toast.error('Please enter OTP')
            }
            else {
                // setLoading(true)
                const response = await axios.post(`http://localhost:8000/users/forgotPassword/verifyOtp`, { email: email, otp: otp });
                if (response.status === 200) {
                    setOtpField(true)
                    setLoading(false)
                }
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
                        Forgot your password?
                    </Typography>
                    <Typography sx={{
                        fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: '#325343',
                        width: '30rem', maxWidth: '80%', mb: 2
                    }
                    }>No worries! Just enter the email address associated with your account,
                        and we'll send you a link to reset your password</Typography>
                    <FormControl sx={{
                        width: '30rem', backgroundColor: 'white', mt: 1,
                        padding: 4, maxWidth: '90%', minHeight: '50vh',
                        display: 'flex', alignItems: 'center',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.6rem',
                    }}>
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
                            onClick={(e) => clearSpan(e)}
                        />
                        <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '0.4rem' }}
                        >{emailTextSpan}</span>
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
                            Send Reset Password Email
                        </LoadingButton>
                        <Link href="/login" passHref>
                            <Typography component="a" sx={{
                                color: '#325343', mt: 2,
                                fontWeight: 600, textDecorationColor: '#325343',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}>
                                Back to Login
                            </Typography>
                        </Link>
                    </FormControl>
                </>
            ) : (
                <>
                    <Typography sx={{
                        fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', color: '#325343',
                        width: '30rem', maxWidth: '80%', mb: 2
                    }}>Now,Enter the OTP.</Typography>
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
                                onClick={verifyOTP}
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
                                Verify
                            </LoadingButton>
                        )}
                    </FormControl>
                </>
            )}
        </Box>
    );
}
