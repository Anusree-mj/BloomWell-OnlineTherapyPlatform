import React from 'react'
import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import EditNoteIcon from '@mui/icons-material/EditNote';

interface AboutInfoProps {
    description: string,
}

const AboutInfoComponent: React.FC<AboutInfoProps> = ({ description }) => {

    return (
        <Box sx={{
            backgroundColor: 'white', display: 'flex', mt: '2rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.3)',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#325343' }}>About</Typography>
                <EditNoteIcon sx={{ fontWeight: 800, color: '#325343' }} />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography sx={{ fontWeight: 200, fontSize: '1rem', color: '#325343', ml: '0.2rem' }} >{description}</Typography>
        </Box>
    )
}

export default AboutInfoComponent