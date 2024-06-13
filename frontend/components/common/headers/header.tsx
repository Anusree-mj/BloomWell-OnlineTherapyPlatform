// @react
'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';

const drawerWidth = 240;
const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Advice', link: '/advice' },
  { name: 'Contact', link: '/contact' },
  { name: 'Therapist Jobs', link: '/therapistJob' },
];

export default function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{
      textAlign: 'center', backgroundColor: '#F8FBD5',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    }}>

      <Box sx={{
        flexGrow: 1, display: { xs: 'flex', sm: 'flex' },
        alignItems: 'center', backgroundColor: '#325343', width: '100%'
      }}
      >
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
          sx={{
            ml: 2,
            display: { xs: 'flex', md: 'flex' },
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
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link href={item.link} passHref>
              <ListItemButton component="a"
                sx={{ textAlign: 'center', color: '#325343', fontWeight: 600 }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        <Link href="/login" passHref>
          <Button component="a"
            variant="outlined"
            sx={{
              my: 1,
              mx: 2,
              color: '#325343',
              borderColor: '#325343',
              display: 'block',
              fontWeight: 600
            }}
          >
            Login          </Button>
        </Link>

        <Link href="/client/register" passHref>
          <Button component="a" sx={{
            my: 2, mx: 2, color: 'white', backgroundColor: '#325343',
            display: 'block', fontWeight: 600,
          }} variant="contained">
            Get Started
          </Button>
        </Link>

      </List>
    </Box >
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#325343' }}>
        <Toolbar>
          <Box sx={{
            flexGrow: 1, display: { xs: 'flex', sm: 'flex' },
            alignItems: 'center'
          }}
          >
            <Link href="/" passHref>
              <Image
                src="/logo.png"
                alt="logo"
                width={90}
                height={30}
              />
            </Link>
            <Link href="/" passHref>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  display: { xs: 'flex', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                BloomWell
              </Typography>
            </Link>

          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map((item) => (
              <Link href={item.link} passHref>
                <Button component="a"
                  key={item.name}
                  sx={{
                    color: '#fff',
                    '&:hover': {
                      textDecorationColor: 'transparent',
                      boxShadow: 'inset 0em -0.2em 0 #49873D',
                    },
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <Link href="/login" passHref>
              <Button component="a"
                sx={{
                  mx: 1, color: 'white', borderColor: 'white', display: 'block',
                  fontWeight: 600,
                  '&:hover': {
                   border:'1px solid #49873D'
                  }
                }}
                variant="outlined">
                Login
              </Button>
            </Link>

            <Link href="/client/register" passHref>
              <Button component="a"
                sx={{
                  mx: 1, color: '#325343', backgroundColor: 'white', display: 'block',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#49873D',color:'white'
                  }
                }}
                variant="contained">
                Get Started
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box', width: drawerWidth,
              backgroundColor: '#F8FBD5',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

    </Box>
  );
}
