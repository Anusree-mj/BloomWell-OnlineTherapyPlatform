import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';

export function LoginHeader() {
    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#325343'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#325343',
            }}>
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={80}
                    height={30}
                />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'white',
                        textDecoration: 'none',
                    }}
                >
                    BloomWell
                </Typography>
            </Box>
        </Box>
    )
}
