import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropdownOption } from '../../components/FilterDropdown';
import { RecipeFilters, RecipeFilterName } from '../../types';

function createFilterSlice(filterName: string) {
  return createSlice({
    name: filterName,
    initialState: [] as DropdownOption[],
    reducers: {
      setFilter: (state, action: PayloadAction<DropdownOption[]>) =>
        action.payload
    }
  });
}

const filterNames = Object.keys(RecipeFilters);

const filterSlices = Object.fromEntries(
  filterNames.map((filterName) => [filterName, createFilterSlice(filterName)])
) as Record<RecipeFilterName, ReturnType<typeof createFilterSlice>>;

export const filterReducers = Object.fromEntries(
  Object.entries(filterSlices).map(([filterName, slice]) => [
    filterName,
    slice.reducer
  ])
) as Record<RecipeFilterName, ReturnType<typeof createFilterSlice>['reducer']>;

export const filterActions = Object.fromEntries(
  Object.entries(filterSlices).map(([filterName, slice]) => [
    filterName,
    slice.actions
  ])
) as Record<RecipeFilterName, ReturnType<typeof createFilterSlice>['actions']>;

export default filterSlices;
