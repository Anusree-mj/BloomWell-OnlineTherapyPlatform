import { useEffect, useState } from 'react'
import { Button, Divider, Typography, FormGroup } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation";
import { apiCall } from '@/services/api'
import { adminAuth } from '@/utilities/auth'

interface ReasonComponentProps {
    reasonId: string,
    reasonItems: string[],
    postUrl: string,
    successUrl: string
}
const AddRejectingReasonComponent: React.FC<ReasonComponentProps> = ({ reasonId, reasonItems, postUrl, successUrl }) => {
    const router = useRouter();

    useEffect(() => {
        const { status } = adminAuth()
        if (status !== 'ok') {
            router.push('/admin/login');
        }
    }, [])

    const submitReason = async (item: string) => {
        try {
            const response = await apiCall({
                method: 'DELETE',
                endpoint: `${postUrl}`,
                body: { reason: item, reasonId }
            });
            if (response.status === 'ok') {
                toast.success('Reason successfully updated');
                router.push(`/${successUrl}`)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#325343', minHeight: '100vh'
        }}>
            <Box sx={{
                backgroundColor: 'white', display: 'flex', mt: '2rem', width: '30rem',
                flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 1.1)',
            }}>
                <Typography sx={{
                    fontWeight: 800, fontSize: '1.1rem', color: '#325343',
                    mb: 1
                }}>Add a reason for rejecting therapist</Typography>
                <Divider sx={{ mb: 2 }} />
                <FormGroup>
                    {reasonItems.map((item, index) => (
                        <Button variant="outlined" key={index}
                            sx={{
                                color: '#325343', mb: 2,
                                borderColor: '#325343',
                                '&:hover': {
                                    backgroundColor: '#49873D',
                                    color: 'white', borderColor: '#325343'
                                }
                            }} onClick={() => { submitReason(item) }}
                        >{item}</Button>
                    ))}
                </FormGroup>
            </Box>
        </Box>
    )
}

export default AddRejectingReasonComponent