import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { normalize } from 'normalizr';
import qs from 'qs';
import { groupMarkets } from '../../../helpers/sportsbook.helpers';
import { eventsSchema } from './upcoming.normalizer';

export const getUpcomingEventsThunk = createAsyncThunk(
  'upcoming/getEvents',
  async (params = { sId: 'others', limit: 10 }) => {
    const response = await axios.get('cache/client/upcoming-events', {
      params,
      paramsSerializer: params => qs.stringify(params, { skipNulls: true }),
    });

    const { entities: normalizedEvents, result } = normalize(
      { events: response.events },
      eventsSchema,
    );

    return {
      events: response.events,
      eventsIds: result.events,
      normalizedEvents,
    };
  },
);

export const getUpcomingSingleThunk = createAsyncThunk(
  'upcoming/getSingleEvent',
  async eid => {
    const response = await axios.get('/cache/client/events', {
      params: { eid },
      paramsSerializer: params => qs.stringify(params, { skipNulls: true }),
    });
    const marketsGroup = groupMarkets(response.markets);
    return { ...response, marketsGroup };
  },
);

export const upcomingExtraReducers = builder => {
  builder
    .addCase(getUpcomingEventsThunk.pending, state => {
      state.isEventsLoading = true;
    })
    .addCase(getUpcomingEventsThunk.fulfilled, (state, { payload }) => {
      // const formatedEvents = formatEvents(payload.events);
      state.isEventsLoading = false;
      state.events = payload.events;
      state.eventsIds = payload.eventsIds;
      state.normalizedEvents = payload.normalizedEvents;
    })
    .addCase(getUpcomingEventsThunk.rejected, state => {
      state.isEventsLoading = false;
    })
    .addCase(getUpcomingSingleThunk.pending, (state, { meta }) => {
      const eventId = meta.arg;
      const eventIndex = state.events.findIndex(item => item.id === eventId);
      if (eventIndex !== -1) {
        state.events[eventIndex].isSingleLoading = true;
      }
    })
    .addCase(getUpcomingSingleThunk.fulfilled, (state, { payload, meta }) => {
      const eventId = meta.arg;
      const eventIndex = state.events.findIndex(item => item.id === eventId);
      if (eventIndex !== -1) {
        state.events[eventIndex].isSingleLoading = false;
        state.events[eventIndex].singleEvent = payload;
      }
    })
    .addCase(getUpcomingSingleThunk.rejected, (state, { meta }) => {
      const eventId = meta.arg;
      const eventIndex = state.events.findIndex(item => item.id === eventId);
      if (eventIndex !== -1) {
        state.events[eventIndex].isSingleLoading = false;
      }
    });
};
