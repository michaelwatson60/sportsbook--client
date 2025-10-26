import { createSelector } from '@reduxjs/toolkit';

export const selectSport = state => state.sport;

export const selectMenu = state => state.sport.menu;

export const selectIsPendingRequest = requestId =>
  createSelector([state => state.sport.pendingRequestIds], pendingRequestIds =>
    pendingRequestIds?.includes(requestId),
  );

export const selectSportNameById = (state, id) =>
  state.sport.sports?.[id]?.name;

export const selectCountryNameById = (state, id) =>
  state.sport.countries?.[id]?.name;

export const selectLeagueNameById = (state, id) =>
  state.sport.leagues?.[id]?.name;

export const selectTopEventsCount = state => state.sport.menu?.top || 0;

export const selectEvents = state => state.sport.events;

export const selectTopEventsBySportId = ({ sportId }) =>
  createSelector(
    [selectEvents],
    events =>
      events &&
      Object.values(events).filter(
        event => event.top === 1 && event.sport?.id === sportId,
      ),
  );
export const selectUpcomingEventsBySportId = ({ sportId }) =>
  createSelector(
    [selectEvents],
    events =>
      events &&
      Object.values(events).filter(
        event => event.upcoming === 1 && event.sport?.id === sportId,
      ),
  );
export const selectLiveEventsBySportId = ({ sportId }) =>
  createSelector(
    [selectEvents],
    events =>
      events &&
      Object.values(events).filter(
        event => event.isLive && event.sport?.id === sportId,
      ),
  );
export const selectEventById = (state, id) => state.sport?.events?.[id];

export const selectEventMarkets = (state, eventId) =>
  state.sport?.eventMarkets?.[eventId];

export const selectEventScore = (state, eventId) =>
  state.sport?.eventsStats?.[eventId]?.sc;

export const selectEventPeriod = (state, eventId) =>
  state.sport?.eventsStats?.[eventId]?.pd || 0;

export const selectEventTime = (state, eventId) =>
  state.sport?.eventsStats?.[eventId]?.tm;

export const selectEventStatus = (state, eventId) =>
  state.sport.eventsStats?.[eventId]?.pn;

export const selectPrematchEventsBySportId = sportId =>
  createSelector(
    [selectEvents],
    events =>
      events &&
      Object.values(events).filter(event => event.sport?.id === sportId),
  );
export const selectPrematchEventsByLeagues = leaguesIds =>
  createSelector(
    [selectEvents],
    events =>
      events &&
      Object.values(events).filter(
        event => !event?.isLive && leaguesIds.includes(event.league?.id),
      ),
  );
export const selectLiveEventsByLeagues = leaguesIds =>
  createSelector(
    [selectEvents],
    events =>
      events &&
      Object.values(events).filter(
        event => event.isLive && leaguesIds.includes(event.league?.id),
      ),
  );
export const selectPrice = (state, refId) => {
  const [eventId, marketCode, marketHandicap] = refId?.split('|') || [];
  return state.sport.eventMarkets[eventId]
    ?.find(
      market => market.code === marketCode && marketHandicap === marketHandicap,
    )
    ?.prices?.find(price => price.ref === refId);
};

export const selectSearchEvents = createSelector(
  [state => state.sport.searchEventsIds, state => state.sport.events],
  (searchEventsIds, events) => {
    return searchEventsIds.map(id => events[id]).filter(Boolean);
  },
);
