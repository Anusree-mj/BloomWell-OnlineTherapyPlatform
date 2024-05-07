import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';

export default function Footer() {
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'flex-start',
            flexDirection: 'column'
        }}>
            <Typography sx={{
                fontSize: { xs: '0.9rem', sm: '0.9rem' },
                color: '#325343', mb: 1, fontWeight: 500, ml:2,mt:2
            }
            }>If you are in a crisis or any other person may be in danger-don’t use this site.
                Dial 112 can provide you with immediate help.</Typography>
            <Box sx={{ backgroundColor: '#F6F6F6', p: 2 }}>
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between', maxWidth: '90%',
                    width: '20rem', mb: 1,
                }}>
                    <Typography sx={{
                        fontSize: { xs: '0.8rem', sm: '0.8rem' },
                        color: 'black',
                    }
                    }>Home</Typography>
                    <Typography sx={{
                        fontSize: { xs: '0.8rem', sm: '0.8rem' },
                        color: 'black',
                    }
                    }>Advice</Typography>
                    <Typography sx={{
                        fontSize: { xs: '0.8rem', sm: '0.8rem' },
                        color: 'black',
                    }
                    }>Contact</Typography>
                    <Typography sx={{
                        fontSize: { xs: '0.8rem', sm: '0.8rem' },
                        color: 'black',
                    }
                    }>Therapist Jobs</Typography>

                </Box >
                <Divider sx={{ width: '100%', mx: 'auto' }} />
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between', maxWidth: '90%', width: '30rem', mt: 1
                }}>
                    <Typography sx={{
                        fontSize: { xs: '0.8rem', sm: '0.8rem' },
                        color: 'black',
                    }
                    }>Terms & Conditions</Typography>
                    <Typography sx={{
                        fontSize: { xs: '0.8rem', sm: '0.8rem' },
                        color: 'black',
                    }
                    }>Privacy Policy</Typography>
                    <Typography sx={{
                        fontSize: { xs: '0.8rem', sm: '0.8rem' },
                        color: 'black',
                    }
                    }>Sharing Settings</Typography>
                    <Typography sx={{
                        fontSize: { xs: '0.8rem', sm: '0.8rem' },
                        color: 'black',
                    }
                    }>Web Accessibility</Typography>

                </Box >
                <Box sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    maxWidth: '90%', width: '80rem', mt: 3
                }}>
                    <Typography sx={{
                        fontSize: { xs: '0.8rem', sm: '0.8rem' },
                        color: 'black',
                    }
                    }>© 2024 BlossomWell</Typography>

                </Box >
            </Box>
        </Box >
    );
}
