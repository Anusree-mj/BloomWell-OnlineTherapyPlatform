"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Menu } from '@mui/material';
import { getTherapistProfileAction, therapistStateType } from '@/store/therapists/therapistReducers';
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const drawerWidth = 240;

interface Props {
    container?: Element;
}

export default function TherapistSingleHeader(props: Props) {
    const dispatch = useDispatch();
    const therapist = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const router = useRouter()
    const error = useSelector((state: { therapist: therapistStateType }) => state.therapist.error);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    React.useEffect(() => {
        const therapistData = localStorage.getItem("therapistData");
        if (therapistData) {
            dispatch(getTherapistProfileAction());
        } else {
            router.push('/login')
        }
    }, []);

    React.useEffect(() => {
        if (error) {
            toast.error(error);
            if (error === 'User is blocked') {
                router.push('/login')
            }
        }
    }, [error]);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClick = () => {
        setAnchorEl(null);
        router.push('/therapist/profile')
    };
    const handleClose = () => {
        setAnchorEl(null);

    }
    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const logoutHandler = async () => {
        try {
            setAnchorEl(null);
            Cookies.remove('jwtTherapist');
            localStorage.removeItem('therapistData');
            router.push('/login');
        } catch (error) {
            toast.error('Logout Failed')
            console.log(error)
        }
    };

    const navicons = [
        {
            iconTitle: 'Dashboard', icon: <DashboardIcon />, link: '/#',
            subItems: [
                { title: 'Active', link: '/therapist/activities/active' },
                { title: 'Inactive', link: '/therapist/activities/inActive' },
                { title: 'Schedules', link: '/therapist/schedules' },
                { title: 'Connections', link: '/therapist/connections' },

            ]
        },
        {
            iconTitle: 'Notifications', icon: <NotificationsActiveIcon />,
            link: `/therapist/notifications/${therapist._id}`,
        },
        {
            iconTitle: 'Payments', icon: <PsychologyIcon />, link: '#',
        },
        { iconTitle: 'Quit', icon: <AutoGraphIcon />, link: '/therapist/analytics' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: '100%',
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
                    <Typography variant="h6" noWrap component="div" sx={{
                        color: '#325343',
                        fontWeight: 800
                    }}>
                        BloomWell
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            sx={{ color: '#325343' }}>
                            <Avatar src={therapist ? therapist.image : "/broken-image.jpg"} sx={{

                            }} />                            <Typography sx={{
                                fontSize: '1rem',
                                fontWeight: 600, ml: 1,
                                color: '#325343'
                            }
                            }>{therapist.name}</Typography>
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
