import styles from './Navbar.module.css';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { Desktop, TabletAndBelow, useDesktop } from '../Responsive'
import { CalendarMonth, Download, ExpandMore } from '@mui/icons-material';
import { AppBar, TextField, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Drawer, Autocomplete, Slider, Grid} from '@mui/material';
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
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.Toolbar}>
          <Logo />

          <Desktop>
            <Box className={styles.NavButtonsContainer}>
              <Button className={styles.NavButton} color='inherit'>Planner <CalendarMonth /></Button>
              <Button className={styles.NavButton} color='inherit'>Export <Download /></Button>
              <Button className={styles.NavButton} color='inherit' onClick={toggleDrawer}>Filter <ExpandMore /></Button>
            </Box>
          </Desktop>
          
          <TabletAndBelow>
            <MenuIcon onClick={toggleDrawer} />
          </TabletAndBelow>
        </Toolbar>
      </Container>
    </AppBar>
    
    <Drawer open={drawerOpen} anchor={useDesktop() ? 'top' : 'left'} onClose={() => setDrawerOpen(false)}>
      <Toolbar /> {/* Add spacing from the navbar */}
      <NavDrawerContent />
    </Drawer>
  </>

  );
}