import { useState } from 'react';
import { Divider, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { individualQuestionnaire } from '../submitDetails/questions/individual';
import { teenQuestionnaire } from '../submitDetails/questions/teen';
import { coupleQuestionnaire } from '../submitDetails/questions/couple';


const PasswordComponent = () => {
    return (
        <Box sx={{
            backgroundColor: 'white', display: 'flex', mt: '2rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.3)',
        }}>
            <Typography sx={{ fontWeight: 800, mb: 1, fontSize: '1rem', color: '#325343' }}>Change Password</Typography>
            <Divider sx={{ mb: 2 }} />


            <Button variant='text' sx={{
                mt: 1, alignSelf: 'flex-start', textTransform: 'none', p: 0, fontWeight: 800,
                color: '#325343', textDecoration: 'underline', fontSize: '0.9rem',
            }}>
                Change Password
            </Button>
        </Box>
    );
}

export default PasswordComponent;
