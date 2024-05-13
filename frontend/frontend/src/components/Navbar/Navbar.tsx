import styles from './Navbar.module.css';
import FilterDropdown, { DropdownOption } from '../FilterDropdown';
import RangedSlider from '../RangedSlider';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Desktop, TabletAndBelow, useDesktop } from '../Responsive'
import { CalendarMonth, Download, ExpandMore } from '@mui/icons-material';
import { AppBar, TextField, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Drawer, Autocomplete, Slider, Grid} from '@mui/material';
import Logo from '../Logo';
import { sortOptionByLabel } from '../../utils';


export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [diet, setDiet] = useState<DropdownOption[]>([]);
  const [health, setHealth] = useState<DropdownOption[]>([]);
  const [cuisine, setCuisine] = useState<DropdownOption[]>([]);
  const [mealType, setMealType] = useState<DropdownOption[]>([]);

  const dietFilter = {
    label: 'Diet',
    state: diet,
    setState: setDiet,
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
    state: health,
    setState: setHealth,
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
    state: cuisine,
    setState: setCuisine,
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
    state: mealType,
    setState: setMealType,
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
          <FilterDropdown
            key={filter.label}
            label={filter.label}
            value={filter.state}
            handleChange={(event, newValue) => filter.setState(newValue)}
            options={filter.options}
          />
        ))}
        {/* <RangedSlider 
          value={timeRange}
          handleChange={(event, newValue) => setTimeRange(newValue)}
          valueLabelFormat={(value) => `${value} min`}
        /> */}
      </Box>
    );
  }

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

  );
}