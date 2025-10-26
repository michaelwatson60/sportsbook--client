import PropTypes from 'prop-types';
import MatchBoard from '../../components/MatchBoard/MatchBoard';
import Notification from '../../components/Notification/Notification';
import SingleBets from '../../components/SingleBets/SingleBets';
import SingleSportSkeleton from './SingleSport.skeleton';
import { SingleSport__styled } from './SingleSport.styled';
import { useTheme } from 'styled-components';
import { useMediaQuery } from '@react-hook/media-query';
import GameSearchContainer from '../../../components/GameSearchContainer/GameSearchContainer';

const SingleSport = ({
  event,
  isLoading,
  onOddClick,
  betslip = {},
  favouriteMarkets,
  onMarketFavourite,
}) => {
  const {
    info = {},
    sportId,
    startDate,
    markets,
    league,
    marketsGroup,
  } = event || {};
  const { T1, T2, T1I, T2I } = info;
  const { mode } = useTheme();
  const starsBetTheme = mode === 'starsBet';
  const isMobile = useMediaQuery('only screen and (max-width: 800px)');

  if (!event) {
    return isLoading ? (
      <SingleSportSkeleton />
    ) : (
      <Notification text="The event has ended" />
    );
  }

  const onOdd = (odd, market) => {
    onOddClick({
      ...odd,
      eventId: event.id,
      T1: event.info.T1,
      T2: event.info.T2,
      marketName: market.name,
      marketCode: market.code,
    });
  };
  return (
    <SingleSport__styled>
      {isMobile && starsBetTheme && <GameSearchContainer />}
      <MatchBoard
        T1={T1}
        T1I={T1I}
        T2={T2}
        T2I={T2I}
        league={league.name}
        sportId={sportId}
        startDate={startDate}
      />
      <SingleBets
        markets={markets}
        onOddClick={onOdd}
        groups={marketsGroup}
        betslip={betslip}
        sportId={sportId}
        favouriteMarkets={favouriteMarkets}
        onMarketFavourite={onMarketFavourite}
      />
    </SingleSport__styled>
  );
};

SingleSport.propTypes = {
  event: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SingleSport;
