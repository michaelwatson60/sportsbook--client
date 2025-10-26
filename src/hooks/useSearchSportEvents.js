import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SPORT_SOCKET_ACTIONS } from '@/socket/actions.js';
import {
  selectIsPendingRequest,
  selectSearchEvents,
} from '@/redux/reducers/sport/sport.selector';
import { sportActions } from '@/redux/reducers/sport/sport.slice';

const useSearchSportEvents = ({ searchValue }) => {
  const [unsubscribed, setUnsubscribed] = useState(true);
  const searchEventsIds = useSelector(state => state.sport.searchEventsIds);
  const events = useSelector(state => selectSearchEvents(state));
  const requestId = useMemo(
    () => `searchEventsBy-${searchValue}--${Date.now()}`,
    [searchValue],
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const firstInitRef = useRef(true);
  const isRequestPending = useSelector(selectIsPendingRequest(requestId));

  useEffect(() => {
    if (firstInitRef.current) {
      firstInitRef.current = false;
    } else {
      setLoading(isRequestPending);
    }
  }, [isRequestPending]);

  useEffect(() => {
    if (searchValue?.length > 2) {
      setUnsubscribed(false);
      setLoading(true);

      dispatch(sportActions.addPendingRequestId(requestId));

      SPORT_SOCKET_ACTIONS.subscribeToSearchEvents({
        search: searchValue,
        requestId,
      });
    } else if (searchValue?.length < 3 && !unsubscribed) {
      setUnsubscribed(true);
      dispatch(sportActions.removePendingRequestId(requestId));

      SPORT_SOCKET_ACTIONS.subscribeToSearchEvents({
        search: '',
        requestId: `unsubscribe-from-search-events--${Date.now()}`,
      });

      setLoading(false);
    }
  }, [searchValue, unsubscribed]);

  useEffect(() => {
    return () => {
      dispatch(sportActions.removePendingRequestId(requestId));
      SPORT_SOCKET_ACTIONS.subscribeToSearchEvents({
        search: '',
        requestId: `unsubscribe-from-search-events--${Date.now()}`,
      });
    };
  }, []);

  return {
    events: events,
    searchEventsIds: searchEventsIds,
    isLoading: loading,
  };
};

export default useSearchSportEvents;
