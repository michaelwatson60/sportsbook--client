import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SPORT_SOCKET_ACTIONS } from '@/socket/actions.js';
import { sportActions } from '@/redux/reducers/sport/sport.slice';
import { marketsMapper } from '@/helpers/marketMapper';
import useSportList from '@/hooks/useSportList';
import {
  selectIsPendingRequest,
  selectLiveEventsBySportId,
} from '@/redux/reducers/sport/sport.selector';
import useMenuStructure from '@/hooks/useMenuStructure';
import { SPORT_CONSTANTS } from '@/socket/constants';

const useLiveEvents = ({ defaultSportId }) => {
  const dispatch = useDispatch();
  const [selectedSportId, setSelectedSportId] = useState(defaultSportId);

  const { sports: tabsSports } = useSportList({ type: 'live' });
  useEffect(() => {
    if (
      tabsSports?.length &&
      !tabsSports.find(sport => sport.id === defaultSportId)
    ) {
      setSelectedSportId(tabsSports[0].id);
    }
  }, [defaultSportId, tabsSports]);

  useEffect(() => {
    if (
      tabsSports &&
      !tabsSports?.find(sport => sport.id === +defaultSportId)
    ) {
      setSelectedSportId(tabsSports[0].id);
    }
  }, [tabsSports, defaultSportId]);

  const sportId = +selectedSportId;
  const events = useSelector(state =>
    selectLiveEventsBySportId({ sportId: sportId })(state),
  );
  const requestId = useMemo(
    () => `live-events-${sportId}--${Date.now()}`,
    [sportId],
  );
  const loading = useSelector(state =>
    selectIsPendingRequest(requestId)(state),
  );
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

  useEffect(() => {
    dispatch(sportActions.addPendingRequestId(requestId));

    SPORT_SOCKET_ACTIONS.subscribeToSports(
      [
        {
          id: sportId,
          codes: marketsMapper[sportId]?.map(({ code }) => code),
          type: SPORT_CONSTANTS.SPORT_TYPES.live,
        },
      ],
      requestId,
    );

    return () => {
      dispatch(sportActions.removePendingRequestId(requestId));
    };
  }, [sportId]);

  useEffect(() => {
    return () => {
      dispatch(sportActions.removePendingRequestId(requestId));

      SPORT_SOCKET_ACTIONS.unsubscribeFromSports();
    };
  }, []);

  return {
    loading: loading || menuStructureLoading,
    events,
    selectedSportId,
    setSelectedSportId,
    tabsSports: sports,
  };
};

export default useLiveEvents;
