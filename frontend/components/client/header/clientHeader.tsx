import * as React from 'react';
import { io, Socket } from 'socket.io-client';
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
import { Avatar, Menu, Container, Tooltip, Button, Divider } from '@mui/material';
import { clientStateType, getClientDetailsAction } from "@/store/clients/clientReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import AlertComponent from '@/components/common/alert';
import Image from 'next/image';
import { styled, alpha } from '@mui/material/styles';
import { MenuProps } from '@mui/material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';
import { clientAuth } from '@/utilities/auth';

interface Props {
    container?: Element;
}
const StyledMenu = styled((props: MenuProps) => (

    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function ClientHeader(props: Props) {
    const socket = React.useRef<Socket | null>(null);
    const dispatch = useDispatch();
    const clientDetails = useSelector((state: { client: clientStateType }) => state.client.client);
    const router = useRouter();
    const error = useSelector((state: { client: clientStateType }) => state.client.error);
    const [anchorElSubItems, setAnchorElSubItems] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorElSubItems);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [alertMessage, setAlertMessage] = React.useState<string>('');
    const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({});

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    React.useEffect(() => {
        const { status } = clientAuth()
        if (status === 'ok') {
            dispatch(getClientDetailsAction())
        } else {
            router.push('/login')
        }
    }, []);

    React.useEffect(() => {
        if (clientDetails._id) {
            if (!socket.current) {
                socket.current = io(`${process.env.NEXT_PUBLIC_SERVER_API_URL}`);
            }

            socket.current.emit('joinRoom', { userId: clientDetails._id, role: 'client' });

            socket.current.on('recieve_connectionMessage', (data) => {
                console.log('Data reached in recieve_connectionMessage:', data);
                setAlertMessage(`New Connection from ${data}`);
            });

            return () => {
                if (socket.current) {
                    socket.current.off('recieve_connectionMessage');
                    socket.current.disconnect();
                    socket.current = null;
                }
            };
        }
    }, [clientDetails]);

    React.useEffect(() => {
        if (error) {
            toast.error(error);
            if (error === 'User is blocked') {
                router.push('/login')
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
    const handleSubItemClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElSubItems(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElSubItems(null);
    };

    const logoutHandler = async () => {
        try {
            setAnchorElNav(null);
            Cookies.remove('jwtClient');
            localStorage.removeItem('clientData');
            router.push('/login');
        } catch (error) {
            toast.error('Logout Failed')
            console.log(error)
        }
    };

    const handleProfileClick = () => {
        setAnchorElNav(null);
        router.push('/client/profile')
    };

    const navicons = [

        {
            iconTitle: 'My Activity', link: '/#',
            subItems: [
                { title: 'Ongoing', link: '/client/myActivity/ongoing' },
                { title: 'All', link: '/client/myActivity/all' },
            ]
        },
        {
            iconTitle: 'BookSlot', link: `/client/myActivity/bookSlot`,
        },
        {
            iconTitle: 'Therapy', link: `/client/therapy/${clientDetails.therapistDetails ? clientDetails.therapistDetails._id : ''}`,
        },
        { iconTitle: 'Feedback', link: '/client/feedback' },
        {
            iconTitle: 'Notifications',
            link: `/client/notifications/${clientDetails._id}`,
        },
    ];

    const settings = [
        { title: 'Profile', action: handleProfileClick },
        { title: 'Logout', action: logoutHandler },
    ];


    return (
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <AppBar
                position="static"
                sx={{
                    backgroundColor: '#325343',
                    boxShadow: '0px 15px 10px -15px #111'
                }}
            >
                <Container maxWidth="xl"
                    sx={{
                        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                    }}>
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        {!isSmallScreen && (
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
                        )}
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
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
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
                                                            <ListItemButton component="a" sx={{ pl: 4 }} onClick={handleCloseNavMenu}>
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
                        {isSmallScreen && (
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
                                    letterSpacing: '.1rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    fontSize: '1.2rem',  // Adjust the font size for small screens
                                }}
                            >
                                BloomWell
                            </Typography>
                        )}
                        <Box sx={{
                            flexGrow: 1, display: { xs: 'none', md: 'flex' },
                            alignItems: 'center', justifyContent: 'center',
                        }}>
                            {navicons.map((item, index) => (
                                item.subItems ? (
                                    <div key={index}>
                                        <ListItemButton
                                            aria-controls={open ? 'demo-customized-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleSubItemClick}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                boxShadow: 'none',  // Override elevation with boxShadow
                                            }}
                                        >
                                            <ListItemText primary={item.iconTitle} />
                                            <ExpandMoreIcon />
                                        </ListItemButton>
                                        <StyledMenu
                                            id="demo-customized-menu"
                                            MenuListProps={{ 'aria-labelledby': 'demo-customized-button' }}
                                            anchorEl={anchorElSubItems}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            {item.subItems.map((subItem, subIndex) => (
                                                <>
                                                    <Link href={subItem.link} passHref key={subIndex}>
                                                        <ListItemButton component="a" sx={{ pl: 4 }} onClick={handleClose}>
                                                            <ListItemText primary={subItem.title} />
                                                        </ListItemButton>
                                                    </Link>
                                                    {item.subItems.length - 1 !== subIndex && (
                                                        <Divider sx={{ my: 0.5 }} />
                                                    )}
                                                </>
                                            ))}
                                        </StyledMenu>
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
                            <IconButton
                                onClick={handleOpenUserMenu}
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                sx={{ color: '#325343' }}
                            >
                                <Typography sx={{
                                    fontSize: '1rem',
                                    fontWeight: 600, ml: 1,
                                    color: 'white',
                                }}>
                                    {clientDetails.name}
                                </Typography>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
            {/* {alertMessage && (
                <AlertComponent message={alertMessage} viewURL={'/therapist/connections'} />
            )} */}
        </Box >
    );



}