import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { normalize } from 'normalizr';
import qs from 'qs';
import { groupMarkets } from '../../../helpers/sportsbook.helpers';
import { eventsSchema } from './topEvents.normalizer';

export const getTopEventsThunk = createAsyncThunk(
  'topEvents/getEvents',
  async (params = { sId: '50', limit: 10 }) => {
    const response = await axios.get('cache/client/v2/top/events', {
      params,
      paramsSerializer: params => qs.stringify(params, { skipNulls: true }),
    });

    const { entities: normalizedEvents, result } = normalize(
      { events: response },
      eventsSchema,
    );

    return {
      events: response,
      eventsIds: result.events,
      normalizedEvents,
    };
  },
);

export const getTopSingleThunk = createAsyncThunk(
  'topEvents/getSingleEvent',
  async eid => {
    const response = await axios.get('/cache/client/events', {
      params: { eid },
      paramsSerializer: params => qs.stringify(params, { skipNulls: true }),
    });
    const marketsGroup = groupMarkets(response.markets);
    return { ...response, marketsGroup };
  },
);

export const topEventsExtraReducers = builder => {
  builder
    .addCase(getTopEventsThunk.pending, state => {
      state.isEventsLoading = true;
      if (!state.topCards.length) {
        state.isCardsLoading = true;
      }
    })
    .addCase(getTopEventsThunk.fulfilled, (state, { payload }) => {
      // const formatedEvents = formatEvents(payload.events);
      state.isEventsLoading = false;
      state.events = payload.events;
      state.eventsIds = payload.eventsIds;
      state.normalizedEvents = payload.normalizedEvents;
      if (!state.topCards.length) {
        state.topCards = payload.events.slice(0, 15);
        state.isCardsLoading = false;
      }
    })
    .addCase(getTopEventsThunk.rejected, state => {
      state.isEventsLoading = false;
    })
    .addCase(getTopSingleThunk.pending, (state, { meta }) => {
      const eventId = meta.arg;
      const eventIndex = state.events.findIndex(item => item.id === eventId);
      if (eventIndex !== -1) {
        state.events[eventIndex].isSingleLoading = true;
      }
    })
    .addCase(getTopSingleThunk.fulfilled, (state, { payload, meta }) => {
      const eventId = meta.arg;
      const eventIndex = state.events.findIndex(item => item.id === eventId);
      if (eventIndex !== -1) {
        state.events[eventIndex].isSingleLoading = false;
        state.events[eventIndex].singleEvent = payload;
      }
    })
    .addCase(getTopSingleThunk.rejected, (state, { meta }) => {
      const eventId = meta.arg;
      const eventIndex = state.events.findIndex(item => item.id === eventId);
      if (eventIndex !== -1) {
        state.events[eventIndex].isSingleLoading = false;
      }
    });
};
