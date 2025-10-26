import { createSlice } from '@reduxjs/toolkit';
import { upcomingExtraReducers } from './upcoming.thunk';

const initialState = {
  isEventsLoading: true,
  activeSportId: 50,
  events: [],
};

export const upcomingSlice = createSlice({
  name: 'upcoming',
  initialState,
  reducers: {
    toggleUpcomingSport: (state, { payload }) => {
      state.activeSportId = payload;
    },
    resetUpcomingSlice: () => initialState,
  },
  extraReducers: upcomingExtraReducers,
});

// ACTIONS
export const { toggleUpcomingSport, resetUpcomingSlice } =
  upcomingSlice.actions;

// SELECTORS
export const selectIsUpcomingLoading = state => state.upcoming.isEventsLoading;
export const selectUpcomingEvents = state => state.upcoming.events;
export const selectUpcomingActiveSportId = state =>
  state.upcoming.activeSportId;

export default upcomingSlice.reducer;
