import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import qs from 'qs';
import MatchOddsEvents from './components/MatchOddsEvents/MatchOddsEvents';
import {
  selectSportsCountries,
  selectSportsGroups,
  selectTree,
} from '@/redux/reducers/sportsbook/sportsbook.slice';
import { SPORT_SOCKET_ACTIONS } from '@/socket/actions';
import { SPORT_CONSTANTS } from '@/socket/constants';
import {
  selectIsPendingRequest,
  selectPrematchEventsByLeagues,
  selectPrematchEventsBySportId,
} from '@/redux/reducers/sport/sport.selector';
import MarketGroups from '@/Routes/Tree/components/MatchOdds/MarketGroups';
import { sportActions } from '@/redux/reducers/sport/sport.slice';
import dayjs from 'dayjs';

const MatchOdds = () => {
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeMarket, setActiveMarket] = useState(null);
  const dispatch = useDispatch();
  const { leagues, sportId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const firstInitRef = useRef(false);
  const sportGroups = useSelector(selectSportsGroups);
  const sportCountries = useSelector(selectSportsCountries);
  const { date } = useSelector(selectTree);
  const leaguesList = useMemo(() => {
    if (!Object.keys(sportCountries || {})?.length) {
      return null;
    }
    if (leagues === 'all') {
      return ['all'];
    }
    return Object.values(
      qs.parse(leagues, {
        decoder: value => value.split(','),
      }),
    );
  }, [leagues, sportId, sportGroups, sportCountries]);
  const leaguesIds = useMemo(
    () => leaguesList?.flat()?.map(Number),
    [leaguesList],
  );
  const requestId = useMemo(() => {
    if (leagues === 'all') {
      return `subscribe-to-sport-${sportId}--${Date.now()}`;
    } else if (leaguesIds?.length) {
      return `subscribe-to-leagues-${leaguesIds.join(',')}--${Date.now()}`;
    }
  }, [leagues]);
  const isRequestPending = useSelector(state =>
    selectIsPendingRequest(requestId)(state),
  );
  const allEvents = useSelector(
    leaguesIds?.length && leagues !== 'all'
      ? selectPrematchEventsByLeagues(leaguesIds)
      : selectPrematchEventsBySportId(+sportId),
  );
  const events = useMemo(() => {
    if (date === 'all') {
      return allEvents;
    } else {
      return allEvents?.filter(event =>
        dayjs.unix(event.startDate).isSame(date, 'day'),
      );
    }
  }, [allEvents, date]);
  useEffect(() => {
    if (firstInitRef.current) {
      firstInitRef.current = false;
    } else {
      setLoading(isRequestPending);
    }
  }, [isRequestPending]);

  useEffect(() => {
    if (activeMarket?.code && leagues === 'all' && sportId) {
      dispatch(sportActions.addPendingRequestId(requestId));
      SPORT_SOCKET_ACTIONS.subscribeToSports(
        [
          {
            id: +sportId,
            codes: [activeMarket.code],
            type: SPORT_CONSTANTS.SPORT_TYPES.prematch,
          },
        ],
        requestId,
      );
    }
  }, [leagues, activeMarket?.code, sportId]);

  useEffect(() => {
    if (leagues !== 'all' && leaguesIds?.length && activeMarket?.code) {
      dispatch(sportActions.addPendingRequestId(requestId));
      SPORT_SOCKET_ACTIONS.subscribeToLeagues({
        leagues: leaguesIds.map(id => ({
          id: +id,
          codes: [activeMarket.code],
          type: SPORT_CONSTANTS.SPORT_TYPES.prematch,
        })),
        requestId,
      });

      return () => {
        dispatch(sportActions.removePendingRequestId(requestId));
        SPORT_SOCKET_ACTIONS.subscribeToLeagues({
          leagues: [],
          requestId,
        });
      };
    }
  }, [activeMarket?.code, leaguesIds, leagues]);

  useEffect(() => {
    return () => {
      if (leagues === 'all') {
        dispatch(sportActions.removePendingRequestId(requestId));
        SPORT_SOCKET_ACTIONS.unsubscribeFromSports();
      }
    };
  }, []);

  const isEventExist = !!events.length;

  return (
    <>
      <MarketGroups
        activeGroup={activeGroup}
        activeMarket={activeMarket}
        setActiveGroup={setActiveGroup}
        setActiveMarket={setActiveMarket}
        isEventExist={isEventExist}
        sportId={+sportId}
      />
      <MatchOddsEvents
        isLoading={isLoading}
        activeMarket={activeMarket || {}}
        events={events}
      />
    </>
  );
};

export default MatchOdds;
