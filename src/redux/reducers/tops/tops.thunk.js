import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';
import { formatEvents } from './tops.normalizer';

export const getTopsEventsThunk = createAsyncThunk(
  'tops/getEvents',
  async (params = { sId: 'others', limit: 10 }) => {
    const response = await axios.get('cache/client/upcoming-events', {
      params,
      paramsSerializer: params => qs.stringify(params, { skipNulls: true }),
    });

    return response.events;
  },
);

export const topsExtraReducers = builder => {
  builder
    .addCase(getTopsEventsThunk.pending, state => {
      state.isLoading = true;
    })
    .addCase(getTopsEventsThunk.fulfilled, (state, { payload }) => {
      const formatedEvents = formatEvents(payload);
      state.isLoading = false;
      state.events = formatedEvents;
    })
    .addCase(getTopsEventsThunk.rejected, state => {
      state.isLoading = false;
    });
};
