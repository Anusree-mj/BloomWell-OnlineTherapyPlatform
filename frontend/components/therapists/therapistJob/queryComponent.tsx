import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';

const buttonContents = [
    { role: 'Clinical Social Worker', skills: `(LCSW, LICSW, LISW, LICSW, etc.)` },
    { role: 'Marriage & Family Therapist', skills: `(, LMFT, LCMFT, LIMFT, etc.)` },
    { role: 'Mental Health Counselor', skills: `(LMHC, LCMHC, LMHP, LPMHC, etc.)` },
    { role: 'Professional Counselor', skills: `(LPC, LPCC, LCPC, etc.)` },
    { role: 'Psychologist' },
]
const QueryComponent = () => {
    return (
        <Box sx={{
            pt: 6, pb: 6,
            backgroundColor: '#325343', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
            <Typography sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                textAlign: 'center', color: 'white',
                letterSpacing: '0.2rem'
            }
            }>Join BloomWell and earn more!</Typography>
            <Typography sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                textAlign: 'center', color: 'white', mt: 2,
                letterSpacing: '0.1rem'
            }
            }>Select an option to get started</Typography>
            {buttonContents.map((item, index) => (

                <Button key={index} variant="contained" sx={{
                    mt: 2,
                    backgroundColor: '#95C08D',
                    color: '#325343',
                    borderRadius: '1.2rem',
                    width: '25rem',
                    maxWidth: '80%',
                    pt: 1,
                    pb: 1,
                    '&:hover': {
                        backgroundColor: '#49873D',
                        color: 'white',
                        '& .MuiTypography-root': {
                            color: 'white',
                        }
                    }
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem'
                            }}
                        >
                            {item.role}
                        </Typography>
                        {item.skills && (
                            <Typography sx={{
                                fontSize: '0.8rem'
                            }}>
                                {item.skills}
                            </Typography>
                        )}
                    </Box>
                </Button>

            ))}


        </Box>
    )
}

export default QueryComponent