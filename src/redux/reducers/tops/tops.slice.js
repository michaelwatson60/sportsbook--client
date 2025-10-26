import { createSlice } from '@reduxjs/toolkit';
import { upcomingExtraReducers } from './tops.thunk';

const initialState = {
  isLoading: true,
  activeSportId: 50,
  events: [],
};

export const topsSlice = createSlice({
  name: 'tops',
  initialState,
  reducers: {
    toggleTopsSport: (state, { payload }) => {
      state.activeSportId = payload;
    },
    resetTopsSlice: () => initialState,
  },
  extraReducers: upcomingExtraReducers,
});

// ACTIONS
export const { toggleTopsSport, resetTopsSlice } = topsSlice.actions;

// SELECTORS
export const selectIsTopsLoading = state => state.tops.isLoading;
export const selectTopsEvents = state => state.tops.events;
export const selectTopsActiveSportId = state => state.tops.activeSportId;

export default topsSlice.reducer;
