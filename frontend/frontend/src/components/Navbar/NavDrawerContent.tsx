import { Box } from '@mui/material';
import { RecipeFilterName, RecipeFilters } from '../../types';
import { ControlledFilterDropdown } from '../FilterDropdown';
import styles from './Navbar.module.css';

export default function NavDrawerContent() {
  return (
    <Box role="presentation" className={styles.NavDrawerContent}>
      <h2>Filters</h2>
      {(Object.keys(RecipeFilters) as RecipeFilterName[]).map((filterName) => (
        <ControlledFilterDropdown key={filterName} filterName={filterName} />
      ))}
      {/* <RangedSlider 
        value={timeRange}
        handleChange={(event, newValue) => setTimeRange(newValue)}
        valueLabelFormat={(value) => `${value} min`}
      /> */}
    </Box>
  );
}
