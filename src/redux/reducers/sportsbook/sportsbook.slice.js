import { createSelector, createSlice } from '@reduxjs/toolkit';
import { sportsbookExtraReducers } from './sportsbook.thunk';

const initialTree = {
  requestCount: 0,
  isLoading: true,
  isOddsLoading: true,
  group: {},
  leagues: [],
  groupByTime: {},
  date: 'all',
  events: [],
  existMarkets: {},
  activeGroup: null,
  activeMarket: null,
};

const initialSearch = {
  isOpen: false,
  isLoading: false,
  events: [],
};

const initialState = {
  isSportsLoading: true,
  sports: [],
  sportsGroups: {},
  sportsIds: [],
  countries: {},
  leagues: {},
  topLeagues: [],
  tree: initialTree,
  event: null,
  isEventLoading: true,
  search: initialSearch,
  favouriteMarkets: {},
};

export const sportsbookSlice = createSlice({
  name: 'sportsbook',
  initialState,
  reducers: {
    toggleBurger: (state, { payload }) => {
      state.isBurgerActive = payload;
    },
    setTreeDate: (state, { payload }) => {
      state.tree.date = payload;
    },
    setTreeGroup: (state, { payload }) => {
      // TODO remove
      if (!payload) {
        state.tree.isLoading = false;
      }
      if (state.tree.activeGroup !== payload) {
        state.tree.activeGroup = payload;
        state.tree.activeMarket = state.tree.existMarkets[payload].markets[0];
        state.tree.requestCount++;
      }
    },
    setTreeMarket: (state, { payload }) => {
      state.tree.activeMarket = payload;
      state.tree.requestCount++;
    },
    resetTreeGroup: state => {
      state.tree.activeGroup = null;
      state.tree.activeMarket = null;
      state.tree.existMarkets = {};
    },
    resetTree: (state, { payload }) => {
      state.tree = payload?.isDate
        ? { ...initialTree, date: state.tree.date }
        : initialTree;
    },
    resetSearchEvents: state => {
      state.search = initialSearch;
    },
    toggleFavouriteMarket: (state, { payload }) => {
      if (payload in state.favouriteMarkets) {
        delete state.favouriteMarkets[payload];
      } else {
        state.favouriteMarkets[payload] = true;
      }
    },
    resetSportsbook: () => initialState,
  },
  extraReducers: sportsbookExtraReducers,
});

// ACTIONS
export const {
  toggleBurger,
  setTreeDate,
  setTreeGroup,
  setTreeMarket,
  resetTreeGroup,
  resetTree,
  resetSearchEvents,
  toggleFavouriteMarket,
  resetSportsbook,
} = sportsbookSlice.actions;

// SELECTORS
export const selectIsSportsLoading = state => state.sportsbook.isSportsLoading;
export const selectSports = state => state.sportsbook.sports;
export const selectLeagues = state => state.sportsbook.leagues;
export const selectSportsGroups = state => state.sportsbook.sportsGroups;
export const selectSportsCountries = state => state.sportsbook.countries;
export const selectTopLeagues = state => state.sportsbook.topLeagues;
export const selectSearchEvents = state => state.sportsbook.search;
export const selectTree = state => state.sportsbook.tree;
export const selectTreeDate = state => state.sportsbook.tree.date;
export const selectTreeGroup = state => state.sportsbook.tree.activeGroup;
export const selectTreeMarket = state => state.sportsbook.tree.activeMarket;
export const selectTreeRequestCount = state =>
  state.sportsbook.tree.requestCount;
export const selectTreeExistMarkets = state =>
  state.sportsbook.tree.existMarkets;
export const selectSingleEvent = state => state.sportsbook.event;
export const selectIsSingleEventLoading = state =>
  state.sportsbook.isEventLoading;
export const selectFavouriteMarkets = state =>
  state.sportsbook.favouriteMarkets;

// RESELECT
export const selectTop5Sports = createSelector([selectSports], sports =>
  Object.values(sports).slice(0, 5),
);

export default sportsbookSlice.reducer;
