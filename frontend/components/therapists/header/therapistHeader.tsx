import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Avatar, Menu, Container, Tooltip, Button } from '@mui/material';
import { getTherapistProfileAction, therapistStateType } from '@/store/therapists/therapistReducers';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import AlertComponent from '@/components/common/alert';
import Image from 'next/image';

interface Props {
    container?: Element;
}


export default function TherapistHeader(props: Props) {
    const socket = io(`${process.env.NEXT_PUBLIC_SERVER_API_URL}`);
    const dispatch = useDispatch();
    const therapist = useSelector((state: { therapist: therapistStateType }) => state.therapist.therapist);
    const router = useRouter();
    const error = useSelector((state: { therapist: therapistStateType }) => state.therapist.error);

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const therapistData = localStorage.getItem("therapistData");
        if (therapistData) {
            dispatch(getTherapistProfileAction());
        } else {
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        if (therapist._id !== '') {
            socket.emit('joinRoom', { userId: therapist._id, role: 'therapist' });
        }
    }, [therapist._id])

    useEffect(() => {
        if (!socket) return;      
        console.log('Setting up event listener for recieve_connectionMessage');
        socket.on('recieve_connectionMessage', (data) => {
          console.log('Data reached in recieve_connectionMessage:', data);
          setAlertMessage(`New Connection from ${data}`);
        });
      
        return () => {
          console.log('Cleaning up event listener for recieve_connectionMessage');
          socket.off('recieve_connectionMessage');
        };
      }, [socket]);
      


    useEffect(() => {
        if (error) {
            toast.error(error);
            if (error === 'User is blocked') {
                router.push('/login');
            }
        }
    }, [error]);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuToggle = (menu: string) => {
        setOpenMenus((prevOpenMenus) => ({
            ...prevOpenMenus,
            [menu]: !prevOpenMenus[menu],
        }));
    };

    const handleProfileClick = () => {
        handleCloseUserMenu();
        router.push('/therapist/profile');
    };

    const logoutHandler = async () => {
        try {
            handleCloseUserMenu();
            Cookies.remove('jwtTherapist');
            localStorage.removeItem('therapistData');
            router.push('/login');
        } catch (error) {
            toast.error('Logout Failed');
            console.log(error);
        }
    };

    const navicons = [
        {
            iconTitle: 'Activities', link: '/#',
            subItems: [
                { title: 'Active', link: '/therapist/activities/active' },
                { title: 'Inactive', link: '/therapist/activities/inActive' },
            ]
        },
        {
            iconTitle: 'Schedules',
            link: `/therapist/schedules`,
        },
        {
            iconTitle: 'Manage Connections',
            link: `/therapist/connections`,
        },
        { iconTitle: 'Quit', link: '/therapist/quit' },
        {
            iconTitle: 'Payments', link: '#',
        },
        {
            iconTitle: 'Notifications',
            link: `/therapist/notifications/${therapist._id}`,
        },
    ];

    const settings = [
        { title: 'Profile', action: handleProfileClick },
        { title: 'Logout', action: logoutHandler },
    ];

    return (
        <Box sx={{
            flexGrow: 1,
        }}>
            <CssBaseline />
            <AppBar position="static" sx={{ backgroundColor: '#325343' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={80}
                                height={30}
                                style={{ marginRight: '8px' }}
                            />
                            BloomWell
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="open drawer"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {navicons.map((item, index) => (
                                    item.subItems ? (
                                        <div key={index}>
                                            <ListItemButton onClick={() => handleMenuToggle(item.iconTitle)}>
                                                <ListItemText primary={item.iconTitle} />
                                                <ExpandMoreIcon />
                                            </ListItemButton>
                                            <Collapse in={openMenus[item.iconTitle]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {item.subItems.map((subItem, subIndex) => (
                                                        <Link href={subItem.link} passHref key={subIndex}>
                                                            <ListItemButton component="a" sx={{ pl: 4 }}>
                                                                <ListItemText primary={subItem.title} />
                                                            </ListItemButton>
                                                        </Link>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        </div>
                                    ) : (
                                        <Link href={item.link} passHref key={index}>
                                            <MenuItem onClick={handleCloseNavMenu}>
                                                <ListItemText primary={item.iconTitle} />
                                            </MenuItem>
                                        </Link>
                                    )
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                alignItems: 'center',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={80}
                                height={30}
                                style={{ marginRight: '8px' }}
                            />
                            BloomWell
                        </Typography>
                        <Box sx={{
                            flexGrow: 1, display: { xs: 'none', md: 'flex' },
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            {navicons.map((item, index) => (
                                item.subItems ? (
                                    <div key={index}>
                                        <ListItemButton
                                            onClick={() => handleMenuToggle(item.iconTitle)}
                                            sx={{ display: 'flex', alignItems: 'center' }} // Add custom style here
                                        >
                                            <ListItemText primary={item.iconTitle} />
                                            <ExpandMoreIcon />
                                        </ListItemButton>
                                        <Collapse in={openMenus[item.iconTitle]} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <Link href={subItem.link} passHref key={subIndex}>
                                                        <ListItemButton component="a" sx={{ pl: 4 }}>
                                                            <ListItemText primary={subItem.title} />
                                                        </ListItemButton>
                                                    </Link>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </div>
                                ) : (
                                    <Link href={item.link} passHref key={index}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <ListItemText primary={item.iconTitle} />
                                        </MenuItem>
                                    </Link>
                                )
                            ))}

                        </Box>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ width: 50, height: 50 }}
                                    src={therapist ? therapist.image : "/broken-image.jpg"} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting, index) => (
                                <MenuItem key={index} onClick={setting.action}>
                                    <Typography textAlign="center">{setting.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
            {alertMessage && (
                <AlertComponent message={alertMessage} viewURL={'/therapist/connections'} />
            )}
        </Box>
    );
}
