import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { clientStateType, getClientDetailsAction } from "@/store/clients/clientReducer";
import Link from 'next/link';
import { Button } from '@mui/material';




const TherapistProfileHeader = () => {
    const dispatch = useDispatch();
    const router = useRouter()

    React.useEffect(() => {
        const clientData = localStorage.getItem("clientData");
        if (clientData) {
            dispatch(getClientDetailsAction())
        } else {
            router.push('/login')
        }
    }, []);

    const logoutHandler = async () => {
        try {
            Cookies.remove('jwtClient');
            localStorage.removeItem('clientData');
            router.push('/login');
        } catch (error) {
            toast.error('Logout Failed')
            console.log(error)
        }
    };

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#325343'
        }}>
            <Box sx={{
                display: 'flex', width: '100%', p: 2,
                alignItems: 'center', justifyContent: 'space-between',
                backgroundColor: '#325343',
            }}>
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={80}
                        height={30}
                    />
                    <Link href={'/client/myActivity'} passHref>
                        <Typography component="a"
                            variant="h6"
                            noWrap
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
                    </Link>
                </Box>
                <Button
                    sx={{
                        mx: 1, color: 'white', borderColor: 'white', display: 'block',
                        fontWeight: 600,
                        '&:hover': {
                            border: '1px solid #49873D'
                        }
                    }}
                    variant="outlined" onClick={logoutHandler}>
                    Logout
                </Button>
            </Box>

        </Box>
    );
}
export default TherapistProfileHeader;
