import { Typography, Button } from '@mui/material'
import { Box } from '@mui/system'


const CancelComponent = () => {
    return (
        <Box sx={{
            display: 'flex', maxWidth: '90%', alignItem: 'flex-start',
            width: '30rem',
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', maxWidth: '100%',
                width: '30rem', p: '1rem 1.2rem', borderRadius: '1rem',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'
            }}>
                <Typography
                    sx={{ textAlign: 'center', letterSpacing: '1px', color: '#325343' }}>
                    Your slot on [date] at [time] has been successfully booked.
                    Awaiting confirmation from your therapist.
                    You will be notified once it is confirmed.
                </Typography>
                <Button component="a" sx={{
                    my: 2, mx: 2, color: 'white', backgroundColor: '#325343',
                    display: 'block', fontWeight: 600,
                    '&:hover': {
                        backgroundColor: '#a6de9b',
                        color: '#325343'
                    }
                }} variant="contained">
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}

export default CancelComponent