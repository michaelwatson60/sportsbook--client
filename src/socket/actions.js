import { SPORT_CONSTANTS } from '@/socket/constants.js';
import { sendSocketMessage } from '@/socket/helper.js';
import { uniq } from 'lodash';
import { marketsMapper } from '@/helpers/marketMapper';

const SOCKET_ACTION_TYPES = {
  SUBSCRIBE_TO_EVENTS: 'subscribeToEvents',
  SUBSCRIBE_TO_LEAGUES: 'subscribeToLeagues',
  SUBSCRIBE_TO_UPCOMING_EVENTS: 'subscribeToUpcomingEvents',
  SUBSCRIBE_TO_TOP_EVENTS: 'subscribeToTopEvents',
  SUBSCRIBE_TO_SPORT: 'subscribeToSports',
  SUBSCRIBE_TO_SEARCH: 'searchEvents',
};

const { SPORT_TYPES } = SPORT_CONSTANTS;

function createSocketActions() {
  let searchValue = '';
  const singleEventsData = {};
  let leaguesData = {
    [SPORT_TYPES.prematch]: {},
    [SPORT_TYPES.live]: {},
    [SPORT_TYPES.all]: {},
  };

  let upcomingEventsData = null;
  const topEventsData = {};

  const socketSubscribeToEvents = requestId => {
    const eventIds = [];
    Object.values(singleEventsData)
      .flat()
      .forEach(eventId => {
        if (!eventIds.includes(eventId)) {
          eventIds.push(eventId);
        }
      });

    sendSocketMessage({
      message: {
        action: SOCKET_ACTION_TYPES.SUBSCRIBE_TO_EVENTS,
        payload: {
          eventIds,
        },
        requestId,
      },
    });
  };
  const socketSubscribeLeagues = requestId => {
    function mergeLeagues(menu) {
      const merged = {};

      // Step 1: collect all leagues by type and id
      for (const [type, ids] of Object.entries(menu)) {
        for (const [id, codes] of Object.entries(ids)) {
          if (!merged[id]) {
            merged[id] = { prematch: null, live: null, all: null };
          }

          if (Number(type) === SPORT_TYPES.prematch) {
            merged[id].prematch = codes;
          }

          if (Number(type) === SPORT_TYPES.live) {
            merged[id].live = codes;
          }

          if (Number(type) === SPORT_TYPES.all) {
            merged[id].all = codes;
          }
        }
      }

      // Step 2: prepare final merged array
      const finalResult = [];

      for (const [id, { prematch, live, all }] of Object.entries(merged)) {
        if (all) {
          const mergedCodes = [
            ...new Set([...(all || []), ...(prematch || []), ...(live || [])]),
          ];
          finalResult.push({
            type: SPORT_TYPES.all,
            id: Number(id),
            codes: mergedCodes,
          });
        } else if (prematch && live) {
          finalResult.push({
            type: SPORT_TYPES.all,
            id: Number(id),
            codes: [...new Set([...prematch, ...live])],
          });
        } else {
          if (prematch) {
            finalResult.push({
              type: SPORT_TYPES.prematch,
              id: Number(id),
              codes: prematch,
            });
          }

          if (live) {
            finalResult.push({
              type: SPORT_TYPES.live,
              id: Number(id),
              codes: live,
            });
          }
        }
      }

      return finalResult;
    }

    const result = mergeLeagues(leaguesData);

    sendSocketMessage({
      message: {
        action: SOCKET_ACTION_TYPES.SUBSCRIBE_TO_LEAGUES,
        payload: { leagues: result },
        requestId,
      },
    });
  };
  const socketSubscribeTopEvents = requestId => {
    if (Object.keys(topEventsData).length) {
      const sports = {};

      Object.values(topEventsData).forEach(item => {
        const { sportId } = item;
        if (!sports[sportId]) {
          sports[sportId] = {
            id: item.sportId,
            codes: item.codes,
            limit: item.limit,
          };
        } else {
          sports[sportId].codes = uniq([
            ...(sports[sportId].codes || []),
            ...(sports[sportId].codes || []),
          ]);
        }
      });

      sendSocketMessage({
        message: {
          action: SOCKET_ACTION_TYPES.SUBSCRIBE_TO_TOP_EVENTS,
          payload: {
            v2: 1,
            sports: Object.values(sports),
          },
          requestId,
        },
      });
    } else {
      sendSocketMessage({
        message: {
          action: SOCKET_ACTION_TYPES.SUBSCRIBE_TO_TOP_EVENTS,
          payload: {
            v2: 1,
            sports: [],
          },
          requestId,
        },
      });
    }
  };
  const socketSubscribeUpcomingEvents = requestId => {
    if (upcomingEventsData) {
      sendSocketMessage({
        message: {
          action: SOCKET_ACTION_TYPES.SUBSCRIBE_TO_UPCOMING_EVENTS,
          payload: {
            ...upcomingEventsData,
          },
          requestId,
        },
      });
    }
  };

  const subscribeTopEvents = ({
    sportId,
    codes = [],
    requestId,
    key,
    limit = 100,
  }) => {
    if (sportId) {
      topEventsData[key] = {
        codes,
        sportId,
        limit,
      };
    } else {
      delete topEventsData[key];
    }

    socketSubscribeTopEvents(requestId);
  };
  const subscribeUpcomingEvents = ({
    sportId,
    limit = 100,
    codes = [],
    requestId,
  }) => {
    upcomingEventsData = {
      sportId,
      limit,
      codes,
    };

    socketSubscribeUpcomingEvents(requestId);
  };
  const subscribeToSports = (sports, requestId) => {
    sendSocketMessage({
      message: {
        action: SOCKET_ACTION_TYPES.SUBSCRIBE_TO_SPORT,
        payload: {
          sports,
        },
        requestId,
      },
    });
  };

  const unsubscribeFromSports = () => {
    sendSocketMessage({
      message: {
        action: SOCKET_ACTION_TYPES.SUBSCRIBE_TO_SPORT,
        payload: {
          sports: [],
        },
        requestId: `unsubscribeFromSports--${Date.now()}`,
      },
    });
  };

  const subscribeToLeagues = ({ leagues, requestId }) => {
    if (leagues.length) {
      const newData = {};

      leagues.forEach(({ id, codes, type }) => {
        newData[type] = {
          ...newData[type],
          [id]: codes,
        };

        leaguesData = newData;
      });
    } else {
      leaguesData = {};
    }

    socketSubscribeLeagues(requestId);
  };

  const subscribeToEvents = ({ eventIds, requestId, key, merge }) => {
    if (merge) {
      singleEventsData[key] = [...(singleEventsData[key] || []), ...eventIds];
    } else {
      singleEventsData[key] = eventIds;
    }
    socketSubscribeToEvents(requestId);
  };
  const unsubscribeFromEvents = ({ eventIds, requestId, key }) => {
    singleEventsData[key] = singleEventsData[key].filter(
      eventId => !eventIds.includes(eventId),
    );
    socketSubscribeToEvents(requestId);
  };
  const subscribeToSearchEvents = ({
    search,
    codes = [
      ...new Set(Object.values(marketsMapper).map(markets => markets[0].code)),
    ],
    requestId,
  }) => {
    if (search !== searchValue) {
      searchValue = search;
      sendSocketMessage({
        message: {
          action: SOCKET_ACTION_TYPES.SUBSCRIBE_TO_SEARCH,
          payload: {
            search: search || '',
            codes,
          },
          requestId: requestId,
        },
      });
    }
  };

  return {
    subscribeTopEvents,
    subscribeUpcomingEvents,
    subscribeToSports,
    unsubscribeFromSports,
    subscribeToLeagues,
    subscribeToEvents,
    unsubscribeFromEvents,
    subscribeToSearchEvents,
  };
}

export const SPORT_SOCKET_ACTIONS = createSocketActions();
