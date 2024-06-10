import { useState } from 'react'
import { Button, Divider, Typography, FormGroup } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation";

const reasonItems = [
    'Invalid or Expired License', 'Insufficient Experience', 'Incomplete or Incorrect Information',
    'Background Check Issues', 'Not taking therapists at the moment'
]
const AddRejectingReasonComponent: React.FC<{ therapistId: string; }> = ({ therapistId }) => {
    const router = useRouter();

    const submitReason = async (item: string) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/admin/therapists/rejected`,
                { reason: item, therapistId: therapistId }, { withCredentials: true, }
            );
            if (response.status === 200) {
                toast.success('Reason successfully updated');
                router.push('/admin/therapists/rejected')
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
                flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.3)',
            }}>
                <Typography sx={{
                    fontWeight: 800, fontSize: '1.3rem', color: '#325343',
                    mb: 1
                }}>Add a reason for rejecting therapist</Typography>
                <Divider sx={{ mb: 2 }} />
                <FormGroup>
                    {reasonItems.map((item) => (
                        <Button variant="outlined"
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