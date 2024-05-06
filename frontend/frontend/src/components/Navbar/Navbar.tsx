import styles from './Navbar.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Desktop, TabletAndBelow, useDesktop } from '../Responsive'
import { CalendarMonth, Download, ExpandMore } from '@mui/icons-material';
import { AppBar, TextField, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Drawer, Autocomplete} from '@mui/material';


export default function Navbar() {
  function sortOptionByLabel(a: any, b: any) {
    const labelA = a.label!.toString();
    const labelB = b.label!.toString();
    return labelA.localeCompare(labelB);
  }

  const dietFilter = {
    label: 'Diet',
    options: [
      { value: 'balanced', label: 'Balanced' },
      { value: 'high-fiber', label: 'High Fiber' },
      { value: 'high-protein', label: 'High Protein' },
      { value: 'low-carb', label: 'Low Carb' },
      { value: 'low-fat', label: 'Low Fat' },
      { value: 'low-sodium', label: 'Low Sodium' }
    ].sort(sortOptionByLabel)
  }

  const healthFilter = {
    label: 'Health',
    options: [
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
  }

  const cuisineFilter = {
    label: 'Cuisine',
    options: [
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
    ].sort(sortOptionByLabel)
  }

  const mealTypeFilter = {
    label: 'Meal Type',
    options: [
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'dinner', label: 'Dinner' },
      { value: 'lunch', label: 'Lunch' }
    ].sort(sortOptionByLabel)
  }

  const filters = [dietFilter, healthFilter, cuisineFilter, mealTypeFilter]

  function NavDrawerContent() {
    return (
      <Box role="presentation" className={styles.NavDrawerContent}>
        {filters.map((filter) => (
          <Autocomplete
            id="tags-outlined"
            multiple
            filterSelectedOptions
            limitTags={2}
            options={filter.options}
            renderInput={(params) => (
              <TextField
                {...params}
                label={filter.label}
              />
            )}
          />
        ))}
      </Box>
    );
  }

  const [drawerOpen, setDrawerOpen] = useState(false);

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  function Logo() {
    return (
      <header>
        <h1>Dish Planner</h1>
      </header>
    );
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
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </TabletAndBelow>
        </Toolbar>
      </Container>
    </AppBar>
    
    <Drawer open={drawerOpen} anchor={useDesktop() ? 'top' : 'left'} onClose={() => setDrawerOpen(false)}>
      <Toolbar /> {/* Add spacing from the navbar */}
      <NavDrawerContent />
    </Drawer>
  </>
  )
}