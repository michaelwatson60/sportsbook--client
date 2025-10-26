import { createSlice } from '@reduxjs/toolkit';
import { deepMergeWithArraySupport } from '@/socket/updateData.js';

const initialState = {
  marketTemplatesBySport: {},
  pendingRequestIds: [],
  favouriteEventsIds: [],
  prematchMenu: {},
  searchEventsIds: [],
  events: {},
  teams: {},
  eventMarkets: {},
  eventsMeta: {},
  eventsStats: {},
};

const normalizeData = list => {
  return list.reduce((acc, item) => {
    acc[item.id] = item;

    return acc;
  }, {});
};

const sportSlice = createSlice({
  name: 'sportSlice',
  initialState,
  reducers: {
    initData(state, action) {
      const { sports, countries, leagues, ...rest } = action.payload;

      Object.assign(state, {
        ...rest,
        sports: normalizeData(sports),
        countries: normalizeData(countries),
        leagues: normalizeData(leagues),
      });
    },
    addPendingRequestId(state, action) {
      if (action.payload) {
        state.pendingRequestIds.push(action.payload);
      }
    },
    removePendingRequestId(state, action) {
      if (action.payload) {
        state.pendingRequestIds = state.pendingRequestIds.filter(
          item => item !== action.payload,
        );
      }
    },
    emptyPendingRequestIds(state) {
      state.pendingRequestIds = [];
    },
    toggleFavoriteEvents(state, action) {
      if (state.favouriteEventsIds.includes(+action.payload)) {
        state.favouriteEventsIds = state.favouriteEventsIds.filter(
          item => item !== +action.payload,
        );
      } else {
        state.favouriteEventsIds.push(+action.payload);
      }
    },
    setData(state, action) {
      const { data, key, requestId } = action.payload;

      if (requestId && state.pendingRequestIds.includes(requestId)) {
        state.pendingRequestIds = state.pendingRequestIds.filter(
          item => item !== requestId,
        );
      }

      if (key === 'searchEventsIds') {
        state.searchEventsIds = data.map(event => event.id);
      } else if (key === 'prematchMenu') {
        state.prematchMenu = data;
      } else if (key === 'menu') {
        state[key] = deepMergeWithArraySupport(state[key] || {}, data, true);
      } else if (key === 'events') {
        updateEvents({ state, data });
      } else if (key === 'teams') {
        updateTeams({ state, teams: data });
      } else {
        const normalizedData = normalizeData(data);

        state[key] = deepMergeWithArraySupport(
          state[key] || {},
          normalizedData,
        );
      }
    },
    setMarketTemplatesBySport(state, action) {
      state.marketTemplatesBySport[action.payload.sportId] =
        action.payload.data;
    },
  },
  extraReducers: () => {},
});

const { reducer, actions } = sportSlice;

export const sportActions = actions;

export default reducer;

function updateTeams({ state, teams }) {
  teams.forEach(team => {
    if (team.r === 1) {
      delete state.teams[team.id];
    } else if (team.f === 1) {
      state.teams[team.id] = team;
    } else {
      state.teams[team.id] = {
        ...state.teams[team.id],
        ...team,
      };
    }
  });
}

function updateEvents({ state, data }) {
  data.forEach(event => {
    if (event.r === 1) {
      delete state.events[event.id];

      delete state.eventMarkets[event.id];

      delete state.eventsMeta[event.id];

      delete state.eventsStats[event.id];
    } else if (event.f === 1) {
      updateEvent({ state, event, forceUpdate: true });
    } else {
      updateEvent({ state, event });
    }
  });
}

function updateEvent({ state, event, forceUpdate }) {
  Object.keys(event).forEach(key => {
    if (key === 'markets') {
      updateEventMarkets({
        state,
        eventId: event.id,
        newMarkets: event.markets,
        eventBlocked: event.blocked,
        forceUpdate,
      });
    } else if (key === 'stats' && event.stats) {
      updateEventStats({
        state,
        eventId: event.id,
        newStats: event.stats,
        forceUpdate,
      });
    } else if (key === 'meta') {
      updateEventMeta({
        state,
        eventId: event.id,
        newMeta: event.meta,
        forceUpdate,
      });
    } else {
      if (state.events[event.id]) {
        if (state.events[event.id][key] !== event[key]) {
          state.events[event.id][key] = event[key];
        }
      } else {
        state.events[event.id] = {
          [key]: event[key],
        };
      }
    }
  });
}

function updateEventMeta({ state, eventId, newMeta, forceUpdate }) {
  if (forceUpdate || !state.eventsMeta[eventId]) {
    state.eventsMeta[eventId] = newMeta;
  } else {
    Object.keys(newMeta).forEach(key => {
      state.eventsMeta[eventId][key] = newMeta[key];
    });
  }
}

function updateEventStats({ state, eventId, newStats, forceUpdate }) {
  if (forceUpdate || !state.eventsStats[eventId]) {
    state.eventsStats[eventId] = newStats;
  } else if (newStats) {
    state.eventsStats[eventId] = mergeDeep(
      state.eventsStats[eventId] || {},
      newStats,
    );
  }
}

const generatePrices = ({
  prices,
  market,
  eventId,
  lastPrices,
  marketBlocked,
  eventBlocked,
}) => {
  let data = [...(lastPrices ? lastPrices : [])];

  prices.forEach(price => {
    if (price.r) {
      data = data.filter(item => item.code !== price.code);
    } else {
      const index = data.findIndex(item => item.code === price.code);

      if (index < 0) {
        data.push({
          ...price,
          marketBlocked,
          eventBlocked,
          h: market.handicap,
          param: market.param,
          name: price.code,
          ref: `${eventId}|${market.code}|${market.handicap}|${market.param}|${price.code}`,
        });
      } else {
        data[index] = {
          ...data[index],
          ...price,
          lastValue: price.rate ? data[index]?.rate : data[index].lastValue,
          marketBlocked,
          eventBlocked,
          h: market.handicap,
          param: market.param,
          name: price.code,
          ref: `${eventId}|${market.code}|${market.handicap}|${market.param}|${price.code}`,
        };
      }
    }
  });

  return data;
};

function updateEventMarkets({
  state,
  eventId,
  newMarkets,
  eventBlocked,
  forceUpdate,
}) {
  if (!state.eventMarkets[eventId] || forceUpdate) {
    state.eventMarkets[eventId] = newMarkets.map(market => ({
      ...market,
      prices: generatePrices({
        eventId,
        market,
        marketBlocked: market.blocked,
        eventBlocked,
        prices: market.prices || [],
      }),
    }));
  } else {
    newMarkets.forEach(market => {
      const index = state.eventMarkets[eventId]?.findIndex(
        exMarket => exMarket.key === market.key,
      );

      if (market.r) {
        state.eventMarkets[eventId] = state.eventMarkets[eventId].filter(
          item => item.key !== market.key,
        );
      } else if (index >= 0) {
        state.eventMarkets[eventId][index] = {
          ...state.eventMarkets[eventId][index],
          prices: generatePrices({
            eventId,
            market,
            marketBlocked: market.blocked,
            eventBlocked,
            prices: market.prices || [],
            lastPrices: state.eventMarkets[eventId][index]?.prices || [],
          }),
        };
      } else {
        state.eventMarkets[eventId].push({
          ...market,
          prices: generatePrices({
            eventId,
            market,
            marketBlocked: market.blocked,
            eventBlocked,
            prices: market.prices || [],
            lastPrices: [],
          }),
        });
      }
    });
  }
}

function mergeDeep(target, source) {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      target[key] = mergeDeep(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }

  return target;
}
