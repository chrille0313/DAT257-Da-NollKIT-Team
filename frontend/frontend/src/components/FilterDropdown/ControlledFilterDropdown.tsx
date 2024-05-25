import { useAppDispatch, useAppSelector } from '../../app/hooks';
import filterSlices from '../../features/api/FilterSlices';
import { RecipeFilterName, RecipeFilters } from '../../types';
import FilterDropdown from './FilterDropdown';

export interface ControlledFilterDropdownProps {
  filterName: RecipeFilterName;
}

export default function ControlledDropdownContainer({
  filterName,
}: ControlledFilterDropdownProps) {
  const dispatch = useAppDispatch();
  const filterProps = RecipeFilters[filterName];
  const filterValue = useAppSelector((state) => state.api.filters[filterName]);
  const setFilter = filterSlices[filterName].actions.setFilter;

  return (
    <FilterDropdown
      {...filterProps}
      value={filterValue}
      onChange={(event, newValue) => dispatch(setFilter(newValue))}
    />
  );
}
