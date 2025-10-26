import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePopups: [],
  popupsProps: {},
};

export const popupsSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    openPopup: (state, { payload }) => {
      const { id, ...props } = payload;
      if (!state.activePopups.includes(id)) {
        state.activePopups.push(id);
        if (Object.keys(props).length) {
          state.popupsProps[id] = props;
        }
      }
    },
    closePopup: (state, { payload }) => {
      state.activePopups = state.activePopups.filter(
        popup => popup !== payload,
      );
      if (state.popupsProps[payload]) {
        delete state.popupsProps[payload];
      }
    },
    resetPopupsSlice: () => initialState,
  },
});

// ACTIONS
export const { openPopup, closePopup, resetPopupsSlice } = popupsSlice.actions;

// SELECTORS
export const selectActivePopups = state => state.popups.activePopups;
export const selectPopupsProps = state => state.popups.popupsProps;

export default popupsSlice.reducer;
