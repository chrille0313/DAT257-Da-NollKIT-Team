import styles from './Navbar.module.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Option } from 'react-dropdown';
import Autocomplete from '@mui/material/Autocomplete';
import { AppBar, TextField, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Drawer} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Desktop, TabletAndBelow } from '../Responsive'


const pages = ['Products', 'Pricing', 'Blog'];

function Navbar() {
  function sortOptionByLabel(a: Option, b: Option) {
    const labelA = a.label!.toString();
    const labelB = b.label!.toString();
    return labelA.localeCompare(labelB);
  }

  const dietOptions = [
    { value: 'balanced', label: 'Balanced' },
    { value: 'high-fiber', label: 'High Fiber' },
    { value: 'high-protein', label: 'High Protein' },
    { value: 'low-carb', label: 'Low Carb' },
    { value: 'low-fat', label: 'Low Fat' },
    { value: 'low-sodium', label: 'Low Sodium' }
  ].sort(sortOptionByLabel);

  const healthOptions = [
    { value: 'dairy-free', label: 'Dairy Free' },
    { value: 'egg-free', label: 'Egg Free' },
    { value: 'fish-free', label: 'Fish Free' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'low-sugar', label: 'Low Sugar' },
    { value: 'mollusk-free', label: 'Mollusk Free' },
    { value: 'peanut-free', label: 'Peanut Free' },
    { value: 'pescatarian', label: 'Pescatarian' },
    { value: 'pork-free', label: 'Pork Free' },
    { value: 'red-meat-free', label: 'Red Meat Free' },
    { value: 'shellfish-free', label: 'Shellfish Free' },
    { value: 'soy-free', label: 'Soy Free' },
    { value: 'tree-nut-free', label: 'Tree Nut Free' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'wheat-free', label: 'Wheat Free' }
  ].sort(sortOptionByLabel)

  const cuisineOptions = [
    { value: 'american', label: 'American' },
    { value: 'asian', label: 'Asian' },
    { value: 'british', label: 'British' },
    { value: 'caribbean', label: 'Caribbean' },
    { value: 'central-europe', label: 'Central Europe' },
    { value: 'chinese', label: 'Chinese'},
    { value: 'eastern-europe', label: 'Eastern Europe' },
    { value: 'french', label: 'French' },
    { value: 'indian', label: 'Indian' },
    { value: 'italian', label: 'Italian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'middle-eastern', label: 'Middle Eastern' },
    { value: 'nordic', label: 'Nordic' },
    { value: 'south-american', label: 'South American' },
    { value: 'south-east-asian', label: 'South East Asian' }
  ].sort(sortOptionByLabel);

  const mealTypeOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'lunch', label: 'Lunch' }
  ].sort(sortOptionByLabel);

//   <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//   <List>
//     {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//       <ListItem key={text} disablePadding>
//         <ListItemButton>
//           <ListItemIcon>
//             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//           </ListItemIcon>
//           <ListItemText primary={text} />
//         </ListItemButton>
//       </ListItem>
//     ))}
//   </List>
//   <Divider />
//   <List>
//     {['All mail', 'Trash', 'Spam'].map((text, index) => (
//       <ListItem key={text} disablePadding>
//         <ListItemButton>
//           <ListItemIcon>
//             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//           </ListItemIcon>
//           <ListItemText primary={text} />
//         </ListItemButton>
//       </ListItem>
//     ))}
//   </List>
// </Box>

  const [drawerOpen, setDrawerOpen] = useState(false);

  function Logo() {

    return (
      <header>
        <h1>Dish Planner</h1>
      </header>
    );
  }

  return (
  //  <nav className={styles.nav}>
  //   <header className={styles.LogoContainer}>
  //     <h1 className={styles.Logo}>Dish Planner</h1>
  //   </header>
  //   <ul className={styles.NavButtons}>
  //     <li><Autocomplete
  //     multiple
  //     filterSelectedOptions
  //     limitTags={2}
  //     id="tags-outlined"
  //     options={dietOptions}
  //     getOptionLabel={(option) => option.label}
  //     renderInput={(params) => (
  //       <TextField
  //         {...params}
  //         label="Diet"
  //         placeholder="Diet"
  //       />
  //     )}
  //   /></li>
  //     <li>Planner</li>
  //     <li>Export</li>
  //   </ul>
  //  </nav> 
  <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Desktop>
            <Logo />

            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => setDrawerOpen(true)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Desktop>
          
          <TabletAndBelow>
            <Logo />

            <IconButton
              size="large"
              // aria-haspopup="true"
              onClick={() => setDrawerOpen(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
          </TabletAndBelow>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          
          <Box className={styles.NavButtonsContainer} sx={{ display: { xs: 'none', md: 'flex' } }}>
            
          </Box> */}

        </Toolbar>
      </Container>
    </AppBar>
    
    <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
        
      </Box>
    </Drawer>
  </>
  )
}


export default Navbar;