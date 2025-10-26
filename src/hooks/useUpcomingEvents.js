import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SPORT_SOCKET_ACTIONS } from '@/socket/actions.js';
import { sportActions } from '@/redux/reducers/sport/sport.slice';
import { marketsMapper } from '@/helpers/marketMapper';
import useSportList from '@/hooks/useSportList';
import {
  selectIsPendingRequest,
  selectUpcomingEventsBySportId,
} from '@/redux/reducers/sport/sport.selector';
import useMenuStructure from '@/hooks/useMenuStructure';

const useUpcomingEvents = ({ defaultSportId, limit }) => {
  const [selectedSportId, setSelectedSportId] = useState(defaultSportId);

  const { sports: tabsSports } = useSportList({ type: 'prematch' });

  const sportId = +selectedSportId;
  const events = useSelector(
    selectUpcomingEventsBySportId({ sportId: sportId }),
  );
  const requestId = useMemo(
    () => `upcoming-events-${sportId}--${Date.now()}`,
    [sportId],
  );
  const loading = useSelector(selectIsPendingRequest(requestId));
  const { menuStructure, menuStructureLoading } = useMenuStructure();

  const sports = useMemo(() => {
    if (menuStructure && tabsSports) {
      const order = menuStructure.sports;
      const obj = tabsSports.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.id]: cur,
        };
      }, {});
      return order?.length
        ? order.map(id => obj[id]).filter(Boolean)
        : tabsSports;
    } else if (!menuStructure && !menuStructureLoading) {
      return tabsSports;
    } else {
      return [];
    }
  }, [menuStructure, tabsSports]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sportActions.addPendingRequestId(requestId));

    SPORT_SOCKET_ACTIONS.subscribeUpcomingEvents({
      sportId: sportId,
      codes: marketsMapper[sportId]?.map(({ code }) => code),
      requestId,
      limit: limit,
    });

    return () => {
      sportActions.removePendingRequestId(requestId);
    };
  }, [sportId]);

  useEffect(() => {
    return () => {
      dispatch(sportActions.removePendingRequestId(requestId));

      SPORT_SOCKET_ACTIONS.subscribeUpcomingEvents({
        sportId: null,
        requestId: `unsubscribe-from-upcoming-events-${sportId}--${Date.now()}`,
      });
    };
  }, []);

  return {
    loading: loading || menuStructureLoading,
    events: events?.sort((a, b) => a.startDate - b.startDate),
    selectedSportId,
    setSelectedSportId,
    tabsSports: sports,
  };
};

export default useUpcomingEvents;
