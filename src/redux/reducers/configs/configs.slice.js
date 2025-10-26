import { createSelector, createSlice } from '@reduxjs/toolkit';
import { THEMES } from '../../../providers/ThemProvider';
// import persistReducer from 'redux-persist/es/persistReducer';
// import storage from 'redux-persist/lib/storage';
import { configsExtraReducers } from './configs.thunk';

const initialState = {
  isConfigsExist: false,
  languages: null,
  theme: THEMES.DARK,
  LMTI: '',
  sportBonus: false,
  settings: null,
  sportsbookSettingsLoading: false,
};

export const configsSlice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    resetConfigs: () => initialState,
  },
  extraReducers: configsExtraReducers,
});

// ACTIONS
export const { setToken, resetConfigs } = configsSlice.actions;

// SELECTORS
export const selectSupportedLanguages = state => state.configs.languages;
export const selectIsConfigsExist = state => state.configs.isConfigsExist;
export const selectTheme = state => state.configs.theme;
export const selectColors = state => state.configs.website.theme;
export const selectTrackerKey = state => state.configs.LMTI;
export const selectIsSportBonusAvailable = state => state.configs.sportBonus;
export const selectSportsbookSettings = state => state.configs.settings;
export const selectBonus365 = createSelector(
  [selectSportsbookSettings],
  settings => settings?.bonus365,
);
// const persistConfig = {
//   key: 'configs',
//   version: 1,
//   storage,
// };

export default configsSlice.reducer;
