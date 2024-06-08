import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface SubscriptionInfoProps {
    SubscriptionItems: {
        subscribedFor: string,
        expiresAt: string,
        subscribedAt: string
    },
}

const SubscriptionInfoComponent: React.FC<SubscriptionInfoProps> = ({ SubscriptionItems }) => {
    console.log('Personal Info Items:', SubscriptionItems);

    const typographyItems = [
        { title: 'Subscription Plan', value: SubscriptionItems.subscribedFor },
        { title: 'Subscribed On', value: SubscriptionItems.subscribedAt },
        { title: 'Expires In', value: SubscriptionItems.expiresAt },
    ]
    return (
        <Box sx={{
           backgroundColor: 'white', display: 'flex', mt: '2rem',
            flexDirection: 'column', p: 3, borderRadius: '1rem', boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.3)',
        }}>
            <Typography sx={{
                fontWeight: 800, fontSize: '1rem', color: '#325343',
                mb: 1
            }}>Subscription Info</Typography>
            <Divider sx={{ mb: 2 }} />
            <>
                {typographyItems.map((item) => (
                    <Box key={item.title} sx={{ display: 'flex', pt: '0.2rem' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#325343' }} >{item.title} : </Typography>
                        <Typography sx={{ fontWeight: 200, fontSize: '1rem', color: '#325343', ml: '0.2rem' }} >{item.value}</Typography>
                    </Box>
                ))}
                <Button variant="contained"
                    sx={{ alignSelf: 'flex-start', mt: 1, backgroundColor: '#325343',
                        '&:hover': {
                                backgroundColor: '#49873D',
                                color: 'white',
                            }
                     }}
                >Cancel</Button>
            </>
        </Box>
    )
}

export default SubscriptionInfoComponent