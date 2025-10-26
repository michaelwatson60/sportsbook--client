import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LiveEvents from '../../package/sections/Events/LiveEvents';
import {
  selectBetslipBets,
  toggleBet,
} from '@/redux/reducers/betslip/betslip.slice';
import {
  selectLiveActiveSportId,
  setLiveSportId,
} from '@/redux/reducers/live/live.slice';
import {
  selectFavouriteMarkets,
  toggleFavouriteMarket,
} from '@/redux/reducers/sportsbook/sportsbook.slice';
import useLiveEvents from '@/hooks/useLiveEvents';

const LiveEventsContainer = ({ sportId, isHome, isAll }) => {
  const navigate = useNavigate();
  const stateActiveSportId = useSelector(selectLiveActiveSportId);
  const activeSportId = sportId || stateActiveSportId || 50;
  const { events, loading, selectedSportId, setSelectedSportId, tabsSports } =
    useLiveEvents({ defaultSportId: activeSportId });
  const dispatch = useDispatch();
  const sportIds = useMemo(() => tabsSports.map(s => s.id), [tabsSports]);
  const favouriteMarkets = useSelector(selectFavouriteMarkets);
  const betslip = useSelector(selectBetslipBets);

  const eventIds = useMemo(() => events?.map(e => e.id), [events]);

  const filteredEventIds = useMemo(() => {
    const ids = [...eventIds];
    if (isHome && ids.length > 10) {
      ids.length = 10;
    }
    return ids;
  }, [eventIds, isHome]);

  const tabs = useMemo(() => {
    if (sportId) {
      return [];
    }
    return tabsSports.map(sport => ({
      id: sport.id,
      name: sport.name,
      cb: () => {
        setSelectedSportId(sport.id);
        dispatch(setLiveSportId(sport.id));
      },
    }));
  }, [tabsSports, sportId]);

  const onOddClick = useCallback(odd => {
    dispatch(toggleBet({ ...odd, isLive: true }));
  }, []);

  const onEventClick = useCallback(
    eventId => {
      navigate(`/event/${eventId}`);
    },
    [navigate],
  );

  const onViewAllClick = () => {
    navigate('/live');
  };

  const onMarketFavourite = code => {
    dispatch(toggleFavouriteMarket(code));
  };

  return (
    <LiveEvents
      title={'live'}
      isLoading={loading}
      sports={tabsSports}
      sportIds={sportIds}
      activeSportId={selectedSportId}
      tabs={tabs}
      eventIds={filteredEventIds}
      onOddClick={onOddClick}
      betslip={betslip}
      onEventClick={onEventClick}
      onViewAllClick={!isAll && onViewAllClick}
      onMarketFavourite={onMarketFavourite}
      favouriteMarkets={favouriteMarkets}
    />
  );
};

export default LiveEventsContainer;
