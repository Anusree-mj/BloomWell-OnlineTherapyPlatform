"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

const drawerWidth = 240;

interface Props {
  container?: Element;
}

export default function AdminHeader(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({});

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

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

  const handleMenuToggle = (menu: string) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [menu]: !prevOpenMenus[menu],
    }));
  };

  const navicons = [
    { iconTitle: 'Dashboard', icon: <DashboardIcon />, link: '/admin/' },
    {
      iconTitle: 'Clients', icon: <PsychologyAltIcon />, link: '#',
      subItems: [
        { title: 'Manage Clients', link: '/admin/clients/view' },
        { title: 'Complaints', link: '/admin/clients/add' },
      ]
    },
    {
      iconTitle: 'Therapists', icon: <PsychologyIcon />, link: '#',
      subItems: [
        { title: 'Manage Therapists', link: '/admin/therapists/view' },
        { title: 'Verify Therapist', link: '/admin/therapists/verify' },
        { title: 'Manage Connections', link: '/admin/therapists/connections' },
        { title: 'Manage Payments', link: '/admin/therapists/add' },
        { title: 'Leaving Therapists', link: '/admin/therapists/quit' },
      ]
    },
    { iconTitle: 'Feedbacks', icon: <InsertCommentIcon />, link: '/admin/feedbacks' },
    { iconTitle: 'Analytics', icon: <AutoGraphIcon />, link: '/admin/analytics' },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {navicons.map((item, index) => (
          item.subItems ? (
            <div key={index}>
              <ListItemButton onClick={() => handleMenuToggle(item.iconTitle)}>
                <ListItemIcon sx={{ color: 'white' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.iconTitle}
                  primaryTypographyProps={{
                    sx: { fontWeight: 600 }
                  }}
                />
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
              <ListItem disablePadding>
                <ListItemButton component="a">
                  <ListItemIcon sx={{ color: 'white' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.iconTitle}
                    primaryTypographyProps={{
                      sx: { fontWeight: 600 }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        ))}
      </List>
    </div>
  );

  const container = props.container ?? undefined;

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
              <AccountCircle />
              <Typography sx={{
                fontSize: '1rem',
                fontWeight: 600, ml: 1,
                color: '#325343'
              }
              }>Emily</Typography>
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
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              backgroundColor: '#325343', boxSizing: 'border-box',
              width: drawerWidth, color: 'white'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              backgroundColor: '#325343', boxSizing: 'border-box',
              width: drawerWidth, color: 'white'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
