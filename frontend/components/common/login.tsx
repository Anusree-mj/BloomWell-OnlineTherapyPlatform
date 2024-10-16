'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { getLoginAction, userStateType } from '@/store/user/userReducer';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import SocialLoginComponent from './socialLogin';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLoading = useSelector((state: { user: userStateType }) => state.user.isLoading);
    const error = useSelector((state: { user: userStateType }) => state.user.error);
    const router = useRouter()

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!email && !password) {
            toast.error('Please provide valid email and password');
            return;
        } else if (!email) {
            toast.error('Please provide valid email');
        } else if (!password) {
            toast.error('Please provide valid password');
        }
        try {
            await dispatch(getLoginAction({ email, password, handleLoginSuccess }));
        } catch (error) {
            console.error('Login error:', error);
        }
    }
    const handleLoginSuccess = (role: string) => {
        if (role === 'client') {
            const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');
            const { questionnaire, isAnUser } = clientData;
            if (Array.isArray(questionnaire) && questionnaire.length === 0) {
                router.push('/client/details');
            } else if (!isAnUser) {
                router.push('/client/payment');
            } else {
                router.push('/client/myActivity/ongoing')
            }
        } else {
            const therapistData = JSON.parse(localStorage.getItem('therapistData') || '{}');
            const { image } = therapistData;
            if (image) {
                router.push('/therapist/activities/active')
            } else {
                router.push('/therapist/welcome');
            }
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])
    const [loginMenu, setLoginMenu] = useState("choose")
    return (
        <Box sx={{
            paddingTop: '2rem', paddingBottom: '4rem',
            backgroundColor: '#325343', display: 'flex',
            alignItems: 'center', justifyContent: 'space-around', minHeight: '85vh'
        }}>
            <Box sx={{
                display: { xs: 'none', sm: 'flex' }, flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', maxWidth: '40%', width: '30rem',
            }}>
                <Typography sx={{
                    fontSize: { xs: '1rem', sm: '1rem' },
                    textAlign: 'center', color: 'white',
                }
                }>“ Keep your face always toward the
                    sunshine—and shadows will fall
                    behind you. ”  -Walt Whitman</Typography>
                <Box sx={{
                    flexGrow: 1, display: { xs: 'flex', sm: 'flex' },
                    backgroundColor: '#325343'
                }}
                >
                    <Image
                        src='/home/login.png'
                        alt='Hooray!'
                        width={200}
                        height={100}
                        layout='fixed'
                    />
                </Box>
            </Box>
            {
                loginMenu === "choose" ?
                    <Box
                        sx={{
                            display: "flex", flexDirection: "column", width: "30rem", maxWidth: '90%', alignItems: "center",
                            justifyContent: 'center',
                        }}>
                        <Button
                            sx={{ width: "380px", border: "solid 1px white", color: 'white', marginBottom: "1rem", maxWidth: '100%' }}
                            onClick={() => setLoginMenu("client")}>Login as client</Button>
                        <Button
                            sx={{ width: "380px", border: "solid 1px white", color: 'white', maxWidth: '100%' }}
                            onClick={() => setLoginMenu("therapist")}>Login as Therapist</Button>

                    </Box> :
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', maxWidth: '90%',
                        width: '30rem', pt: 6, pb: 6, borderRadius: '1rem',
                        alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'
                    }}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" sx={
                            {
                                maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                            }
                        } onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            sx={
                                {
                                    maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                                    mt: 3
                                }
                            } onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <LoadingButton
                            onClick={handleLogin}
                            loading={isLoading}
                            loadingPosition="end"
                            variant="contained"
                            sx={{
                                mt: 3, backgroundColor: '#325343', borderRadius: '2rem',
                                maxWidth: '90%', width: '30rem',
                                '&:hover': {
                                    backgroundColor: '#325343',
                                    color: 'white'
                                }
                            }}
                        >
                            Login
                        </LoadingButton>
                        {loginMenu === "client" &&
                            <>
                                <SocialLoginComponent />

                            </>
                        }
                        <Typography sx={{
                            color: '#325343', mt: 2, textDecoration: 'underline',
                            fontWeight: 600, textDecorationColor: '#325343', fontSize: '0.9rem',
                            cursor: 'pointer',
                        }} onClick={() => router.push('/forgotPassword')} >
                            Forgot Password?
                        </Typography>
                        <Typography sx={{
                            color: '#007bff', mt: 1, textDecoration: 'underline', fontSize: '0.9rem',
                            cursor: 'pointer',
                            textDecorationColor: '#007bff'
                        }} onClick={() => router.push('/client/register')} >
                            New here? Sign Up
                        </Typography>
                    </Box>
            }
        </Box>
    );
}
