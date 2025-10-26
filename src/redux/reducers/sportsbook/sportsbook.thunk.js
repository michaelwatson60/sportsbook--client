import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import _ from 'lodash';
import { normalize } from 'normalizr';
import qs from 'qs';
import {
  getTopLeaguesIds,
  MARKETS_GROUPS,
} from '../../../constants/sports.constants';
import { groupMarkets } from '../../../helpers/sportsbook.helpers';
import { sportsSchema } from './sportsbook.normalizer';

// GET SPORTS LIST
export const getSportsThunk = createAsyncThunk(
  'sportsbook/getSports',
  async (params = {}) => {
    const response = await axios.get('/cache/client/menu', {
      params,
      paramsSerializer: params => qs.stringify(params, { skipNulls: true }),
    });

    return {
      normalizedMenu: normalize({ sports: response.sports }, sportsSchema),
      menu: response.sports,
    };
  },
);

export const getSingleEventThunk = createAsyncThunk(
  'sportsbook/getSingleEvent',
  async eid => {
    const response = await axios.get('/cache/client/events', {
      params: { eid },
      paramsSerializer: params => qs.stringify(params, { skipNulls: true }),
    });

    const marketsGroup = groupMarkets(response.markets);
    return { ...response, marketsGroup };
  },
);

export const getTreeEventsThunk = createAsyncThunk(
  'sportsbook/getTreeEvents',
  async ({ sportId, leaguesList, date }, { getState }) => {
    const { activeMarket } = getState().sportsbook.tree;
    const codesList = activeMarket && [activeMarket.code];
    const response = await Promise.all(
      leaguesList.map(ids => {
        const params = { sId: sportId };
        if (ids && ids !== 'all') {
          params.lIds = ids;
        }
        if (codesList) {
          params.mc = codesList;
        }
        if (date !== 'all') {
          params.to = dayjs(date).endOf('day').unix();
        }
        return axios.get('/sportsbook-client/events?' + qs.stringify(params), {
          paramsSerializer: params => qs.stringify(params, { skipNulls: true }),
        });
      }),
    );

    return { response, isMarketsExist: !!codesList };
  },
);

export const getTreeSingleThunk = createAsyncThunk(
  'sportsbook/getTreeSingleEvent',
  async eid => {
    const response = await axios.get('/cache/client/events', {
      params: { eid },
      paramsSerializer: params => qs.stringify(params, { skipNulls: true }),
    });
    const marketsGroup = groupMarkets(response.markets);
    return { ...response, marketsGroup };
  },
);

export const getSearchEventsThunk = createAsyncThunk(
  'sportsbook/getSearchEvents',
  async name => {
    const response = await axios.get('/cache/client/filter/events', {
      params: { search: name },
    });

    return response;
  },
);

export const sportsbookExtraReducers = builder => {
  builder
    .addCase(getSportsThunk.pending, state => {
      state.isSportsLoading = true;
    })
    .addCase(getSportsThunk.fulfilled, (state, { payload }) => {
      const { normalizedMenu, menu } = payload;
      const { leagues, countries, sports } = normalizedMenu.entities;

      const topLeagues = getTopLeaguesIds().reduce((acc, id) => {
        if (id in leagues) {
          acc.push(leagues[id]);
        }
        return acc;
      }, []);

      const sportsIds = normalizedMenu.result.sports;
      state.isSportsLoading = false;
      state.sports = menu;
      state.sportsGroups = sports;
      state.sportsIds = sportsIds;
      state.leagues = leagues;
      state.topLeagues = topLeagues;
      state.countries = countries;
    })
    .addCase(getSportsThunk.rejected, state => {
      state.isSportsLoading = false;
    })
    .addCase(getSingleEventThunk.pending, state => {
      state.isEventLoading = true;
      state.event = null;
    })
    .addCase(getSingleEventThunk.fulfilled, (state, { payload }) => {
      state.isEventLoading = false;
      state.event = payload;
    })
    .addCase(getSingleEventThunk.rejected, state => {
      state.isEventLoading = false;
    })
    .addCase(getTreeEventsThunk.pending, state => {
      state.tree.isOddsLoading = true;
    })
    .addCase(getTreeEventsThunk.fulfilled, (state, { payload, meta }) => {
      const { response, isMarketsExist } = payload;
      const { sportId } = meta.arg;
      if (!response) {
        state.tree.isLoading = false;
      } else {
        const events = [];
        const allMarkets = {};
        response.forEach(country => {
          country.markets.forEach(market => (allMarkets[market.kx] = market));
          country.events.forEach(event => {
            const groupMarkets = _.groupBy(event.markets, 'code');
            const formatedMarkets = Object.values(groupMarkets).map(group => {
              return group.reduce((acc, market) => {
                market.odds.forEach(odd => {
                  if (!odd.h && market.handicapValue) {
                    odd.h = market.handicapValue;
                  }
                });
                if (!acc.odds) {
                  acc = market;
                } else {
                  acc.odds = [...acc.odds, ...market.odds];
                }
                return acc;
              }, {});
            });
            event.countryName = event.country.name;
            event.startDate = dayjs.unix(event.unix);
            event.countryId = event.country.id;
            event.sportName = event.sport.name;
            event.sportId = event.sport.id;
            event.leagueName = event.league.name;
            event.leagueId = event.league.id;
            event.markets = formatedMarkets;
            event.info = {
              T1: event.team1,
              T2: event.team2,
            };
            events.push(event);
          });
        });

        const existGroupMarkets = {};
        let firstType = '';
        const marketsGroups = MARKETS_GROUPS[sportId]?.groups || [];

        const existMarkets = marketsGroups.reduce((acc, b) => {
          const filteredMarkets = b.markets.filter(market => {
            existGroupMarkets[market.code] = true;
            return allMarkets[market.code];
          });

          if (filteredMarkets.length) {
            if (!firstType) {
              firstType = b.name;
            }
            acc[b.name] = { ...b, markets: filteredMarkets };
          }
          return acc;
        }, {});

        const isGroupNotExist =
          !marketsGroups.length &&
          !Object.keys(existMarkets).length &&
          Object.keys(allMarkets).length;

        // ADD UNUSED MARKETS
        if (!isGroupNotExist) {
          Object.keys(allMarkets).forEach(item => {
            if (!existGroupMarkets[item]) {
              existMarkets[firstType].markets.push(allMarkets[item]);
            }
          });
        } else {
          existMarkets['Main'] = {
            code: 'MAIN',
            id: 12,
            name: 'Main',
            markets: Object.values(allMarkets),
          };
        }

        const newTree = {
          ...state.tree,
          full: response,
          events,
          isLoading: false,
          isOddsLoading: false,
          existMarkets,
        };

        if (!isMarketsExist && response[0]) {
          const incomingMarket = response[0].selectedMarkets[0];
          const currentMarket = isGroupNotExist
            ? allMarkets[incomingMarket.code]
            : MARKETS_GROUPS[sportId]?.markets[incomingMarket.code];
          if (currentMarket) {
            const { group, ...restMarket } = currentMarket;
            newTree.activeGroup = isGroupNotExist ? 'Main' : group.name;
            newTree.activeMarket = restMarket;
          }
        }

        state.tree = newTree;
      }
    })
    .addCase(getTreeEventsThunk.rejected, state => {
      // state.tree.isLoading = false;
      state.tree.isOddsLoading = false;
    })
    .addCase(getTreeSingleThunk.pending, (state, { meta }) => {
      const eventId = meta.arg;
      const eventIndex = state.tree.events.findIndex(
        item => item.id === eventId,
      );
      if (eventIndex !== -1) {
        state.tree.events[eventIndex].isSingleLoading = true;
      }
    })
    .addCase(getTreeSingleThunk.fulfilled, (state, { payload, meta }) => {
      const eventId = meta.arg;
      const eventIndex = state.tree.events.findIndex(
        item => item.id === eventId,
      );
      if (eventIndex !== -1) {
        state.tree.events[eventIndex].isSingleLoading = false;
        state.tree.events[eventIndex].singleEvent = payload;
      }
    })
    .addCase(getTreeSingleThunk.rejected, (state, { meta }) => {
      const eventId = meta.arg;
      const eventIndex = state.tree.events.findIndex(
        item => item.id === eventId,
      );
      if (eventIndex !== -1) {
        state.tree.events[eventIndex].isSingleLoading = false;
      }
    })
    .addCase(getSearchEventsThunk.pending, state => {
      state.search.events = [];
      state.search.isLoading = true;
      state.search.isOpen = true;
    })
    .addCase(getSearchEventsThunk.fulfilled, (state, { payload }) => {
      state.search.isLoading = false;
      state.search.events = payload?.leagues || [];
    })
    .addCase(getSearchEventsThunk.rejected, state => {
      state.search.isLoading = false;
    });
};
