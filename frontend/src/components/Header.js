import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';


function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Jobs', link: '#HorizontalVerticalTabssection' },
    { text: 'Interviews', link: '#section1' },
    { text: 'Internships', link: '/internships' },
    { text: 'Certificate', link: '#VerificationTabs' },
    { text: 'SignUp/Login', link: '#section2' },
    // { text: 'Login', link: '#section2' }
  ];



    




  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: '100%',
          backgroundColor: 'white',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: { xs: '0 10px', sm: '0 20px', md: '0 40px' },
        }}
      >
          <Toolbar
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }}
>
  {/* Logo */}
  <Box
    component="img"
    src={`${process.env.PUBLIC_URL}/Assets/sklogo.png`}
    alt="Logo"
    sx={{
      height: { xs: 50, sm: 60, md: 60 },
      width: 'auto',
      objectFit: 'contain',
    }}
  />

  {/* Desktop Menu */}
  <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
    {menuItems.map((item) => (
      <Button
        key={item.text}
        component={HashLink}
        to={item.link}
        smooth
        sx={{ color: '#192661', fontSize: '16px', fontWeight: 'bold', textTransform: 'none' }}
      >
        {item.text}
      </Button>
    ))}
  </Box>

  {/* Mobile Menu Icon */}
  <Box sx={{ marginLeft: 'auto', display: { xs: 'block', md: 'none' } }}>
    <IconButton
      color="inherit"
      aria-label="menu"
      onClick={handleDrawerToggle}
      sx={{ color: '#000' }}
    >
      <MenuIcon />
    </IconButton>
  </Box>
</Toolbar>

      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { width: '40%', backgroundColor: 'white', height: '100%' },
        }}
      >
        {/* Close Icon */}
        <Box sx={{ position: 'absolute', top: '15px', right: '15px' }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#000' }}>
            <CloseIcon />
          </IconButton>
        </Box>



        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} sx={{ justifyContent: 'center' }}>
              <ListItemText
                primary={
                  <HashLink
                    to={item.link}
                    smooth
                    style={{ textDecoration: 'none', color: '#192661', fontWeight: 'bold' }}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {item.text}
                  </HashLink>
                }
                sx={{ textAlign: 'center' }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Header;
