import { createSlice } from '@reduxjs/toolkit';
import { topEventsExtraReducers } from './topEvents.thunk';

const initialState = {
  isEventsLoading: true,
  isCardsLoading: true,
  activeSportId: 50,
  events: [],
  topCards: [],
};

export const topEventsSlice = createSlice({
  name: 'topEvents',
  initialState,
  reducers: {
    toggleTopEventsSport: (state, { payload }) => {
      state.activeSportId = payload;
    },
    resetTopEventsSlice: () => initialState,
  },
  extraReducers: topEventsExtraReducers,
});

// ACTIONS
export const { toggleTopEventsSport, resetTopEventsSlice } =
  topEventsSlice.actions;

// SELECTORS
export const selectIsTopEventsLoading = state =>
  state.topEvents.isEventsLoading;
export const selectIsTopCardsLoading = state => state.topEvents.isCardsLoading;
export const selectTopEvents = state => state.topEvents.events;
export const selectTopCards = state => state.topEvents.topCards;
export const selectTopEventsActiveSportId = state =>
  state.topEvents.activeSportId;

export default topEventsSlice.reducer;
