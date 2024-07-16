import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function LoginHeader() {
    const router = useRouter()
    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#325343',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#325343', cursor: 'pointer'

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
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'white',
                        textDecoration: 'none',
                    }} onClick={() => router.push('/')}
                >
                    BloomWell
                </Typography>
            </Box>
        </Box >
    )
}
