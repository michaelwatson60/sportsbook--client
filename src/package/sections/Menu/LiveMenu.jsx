import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Menu__styled,
  MenuBody__styled,
  MenuHead__styled,
  MenuSportList__styled,
} from './Menu.styled';
import MenuSportSkeleton from './components/MenuSport/MenuSport.skeleton';
import { LOADING_ITEMS } from '../../helpers/utils';
import LiveMenuSport from './components/MenuSport/LiveMenuSport';
import LiveMenuLeague from './components/MenuLeague/LiveMenuLeague';
import { SPORT_SOCKET_ACTIONS } from '@/socket/actions';
import { SPORT_CONSTANTS } from '@/socket/constants';
import { useDispatch } from 'react-redux';
import { sportActions } from '@/redux/reducers/sport/sport.slice';

const LiveMenu = ({ title, sports = {}, isLoading, onEventClick }) => {
  const dispatch = useDispatch();
  const [openedSports, setOpenedSports] = useState([]);
  const handleSportOpen = (sportId, opened) => {
    if (opened && !openedSports.includes(sportId)) {
      setOpenedSports(prev => [...prev, sportId]);
    } else if (!opened) {
      setOpenedSports(prev => prev.filter(id => id !== sportId));
    }
  };

  const [leaguesToSubscribe, setLeaguesToSubscribe] = useState([]);

  const handleLeagueOpen = (leagueId, opened) => {
    if (opened && !leaguesToSubscribe.includes(leagueId)) {
      setLeaguesToSubscribe(prev => [...prev, leagueId]);
    } else if (!opened) {
      setLeaguesToSubscribe(prev => prev.filter(id => id !== leagueId));
    }
  };
  const requestId = useMemo(
    () => `subscribe-to-leagues-${leaguesToSubscribe.join(',')}--${Date.now()}`,
    [leaguesToSubscribe],
  );

  useEffect(() => {
    const leaguesData = [];
    openedSports.forEach(id => {
      const sport = sports.find(sport => sport.id === id);
      sport.countries.forEach(({ leagues }) => {
        leagues.forEach(league => {
          leaguesData.push(league.id);
        });
      });
    });
    setLeaguesToSubscribe(leaguesData);
  }, [openedSports]);

  useEffect(() => {
    if (leaguesToSubscribe.length > 0) {
      dispatch(sportActions.addPendingRequestId(requestId));
      SPORT_SOCKET_ACTIONS.subscribeToLeagues({
        leagues: leaguesToSubscribe.map(id => ({
          id: +id,
          codes: ['1x2'],
          type: SPORT_CONSTANTS.SPORT_TYPES.live,
        })),
        requestId,
      });

      return () => {
        dispatch(sportActions.removePendingRequestId(requestId));
      };
    }
  }, [leaguesToSubscribe]);

  useEffect(() => {
    return () => {
      SPORT_SOCKET_ACTIONS.subscribeToLeagues({
        leagues: [],
        requestId: `unsubscribe-from-leagues--${Date.now()}`,
      });
    };
  }, []);

  return (
    <Menu__styled>
      {title && <MenuHead__styled>{title}</MenuHead__styled>}
      <MenuBody__styled>
        <MenuSportList__styled>
          {isLoading
            ? LOADING_ITEMS.map((_, i) => <MenuSportSkeleton key={i} />)
            : sports?.map((sport, i) => {
                return (
                  <LiveMenuSport
                    key={sport.id}
                    id={sport.id}
                    open={!i}
                    onOpenChange={handleSportOpen}>
                    {sport.countries.map(country => {
                      const leagues = country.leagues;
                      return leagues.map((league, leagueIndex) => {
                        return (
                          <LiveMenuLeague
                            key={league.id}
                            id={league.id}
                            countryId={country.id}
                            open={leagueIndex < 3}
                            onEventClick={onEventClick}
                            onOpenChange={handleLeagueOpen}
                          />
                        );
                      });
                    })}
                  </LiveMenuSport>
                );
              })}
        </MenuSportList__styled>
      </MenuBody__styled>
    </Menu__styled>
  );
};

LiveMenu.propTypes = {
  title: PropTypes.string,
  sports: PropTypes.object,
  events: PropTypes.object,
  isLoading: PropTypes.bool,
  onEventClick: PropTypes.func,
};

export default LiveMenu;
