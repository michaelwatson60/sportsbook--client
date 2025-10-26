import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginThunk = createAsyncThunk('configs/login', async body => {
  const response = await axios.post('sign-in', body);

  return response;
});

export const getMeThunk = createAsyncThunk('configs/me', async () => {
  const response = await axios.get('me');
  return response;
});

export const authExtraReducers = builder => {
  builder
    .addCase(loginThunk.pending, state => {
      state.isAuthLoading = true;
    })
    .addCase(loginThunk.fulfilled, (state, { payload }) => ({
      ...state,
      isAuthLoading: false,
      isAuth: true,
      ...payload,
    }))
    .addCase(loginThunk.rejected, state => {
      state.isAuthLoading = false;
    })
    .addCase(getMeThunk.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }));
};
