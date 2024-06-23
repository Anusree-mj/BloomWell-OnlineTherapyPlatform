import { Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'

interface DoSomethingComponentProps {
    content: string,
    buttonTitle: string,
    url: string
}

const DoSomethingComponent: React.FC<DoSomethingComponentProps> = ({ content, buttonTitle, url }) => {
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
                    {content}
                </Typography>
                <Link href={url} passHref>
                    <Button component="a" sx={{
                        my: 2, mx: 2, color: 'white', backgroundColor: '#325343',
                        display: 'block', fontWeight: 600,
                        '&:hover': {
                            backgroundColor: '#a6de9b',
                            color: '#325343'
                        }
                    }} variant="contained">
                        {buttonTitle}
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default DoSomethingComponent