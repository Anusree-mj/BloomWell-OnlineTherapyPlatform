import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface ConnectionInfoProps {
    connectionInfoItems: {
        therapistId: string,
        therapistName: string,
        connectionId: string,
        connectionStatus: boolean,
        connectedAt: string
    },
    hasConnectionInfo: boolean
}

const ConnectionInfoComponent: React.FC<ConnectionInfoProps> = ({ connectionInfoItems, hasConnectionInfo }) => {
    console.log('Personal Info Items:', connectionInfoItems);

    const typographyItems = [
        { title: 'Therapist Name', value: connectionInfoItems.therapistName },
        { title: 'Status', value: `${connectionInfoItems.connectionStatus ? 'Connected' : 'Verifying'}` },
        { title: `${connectionInfoItems.connectionStatus ? 'Connected On' : 'Request Send On'}`, value: connectionInfoItems.connectedAt },
    ]
    return (
        <Box sx={{
           backgroundColor: 'white', display: 'flex', mt: '2rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.3)',
        }}>
            <Typography sx={{
                fontWeight: 800, fontSize: '1rem', color: '#325343',
                mb: 1
            }}>Connection Info</Typography>
            <Divider sx={{ mb: 2 }} />
            {hasConnectionInfo ? (
                <>
                    {typographyItems.map((item) => (
                        <Box key={item.title} sx={{ display: 'flex', pt: '0.2rem' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#325343' }} >{item.title} : </Typography>
                            <Typography sx={{ fontWeight: 200, fontSize: '1rem', color: '#325343', ml: '0.2rem' }} >{item.value}</Typography>
                        </Box>
                    ))}
                    <Button variant="contained"
                        sx={{ alignSelf: 'flex-start', mt: 1, backgroundColor: '#325343' }}
                    >Cancel</Button>
                </>
            ) : (
                <>
                    <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#325343' }} >
                        Not Connected With Any Yet </Typography>
                    <Button variant="contained"
                        sx={{ alignSelf: 'flex-start', mt: 1, backgroundColor: '#325343' }}
                    >Let's Connect</Button>
                </>
            )}

        </Box>
    )
}

export default ConnectionInfoComponent