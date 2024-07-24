import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';

export default function Footer() {
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'flex-start',
            flexDirection: 'column', backgroundColor: '#325343ed'
        }}>
            <Typography sx={{
                fontSize: '0.8rem',
                color: 'white', mb: 1, fontWeight: 500, ml: 2, mt: 2
            }
            }>If you are in a crisis or any other person may be in danger-don’t use this site.
                Dial 112 can provide you with immediate help.</Typography>
            <Box sx={{ p: 2 }}>
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between', maxWidth: '90%',
                    width: '20rem', mb: 1,
                }}>
                    <Typography sx={{
                        fontSize:'0.8rem',
                        color: 'white',
                    }
                    }>Home</Typography>
                    <Typography sx={{
                        fontSize:'0.8rem',
                        color: 'white',
                    }
                    }>Advice</Typography>
                    <Typography sx={{
                        fontSize:'0.8rem',
                        color: 'white',
                    }
                    }>Contact</Typography>
                    <Typography sx={{
                        fontSize:'0.8rem',
                        color: 'white',
                    }
                    }>Therapist Jobs</Typography>

                </Box >
                <Divider sx={{ width: '100%', mx: 'auto' }} />
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between', maxWidth: '90%', width: '30rem', mt: 1
                }}>
                    <Typography sx={{
                        fontSize:'0.8rem',
                        color: 'white',
                    }
                    }>Terms & Conditions</Typography>
                    <Typography sx={{
                        fontSize:'0.8rem',
                        color: 'white',
                    }
                    }>Privacy Policy</Typography>
                    <Typography sx={{
                        fontSize:'0.8rem',
                        color: 'white',
                    }
                    }>Sharing Settings</Typography>
                    <Typography sx={{
                        fontSize:'0.8rem',
                        color: 'white',
                    }
                    }>Web Accessibility</Typography>

                </Box >
                <Box sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    width: '100%', mt: 3,
                }}>
                    <Typography sx={{
                        fontSize:'0.8rem',
                        color: 'white',
                    }
                    }>© 2024 BlossomWell</Typography>
                </Box >
            </Box>
        </Box >
    );
}
