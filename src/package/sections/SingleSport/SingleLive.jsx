import PropTypes from 'prop-types';
import MatchBoard from '../../components/MatchBoard/MatchBoard';
import Notification from '../../components/Notification/Notification';
import SingleBets from '../../components/SingleBets/SingleBets';
import SingleSportSkeleton from './SingleSport.skeleton';
import {
  SingleSport__styled,
  SingleSportTracker__styled,
} from './SingleSport.styled';
import { useTheme } from 'styled-components';
import { useMediaQuery } from '@react-hook/media-query';
import GameSearchContainer from '../../../components/GameSearchContainer/GameSearchContainer';
import MatchTracker from '../../components/MatchTracker/MatchTracker';
import useEvent from '@/hooks/useEvent';
import { useSelector } from 'react-redux';
import {
  selectEventScore,
  selectEventStatus,
  selectEventTime,
} from '@/redux/reducers/sport/sport.selector';

const SingleLive = ({
  eventId,
  isLoading,
  onOddClick,
  betslip = {},
  favouriteMarkets,
  onMarketFavourite,
  eventData,
}) => {
  const {
    team1Name,
    team2Name,
    team1Id,
    team2Id,
    isLive,
    sportId,
    leagueName,
    countryName,
    startDate,
  } = useEvent(eventId);

  const { mode } = useTheme();
  const starsBetTheme = mode === 'starsBet';
  const isMobile = useMediaQuery('only screen and (max-width: 800px)');
  const isTablet = useMediaQuery('only screen and (max-width: 1024px)');
  const sc = useSelector(state => selectEventScore(state, eventId));
  const eventStatus = useSelector(state => selectEventStatus(state, eventId));
  const eventTime = useSelector(state => selectEventTime(state, eventId));
  const { GOAL, T } = sc || {};

  if (!eventData) {
    return isLoading ? (
      <SingleSportSkeleton />
    ) : (
      <Notification text="The event has ended" />
    );
  }

  const onOdd = (odd, market) => {
    onOddClick({
      ...odd,
      eventId,
      T1: team1Name,
      T2: team2Name,
      marketName: market.n,
      marketCode: market.code,
      isLive: true,
    });
  };
  return (
    <SingleSport__styled>
      {isMobile && starsBetTheme && <GameSearchContainer />}
      <MatchBoard
        isLive={isLive}
        T1={team1Name}
        T1I={team1Id}
        T2={team2Name}
        T2I={team2Id}
        league={`${countryName}. ${leagueName}`}
        sportId={sportId}
        goals={GOAL || T || []}
        time={Math.ceil(eventTime / 60)}
        period={eventStatus}
        startDate={startDate}
        isLoading={isLoading}
        score={sc}
      />
      {isTablet && !!isLive && (
        <SingleSportTracker__styled>
          <MatchTracker matchTrackerId={eventId} />
        </SingleSportTracker__styled>
      )}
      <SingleBets
        isLive
        onOddClick={onOdd}
        betslip={betslip}
        sportId={sportId}
        favouriteMarkets={favouriteMarkets}
        onMarketFavourite={onMarketFavourite}
        eventId={eventId}
        subscribedFromParent
        parentLoading={isLoading}
      />
    </SingleSport__styled>
  );
};

SingleLive.propTypes = {
  event: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SingleLive;
