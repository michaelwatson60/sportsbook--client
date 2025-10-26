import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import {
  formatLiveEvent,
  getFormatedLiveMarket,
  groupLiveMarkets,
} from '../../../package/helpers/utils';
import { getNormalizedLiveData } from './live.normalizer';

const initialState = {
  isLoading: true,
  events: {},
  groups: {},
  sports: {},
  sportIds: [],
  activeSportId: null,
  matchTrackerId: null,
};

export const liveSlice = createSlice({
  name: 'live',
  initialState,
  reducers: {
    setLiveEvents: (state, { payload }) => ({
      ...state,
      isLoading: false,
      ...getNormalizedLiveData(payload),
    }),
    setMatchTrackerId: (state, { payload }) => {
      state.matchTrackerId = payload;
    },
    updateLiveEvent: (state, { payload }) => {
      payload.forEach(res => {
        const { events } = cloneDeep(res);
        if (events) {
          events.forEach(event => {
            const stateEvent = state.events[event.id];

            // REMOVE EVENT
            if (event.r) {
              if (!stateEvent) {
                return;
              }

              if (state.sports[stateEvent.s]?.eventIds.length <= 1) {
                delete state.sports[stateEvent.s];
                state.sportIds = state.sportIds.filter(
                  id => id && +id !== +stateEvent.s,
                );
              } else {
                state.sports[stateEvent.s].eventIds = state.sports[
                  stateEvent.s
                ].eventIds.filter(item => item !== event.id);
              }
              if (
                state.groups[stateEvent.s][stateEvent.c][stateEvent.l]?.length >
                1
              ) {
                state.groups[stateEvent.s][stateEvent.c][stateEvent.l] =
                  state.groups[stateEvent.s][stateEvent.c][stateEvent.l].filter(
                    item => item !== event.id,
                  );
              } else {
                delete state.groups[stateEvent.s][stateEvent.c][stateEvent.l];
                if (
                  !Object.keys(state.groups[stateEvent.s][stateEvent.c]).length
                ) {
                  delete state.groups[stateEvent.s][stateEvent.c];
                  if (!Object.keys(state.groups[stateEvent.s]).length) {
                    delete state.groups[stateEvent.s];
                  }
                }
              }
              delete state.events[event.id];
              return;
            }
            // ADD NEW EVENT
            if (!stateEvent) {
              if (!event.s) {
                return;
              }
              if (!event.c) {
                event.c = '99999';
              }
              if (!event.l) {
                event.l = '99999';
              }

              if (!state.sports[event.s]) {
                state.sports[event.s] = {
                  s: event.s,
                  eventIds: [event.id],
                };
              } else {
                state.sports[event.s].eventIds.push(event.id);
              }
              if (!state.groups[event.s]) {
                state.groups[event.s] = {
                  [event.c]: {
                    [event.l]: [event.id],
                  },
                };
                state.sportIds.push(event.s);
              } else if (!state.groups[event.s][event.c]) {
                state.groups[event.s][event.c] = {
                  [event.l]: [event.id],
                };
                return;
              } else if (!state.groups[event.s][event.c][event.l]) {
                state.groups[event.s][event.c][event.l] = [event.id];
                return;
              } else {
                state.groups[event.s][event.c][event.l].push(event.id);
              }
              const { markets } = event;
              if (markets && Array.isArray(markets)) {
                formatLiveEvent(event);
              }
              state.events[event.id] = event;
              return;
            }
            // UPDATE EVENT
            const { sc, t1, t2, markets, ...restEvent } = event;

            const updatedEvent = {
              ...stateEvent,
              ...restEvent,
            };
            if (t1) {
              updatedEvent.t1 = {
                ...(updatedEvent.t1 || {}),
                ...t1,
              };
            }
            if (t2) {
              updatedEvent.t2 = {
                ...(updatedEvent.t2 || {}),
                ...t2,
              };
            }
            if (sc) {
              updatedEvent.sc = {
                ...(updatedEvent.sc || {}),
                ...sc,
              };
            }
            if (markets && Array.isArray(markets)) {
              if (!updatedEvent.marketsGroup) {
                updatedEvent.marketsGroup = {};
              }
              markets.forEach(market => {
                const marketCode =
                  market.n ||
                  Object.values(updatedEvent.marketsGroup).find(
                    item => item.key.split('|')[1] === market.key.split('|')[1],
                  )?.n ||
                  '';
                const currentMarket = updatedEvent.marketsGroup[marketCode];
                if (market.r) {
                  if (!currentMarket?.oddsGroup) {
                    return;
                  }
                  const filteredOdds = Object.values(
                    currentMarket.oddsGroup,
                  ).filter(item => !item.ref?.includes(market.key));

                  if (!filteredOdds.length) {
                    delete updatedEvent.marketsGroup[marketCode];
                    return;
                  }

                  updatedEvent.marketsGroup[marketCode] = {
                    ...updatedEvent.marketsGroup[marketCode],
                    oddsGroup: filteredOdds.reduce((acc, b) => {
                      acc[b.groupKey] = b;
                      return acc;
                    }, {}),
                  };
                  return;
                }

                const formatedMarket = getFormatedLiveMarket(market);
                if (!currentMarket) {
                  updatedEvent.marketsGroup[marketCode] = formatedMarket;
                  return;
                }

                const { odds } = formatedMarket;

                if (odds) {
                  odds.forEach(odd => {
                    const prevOdd =
                      Object.values(
                        updatedEvent.marketsGroup[marketCode].oddsGroup,
                      ).find(item => item.ref === odd.ref) || {};

                    const oddKey = odd.groupKey || `${prevOdd.n}:${prevOdd.h}`;

                    if (odd.r) {
                      delete updatedEvent.marketsGroup[marketCode].oddsGroup[
                        oddKey
                      ];

                      return;
                    }

                    if (!prevOdd) {
                      updatedEvent.marketsGroup[marketCode].oddsGroup[oddKey] =
                        odd;
                      return;
                    }
                    updatedEvent.marketsGroup[marketCode].oddsGroup[oddKey] = {
                      ...updatedEvent.marketsGroup[marketCode].oddsGroup[
                        oddKey
                      ],
                      ...odd,
                    };
                  });
                }
              });
              updatedEvent.singleMarkets = groupLiveMarkets(
                updatedEvent.marketsGroup,
              );
            }
            state.events[event.id] = updatedEvent;
          });
        }
      });
    },
    setLiveSportId: (state, { payload }) => {
      state.activeSportId = payload;
    },
    resetLive: () => initialState,
  },
});

// ACTIONS
export const {
  setLiveEvents,
  setMatchTrackerId,
  updateLiveEvent,
  setLiveSportId,
  resetLive,
} = liveSlice.actions;

// SELECTORS
export const selectIsLiveLoading = state => state.live.isLoading;
export const selectLiveEvents = state => state.live.events;
export const selectLiveSportIds = state => state.live.sportIds;
export const selectLiveSports = state => state.live.sports;
export const selectLiveGroups = state => state.live.groups;
export const selectLiveActiveSportId = state => state.live.activeSportId;
export const selectSingleLive = (state, eventId) => state.live.events[eventId];
export const selectMatchTrackerId = state => state.live.matchTrackerId;
export const selectIsLiveExist = state =>
  !!Object.keys(state.live.events)?.length;
export const selectLiveEventIds = (state, sportId) =>
  state.live.sports[sportId]?.eventIds || [];

export default liveSlice.reducer;
