'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { getAdminLoginAction, adminStateType } from '@/store/admin/adminReducer';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLoading = useSelector((state: { admin: adminStateType }) => state.admin.isLoading);
    const error = useSelector((state: { admin: adminStateType }) => state.admin.error);
    const router = useRouter();

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
            await dispatch(getAdminLoginAction({ email, password, handleAdminLoginSuccess }));
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleAdminLoginSuccess = () => {
        router.push('/admin');
    };

    useEffect(() => {
        if (localStorage.getItem('adminData')) {
            router.push('/admin');
        }
    }, [router]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <Box sx={{
            paddingTop: '2rem', paddingBottom: '2rem',
            backgroundColor: '#325343', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', height: '80vh'
        }}>
            <Typography sx={{
                fontSize: { xs: '1.2rem', sm: '2rem' },
                color: 'white', mb: 1, fontWeight: 600,
            }}>
                Admin Login
            </Typography>
            <Box sx={{
                display: 'flex', flexDirection: 'column', maxWidth: '90%',
                width: '30rem', pt: 6, pb: 6, borderRadius: '1rem',
                alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'
            }}>
                <TextField id="outlined-basic" label="Email" variant="outlined" sx={{
                    maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                }} onChange={(e) => setEmail(e.target.value)} />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    sx={{
                        maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',
                        mt: 3
                    }}
                    onChange={(e) => setPassword(e.target.value)}
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
                <Link href="/forgotPassword" passHref>
                    <Typography component="a" sx={{
                        color: '#325343', mt: 2,
                        fontWeight: 600, textDecoration: 'none'
                    }}>
                        Forgot Password?
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
}
