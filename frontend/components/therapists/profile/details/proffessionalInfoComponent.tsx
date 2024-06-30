import React, { useState } from 'react'
import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditProffessionalInfoComponent from '../edit/editProffessionalInfo';


interface ProffessionalInfoProps {
    proffessionalInfo: { 
        licenseNo: string,
        country: string,
        licenseImage: string,
        experience: string,
        expertise: string[]
    },
}

const ProffessionalInfoComponent: React.FC<ProffessionalInfoProps> = ({ proffessionalInfo }) => {
    const [isEdit, setIsEdit] = useState(false);
    const typographyItems = [
        { title: 'License No', value: proffessionalInfo.licenseNo },
        { title: 'License Image', href: proffessionalInfo.licenseImage },
        { title: 'Country', value: proffessionalInfo.country },
        { title: 'Experience', value: proffessionalInfo.experience },
        { title: 'Expertise', value: proffessionalInfo.expertise.join(`,  `) },
    ]
    return (
        <Box sx={{
            backgroundColor: 'white', display: 'flex', mt: '2rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 1.1)',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#325343' }}>Proffessional Info</Typography>
                <EditNoteIcon sx={{ fontWeight: 800, color: '#325343' }}
                    onClick={() => { setIsEdit(true) }} />
            </Box> 
            <Divider sx={{ mb: 2 }} />
            {!isEdit ? (
                <>
                    {typographyItems.map((item) => (
                        <Box key={item.title} sx={{ display: 'flex', pt: '0.2rem' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#325343' }} >{item.title} : </Typography>
                            {item.href ? (
                                <a href={item.href} target="_blank" rel="noopener noreferrer" style={{
                                    textDecoration: 'underline', fontWeight: 400, fontSize: '1rem',
                                    color: '#325343', marginLeft: '0.2rem'
                                }}>
                                    View
                                </a>
                            ) : (
                                <Typography sx={{ fontWeight: 200, fontSize: '1rem', color: '#325343', ml: '0.2rem' }} >{item.value}</Typography>
                            )}
                        </Box>
                    ))}
                </>
            ) : (
                <EditProffessionalInfoComponent setIsEdit={setIsEdit} />
            )}
        </Box>
    )
}

export default ProffessionalInfoComponent