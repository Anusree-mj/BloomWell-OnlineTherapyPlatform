import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditPersonalInfoComponent from './editPersonalInfoComponent';

interface PersonalInfoProps {
    personalInfoItems: {
        name: string,
        email: string,
        age: string,
        sessionType: string
    }
}

const PersonalInfoComponent: React.FC<PersonalInfoProps> = ({ personalInfoItems }) => {
    const [editInfo, setEditInfo] = useState(false)
    const typographyItems = [
        { title: 'Name', value: personalInfoItems.name },
        { title: 'Email', value: personalInfoItems.email },
        { title: 'Age', value: personalInfoItems.age },
        { title: 'Session Preferred', value: personalInfoItems.sessionType },
    ]
    return (
        <Box sx={{
            backgroundColor: 'white', display: 'flex', mt: '1rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.3)',

        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#325343' }}>Personal Info</Typography>
                <EditNoteIcon sx={{ fontWeight: 800, color: '#325343' }} onClick={() => { setEditInfo(true) }} />
            </Box>
            <Divider sx={{ mb: 2 }} />
            {!editInfo ? (
                <>
                    {typographyItems.map((item) => (
                        <Box key={item.title} sx={{ display: 'flex', pt: '0.2rem' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#325343' }} >{item.title} : </Typography>
                            <Typography sx={{ fontWeight: 200, fontSize: '1rem', color: '#325343', ml: '0.2rem' }} >{item.value}</Typography>
                        </Box>
                    ))}
                </>
            ) : (
                <EditPersonalInfoComponent setEditInfo={setEditInfo} />
            )}

        </Box>
    )
}

export default PersonalInfoComponent