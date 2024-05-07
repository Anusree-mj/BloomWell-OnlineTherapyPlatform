'use client'

import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function Login() {
    return (
        <Box sx={{
            paddingTop: '2rem', paddingBottom: '2rem',
            backgroundColor: '#325343', display: 'flex',
            alignItems: 'center', justifyContent: 'space-around', height: '70vh'
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
                        maxWidth: '90%', width: '30rem'
                    }}
                >Login</Button>
                <Link href="#" underline="always"
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
