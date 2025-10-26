import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  SingleEvent__styled,
  SingleEventSportsBook__styled,
  SingleEventSportsBookHead__styled,
  SingleSideBar__styled,
  // SingleSideBar__styled,
} from './SingleEvent.styled';
import Navigation from '../../package/components/Navigation/Navigation';
import { useMediaQuery } from '@react-hook/media-query';
import {
  selectBetslipBets,
  toggleBet,
} from '@/redux/reducers/betslip/betslip.slice';
import {
  selectIsLiveExist,
  setMatchTrackerId,
} from '@/redux/reducers/live/live.slice';
import SingleLive from '../../package/sections/SingleSport/SingleLive';
import {
  selectFavouriteMarkets,
  toggleFavouriteMarket,
} from '@/redux/reducers/sportsbook/sportsbook.slice';
import LiveMenuContainer from '../../components/LiveMenuContainer/LiveMenuContainer';
import useEvent from '@/hooks/useEvent';
import { SPORT_SOCKET_ACTIONS } from '@/socket/actions';
import {
  selectEventById,
  selectIsPendingRequest,
} from '@/redux/reducers/sport/sport.selector';
import { sportActions } from '@/redux/reducers/sport/sport.slice';

const SingleLiveContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const eventData = useSelector(state => selectEventById(state, eventId));
  const { team1Name, team2Name, isLive } = useEvent(eventId);
  // const sports = useSelector(selectSports);
  const betslip = useSelector(selectBetslipBets);
  const favouriteMarkets = useSelector(selectFavouriteMarkets);
  const isLiveExist = useSelector(selectIsLiveExist);

  const isMobile = useMediaQuery('only screen and (max-width: 800px)');
  const [isLoading, setIsLoading] = useState(true);
  const firstInitRef = useRef(true);
  const requestId = useMemo(
    () => `subscribe-to-event--${eventId}--${Date.now()}`,
    [],
  );
  const isRequestPending = useSelector(selectIsPendingRequest(requestId));

  useEffect(() => {
    if (firstInitRef.current) {
      firstInitRef.current = false;
    } else {
      setIsLoading(isRequestPending);
    }
  }, [isRequestPending]);

  useEffect(() => {
    if (eventId) {
      dispatch(sportActions.addPendingRequestId(requestId));
      SPORT_SOCKET_ACTIONS.subscribeToEvents({
        requestId: requestId,
        eventIds: [+eventId],
        key: 'single-event-page',
        merge: false,
      });
    }
  }, [eventId]);

  useEffect(() => {
    return () => {
      dispatch(sportActions.removePendingRequestId(requestId));
      SPORT_SOCKET_ACTIONS.unsubscribeFromEvents({
        requestId: `unsubscribeFromEvent--${eventId}--${Date.now()}`,
        key: 'single-event-page',
        eventIds: [+eventId],
      });
    };
  }, []);

  useEffect(() => {
    if (eventData?.isLive) {
      dispatch(setMatchTrackerId(eventId));
    }
  }, [eventId, eventData]);

  const navLinks = useMemo(() => {
    const eventName = eventData
      ? `${team1Name} vs. ${team2Name}`
      : isLoading
      ? 'Loading...'
      : 'The event has ended';
    return [
      {
        name: 'Home',
        cb() {
          navigate('/');
        },
      },
      ...(isLive
        ? [
            {
              name: 'live',
              cb() {
                navigate('/live');
              },
            },
          ]
        : []),
      { name: eventName },
    ];
  }, [navigate, event, isLoading]);

  const onOddClick = odd => {
    dispatch(toggleBet(odd));
  };

  const onMarketFavourite = code => {
    dispatch(toggleFavouriteMarket(code));
  };

  return (
    <SingleEvent__styled>
      {!isMobile && isLiveExist && (
        <SingleSideBar__styled>
          {/* <Favourites /> */}
          <LiveMenuContainer />
        </SingleSideBar__styled>
      )}
      <SingleEventSportsBook__styled>
        <SingleEventSportsBookHead__styled>
          <Navigation links={navLinks} />
        </SingleEventSportsBookHead__styled>
        <SingleLive
          isLoading={isLoading}
          eventId={eventId}
          eventData={eventData}
          onOddClick={onOddClick}
          betslip={betslip}
          favouriteMarkets={favouriteMarkets}
          onMarketFavourite={onMarketFavourite}
        />
      </SingleEventSportsBook__styled>
    </SingleEvent__styled>
  );
};

export default SingleLiveContainer;
