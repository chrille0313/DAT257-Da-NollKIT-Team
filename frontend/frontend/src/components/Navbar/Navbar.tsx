import styles from './Navbar.module.css';
import { Menu as MenuIcon, Close } from '@mui/icons-material';
import { useState } from 'react';
import { Desktop, TabletAndBelow, useDesktop } from '../Responsive'
import { CalendarMonth, Download, ExpandMore } from '@mui/icons-material';
import { AppBar, Box, Toolbar, IconButton, Button, Drawer } from '@mui/material';
import Logo from '../Logo';
import NavDrawerContent from './NavDrawerContent';


export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);


  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  return (
  <>
    <AppBar position="static" id={styles.AppBar}>
      <Toolbar className={styles.Toolbar}>
        <Logo />

        <Desktop>
          <Box className={styles.NavButtonsContainer}>
            <Button className={styles.NavButton} color='inherit'>Planner <CalendarMonth /></Button>
            <Button className={styles.NavButton} color='inherit'>Export <Download /></Button>
            <Button className={styles.NavButton} color='inherit' onClick={toggleDrawer}>Filter <ExpandMore /></Button>
          </Box>
        </Desktop>
        
        <TabletAndBelow>
          <IconButton color="inherit" onClick={toggleDrawer}>
            {drawerOpen ? <Close /> : <MenuIcon /> }
          </IconButton>
        </TabletAndBelow>
      </Toolbar>
    </AppBar>
    
    <Drawer open={drawerOpen} anchor={useDesktop() ? 'top' : 'left'} onClose={() => setDrawerOpen(false)}>
      <TabletAndBelow>
        <Toolbar /> {/* Add spacing from the navbar */}
      </TabletAndBelow>
      <NavDrawerContent />
    </Drawer>
  </>

  );
}