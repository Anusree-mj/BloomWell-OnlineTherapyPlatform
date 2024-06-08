"use client";
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { clientStateType, getClientDetailsAction } from "@/store/clients/clientReducer";
import Link from 'next/link';

const drawerWidth = 240;

export default function ClientProfiletHeader() {
    const dispatch = useDispatch();
    const router = useRouter()
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const clientData = localStorage.getItem("clientData");
        if (clientData) {
            dispatch(getClientDetailsAction())
        } else {
            router.push('/login')
        }
    }, []);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const logoutHandler = async () => {
        try {
            setAnchorEl(null);
            Cookies.remove('jwtClient');
            localStorage.removeItem('clientData');
            router.push('/login');
        } catch (error) {
            toast.error('Logout Failed')
            console.log(error)
        }
    };

    const handleProfileClick = () => {
        setAnchorEl(null);
        router.push('/client/profile')
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: 'white',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: {
                                sm: 'none',
                            },
                            color: '#325343'
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Image
                    src="/logo.png"
                    alt="logo"
                    width={80}
                    height={30}
                />
                <Link href={'/'} passHref>
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
                    BloomWellhhsssssssssssssssssssssssssssssssssssss
                </Typography>
                </Link>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            sx={{ color: '#325343' }}>
                            <Typography sx={{
                                fontSize: '1rem',
                                fontWeight: 600, ml: 1,
                                color: '#325343'
                            }
                            }>{clientDetails.name}</Typography>
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>

                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
