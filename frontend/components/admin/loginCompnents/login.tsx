'use client'

import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function AdminLogin() {
    return (
        <Box sx={{
            paddingTop: '2rem', paddingBottom: '2rem',
            backgroundColor: '#325343', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', height: '80vh'
        }}>
            <Typography sx={{
                fontSize: { xs: '1.2rem', sm: '2rem' },
                color: 'white', mb: 1, fontWeight: 600,
            }
            }>Admin Login</Typography>
            <Box sx={{
                display: 'flex', flexDirection: 'column', maxWidth: '90%',
                width: '30rem', pt: 6, pb: 6, borderRadius: '1rem',
                alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'
            }}>
                <TextField id="outlined-basic" label="Email" variant="outlined" sx={
                    {
                        maxWidth: '90%', width: '30rem', backgroundColor: '#F7FCC2',


                    }
                } />
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
                    }
                />
                <Button variant="contained"
                    sx={{
                        mt: 3, backgroundColor: '#325343', borderRadius: '2rem',
                        maxWidth: '90%', width: '30rem', '&:hover': {
                            backgroundColor: '#1C955A',
                        }
                    }}
                >Login</Button>
                <Link href="/forgotPassword" underline="always"
                    sx={{
                        color: '#325343', mt: 2,
                        fontWeight: 600, textDecorationColor: '#325343'
                    }}>
                    {'Forgot Password?'}
                </Link>
            </Box>
        </Box>
    );
}
