import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';

interface PersonalInfoProps {
    personalInfoItems: {
        name: string,
        email: string,
        age: string,
        sessionType: string
    }
}

const PersonalInfoComponent: React.FC<PersonalInfoProps> = ({ personalInfoItems }) => {
    console.log('Personal Info Items:', personalInfoItems);

    const typographyItems = [
        { title: 'Name', value: personalInfoItems.name },
        { title: 'Email', value: personalInfoItems.email },
        { title: 'Age', value: personalInfoItems.age },
        { title: 'Session Preferred', value: personalInfoItems.sessionType },
    ]
    return (
        <Box sx={{
           backgroundColor: 'white', display: 'flex',mt: '1rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.3)',

        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#325343' }}>Personal Info</Typography>
                <EditNoteIcon sx={{ fontWeight: 800, color: '#325343' }} />
            </Box>
            <Divider sx={{ mb: 2 }} />

            {typographyItems.map((item) => (
                <Box key={item.title} sx={{ display: 'flex', pt: '0.2rem' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#325343' }} >{item.title} : </Typography>
                    <Typography sx={{ fontWeight: 200, fontSize: '1rem', color: '#325343', ml: '0.2rem' }} >{item.value}</Typography>
                </Box>
            ))}

        </Box>
    )
}

export default PersonalInfoComponent