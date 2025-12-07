import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { authExtraReducers } from './auth.thunk';

const initialState = {
  isAuth: false,
  accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsInVzZXJuYW1lIjoidGx0LXRlc3QiLCJzaWduIjowLCJwcmVmaXgiOiJndGIiLCJpYXQiOjE3NjUxMDgxMDIsImV4cCI6MTc2NTE5NDUwMn0.S4fMmERHztanv_KXtsxF3uATnKdla8o32bfdt_Ahyo4`,
  currency: '',
  balance: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }) => ({
      ...state,
      isAuth: true,
      ...payload,
    }),
    updateBalance: (state, { payload }) => {
      state.balance = payload;
    },
    resetAuth: () => initialState,
  },
  extraReducers: authExtraReducers,
});

// ACTIONS
export const { setToken, updateBalance, resetAuth } = authSlice.actions;

// SELECTORS
export const selectIsAuth = state => state.auth.isAuth;
export const selectToken = state => state.auth.token;
export const selectCurrency = state => state.auth.currency;
export const selectBalance = state => state.auth.balance;

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
};

export default persistReducer(persistConfig, authSlice.reducer);
