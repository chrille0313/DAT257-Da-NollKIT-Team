import { Box } from "@mui/material";
import styles from './Navbar.module.css';
import FilterDropdown, { DropdownOption, FilterDropdownProps } from "../FilterDropdown";
import { RecipeFilters, RecipeFilterName  } from "../../types";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import filters from "../../features/api/FilterSlices";

export default function NavDrawerContent() {
  const dispatch = useAppDispatch();
  const allFilters = useAppSelector(state => state.api.filters);

  const createFilterDropdown = (filterName: RecipeFilterName) => {
    const filterProps = RecipeFilters[filterName];
    const filterValue = allFilters[filterName];
    const setFilter = filters[filterName].actions.setFilter;

    return (
      <FilterDropdown
        key={filterName}
        {...filterProps}
        value={filterValue}
        onChange={(event, newValue) => dispatch(setFilter(newValue))}
      />
    );
  };

  return (
    <Box role="presentation" className={styles.NavDrawerContent}>
      {
        (Object.keys(RecipeFilters) as RecipeFilterName[]).map(createFilterDropdown)
      }
      {/* <RangedSlider 
        value={timeRange}
        handleChange={(event, newValue) => setTimeRange(newValue)}
        valueLabelFormat={(value) => `${value} min`}
      /> */}
    </Box>
  );
}