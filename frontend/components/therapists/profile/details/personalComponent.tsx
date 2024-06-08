import React, { useState } from 'react'
import { Avatar, Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditTherapistPersonalInfoComponent from '../edit/editTherapistPersonalInfo';

interface PersonalInfoProps {
    personalInfoItem: {
        name: string,
        email: string,
        phone: number,
        image: string,
        gender: string,
        role: string
    },
}

const PersonalInfoComponent: React.FC<PersonalInfoProps> = ({ personalInfoItem }) => {
    const [editPersonalInfo, setEditPersonalInfo] = useState(false)

    const typographyItems = [
        { title: 'Name', value: personalInfoItem.name },
        { title: 'Email', value: personalInfoItem.email },
        { title: 'Phone', value: personalInfoItem.phone },
        { title: 'Gender', value: personalInfoItem.gender },
        { title: 'Role', value: personalInfoItem.role },
    ]
    return (
        <Box sx={{
            backgroundColor: 'white', display: 'flex', mt: '2rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.3)',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#325343' }}>Personal Info</Typography>
                <EditNoteIcon sx={{ fontWeight: 800, color: '#325343' }} onClick={() => { setEditPersonalInfo(true) }} />
            </Box>
            <Divider sx={{ mb: 2 }} />
            {!editPersonalInfo ? (
                <>
                    {typographyItems.map((item) => (
                        <Box key={item.title} sx={{ display: 'flex', pt: '0.2rem' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#325343' }} >{item.title} : </Typography>
                            <Typography sx={{ fontWeight: 200, fontSize: '1rem', color: '#325343', ml: '0.2rem' }} >{item.value}</Typography>
                        </Box>
                    ))}
                </>

            ) : (
                <EditTherapistPersonalInfoComponent setEditPersonalInfo={setEditPersonalInfo} />
            )}
        </Box>
    )
}

export default PersonalInfoComponent