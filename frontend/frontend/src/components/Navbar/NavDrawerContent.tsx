import { Box } from "@mui/material";
import styles from './Navbar.module.css';
import FilterDropdown, { DropdownOption, FilterDropdownProps } from "../FilterDropdown";
import { RecipeFilters, RecipeFilterName  } from "../../types";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import filterSlices from "../../features/api/FilterSlices";


const FilterDropdownContainer = ({filterName}: {filterName: RecipeFilterName}) => {
  const dispatch = useAppDispatch();
  const filterProps = RecipeFilters[filterName];
  const filterValue = useAppSelector(state => state.api.filters[filterName]);
  const setFilter = filterSlices[filterName].actions.setFilter;

  return (
    <FilterDropdown
      {...filterProps}
      value={filterValue}
      onChange={(event, newValue) => dispatch(setFilter(newValue))}
    />
  );
}

export default function NavDrawerContent() {
  return (
    <Box role="presentation" className={styles.NavDrawerContent}>
      {
        (Object.keys(RecipeFilters) as RecipeFilterName[]).map(filterName =>
          <FilterDropdownContainer key={filterName} filterName={filterName} />
        )
      }
      {/* <RangedSlider 
        value={timeRange}
        handleChange={(event, newValue) => setTimeRange(newValue)}
        valueLabelFormat={(value) => `${value} min`}
      /> */}
    </Box>
  );
}