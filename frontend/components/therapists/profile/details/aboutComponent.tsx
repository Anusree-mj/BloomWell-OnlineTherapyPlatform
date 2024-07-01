import React, { useState } from 'react'
import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditTherapistAboutComponent from '../edit/editTherapistAbout';

interface AboutInfoProps {
    description: string,
}

const AboutInfoComponent: React.FC<AboutInfoProps> = ({ description }) => {
    const [editAboutInfo, setEditAboutInfo] = useState(false)
    return (
        <Box sx={{
            backgroundColor: 'white', display: 'flex', mt: '2rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 1.1)',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#325343' }}>About</Typography>
                <EditNoteIcon sx={{ fontWeight: 800, color: '#325343' }} onClick={() => { setEditAboutInfo(true) }} />
            </Box>
            <Divider sx={{ mb: 2 }} />
            {!editAboutInfo ? (

                <Typography sx={{ fontWeight: 200, fontSize: '1rem', color: '#325343', ml: '0.2rem' }} >{description}</Typography>
            ) : (
                <EditTherapistAboutComponent setEditAboutInfo={setEditAboutInfo} />
            )}
        </Box>
    )
}

export default AboutInfoComponent