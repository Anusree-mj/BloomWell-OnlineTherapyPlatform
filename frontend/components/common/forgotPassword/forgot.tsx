'use client'

import React, { useState } from 'react';
import Box from '@mui/joy/Box'; 
import Typography from '@mui/joy/Typography'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function AdminLogin() {
    return (
        <Box sx={{
            backgroundColor: '#325343', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', height: '80vh',
        }}>
            <Typography sx={{
                fontSize: { xs: '1rem', sm: '1rem' },
                color: 'white', mb: 2, fontWeight: 600,
                maxWidth: '60%', width: '40rem'
            }
            }>Forgot your password? No worries! Just enter the email address associated with your account,
                and we'll send you a link to reset your password.</Typography>
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
                <Button variant="contained"
                    sx={{
                        mt: 3, backgroundColor: '#325343', borderRadius: '2rem',
                        maxWidth: '90%', width: '30rem', '&:hover': {
                            backgroundColor: '#1C955A',
                        }
                    }}
                >Send reset password email</Button>
                <Link href="/login" passHref>
                    <Typography component="a"  sx={{
                        color: '#325343', mt: 2,
                        fontWeight: 600, textDecorationColor: '#325343'
                    }}>
                        Back to Login
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
}
