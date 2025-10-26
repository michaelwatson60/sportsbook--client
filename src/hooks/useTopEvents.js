import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SPORT_SOCKET_ACTIONS } from '@/socket/actions.js';
import { sportActions } from '@/redux/reducers/sport/sport.slice';
import { marketsMapper } from '@/helpers/marketMapper';
import useSportList from '@/hooks/useSportList';
import {
  selectIsPendingRequest,
  selectTopEventsBySportId,
  selectTopEventsCount,
} from '@/redux/reducers/sport/sport.selector';
import useMenuStructure from '@/hooks/useMenuStructure';

const useTopEvents = ({ defaultSportId, key, limit }) => {
  const [selectedSportId, setSelectedSportId] = useState(defaultSportId);

  const { sports: tabsSports } = useSportList({ type: 'top' });

  const topEventsCount = useSelector(selectTopEventsCount);
  const sportId = +selectedSportId;
  const events = useSelector(selectTopEventsBySportId({ sportId: sportId }));
  const requestId = useMemo(
    () => `topEvents-${sportId}--${Date.now()}`,
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

    SPORT_SOCKET_ACTIONS.subscribeTopEvents({
      sportId: sportId,
      codes: marketsMapper[sportId]?.map(({ code }) => code),
      requestId,
      key: key,
      limit: limit,
    });

    return () => {
      sportActions.removePendingRequestId(requestId);
    };
  }, [sportId]);

  useEffect(() => {
    return () => {
      dispatch(sportActions.removePendingRequestId(requestId));

      SPORT_SOCKET_ACTIONS.subscribeTopEvents({
        sportId: null,
        requestId: `unsubscribe-from-top-events`,
        key: key,
      });
    };
  }, []);

  return {
    loading: loading || menuStructureLoading,
    events: events?.sort((a, b) => a.startDate - b.startDate),
    topEventsCount,
    selectedSportId,
    setSelectedSportId,
    tabsSports: sports,
  };
};

export default useTopEvents;
