import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  SingleEvent__styled,
  SingleEventSportsBook__styled,
  SingleEventSportsBookHead__styled,
  SingleSideBar__styled,
} from './SingleEvent.styled';
import {
  selectFavouriteMarkets,
  selectIsSingleEventLoading,
  selectSingleEvent,
  toggleFavouriteMarket,
  // selectSports,
} from '../../redux/reducers/sportsbook/sportsbook.slice';
// import Menu from '../../package/sections/Menu/Menu';
import Navigation from '../../package/components/Navigation/Navigation';
import SingleSport from '../../package/sections/SingleSport/SingleSport';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { getSingleEventThunk } from '../../redux/reducers/sportsbook/sportsbook.thunk';
import { useMediaQuery } from '@react-hook/media-query';
import {
  selectBetslipBets,
  toggleBet,
} from '../../redux/reducers/betslip/betslip.slice';
// import Favourites from '../../components/Favourites/Favourites';
import LiveMenuContainer from '../../components/LiveMenuContainer/LiveMenuContainer';
import { selectIsLiveExist } from '../../redux/reducers/live/live.slice';

const SingleEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { eventId } = useParams();
  // const sports = useSelector(selectSports);
  const event = useSelector(selectSingleEvent);
  const isLoading = useSelector(selectIsSingleEventLoading);
  const betslip = useSelector(selectBetslipBets);
  const favouriteMarkets = useSelector(selectFavouriteMarkets);
  const isLiveExist = useSelector(selectIsLiveExist);

  useEffect(() => {
    dispatch(getSingleEventThunk(eventId));
  }, [eventId]);

  const isMobile = useMediaQuery('only screen and (max-width: 800px)');

  const navLinks = useMemo(() => {
    const eventName = event
      ? `${event.info.T1} vs. ${event.info.T2}`
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
        <SingleSport
          isLoading={isLoading}
          event={event}
          onOddClick={onOddClick}
          betslip={betslip}
          favouriteMarkets={favouriteMarkets}
          onMarketFavourite={onMarketFavourite}
        />
      </SingleEventSportsBook__styled>
    </SingleEvent__styled>
  );
};

export default SingleEvent;
