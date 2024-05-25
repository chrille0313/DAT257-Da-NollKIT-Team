import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filterReducers } from '../features/api/FilterSlices';

const apiReducer = combineReducers({
  filters: combineReducers(filterReducers)
});

export const store = configureStore({
  reducer: {
    api: apiReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
