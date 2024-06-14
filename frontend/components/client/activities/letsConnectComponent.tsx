import { Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'

const LetsConnectComponent = () => {
    return (
        <Box sx={{
            display: 'flex', maxWidth: '90%', alignItem: 'flex-start',
            width: '30rem',
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', maxWidth: '100%',
                width: '30rem', pt: 6, pb: 6, borderRadius: '1rem',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'
            }}>

                <Typography>
                    You haven't connected to any therapist yet!
                </Typography>
                <Link href="/client/connection" passHref>
                    <Button component="a" sx={{
                        my: 2, mx: 2, color: 'white', backgroundColor: '#325343',
                        display: 'block', fontWeight: 600,
                    }} variant="contained">
                        Let's Connect
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default LetsConnectComponent