import { useSelector, useDispatch } from 'react-redux';
import Events from '../../package/sections/Events/Events';
import {
  selectBetslipBets,
  toggleBet,
} from '@/redux/reducers/betslip/betslip.slice';
import {
  selectFavouriteMarkets,
  toggleFavouriteMarket,
} from '@/redux/reducers/sportsbook/sportsbook.slice';

const EventsContainer = ({
  title,
  events,
  isLoading,
  tabsWithIcon,
  tabs,
  activeSportId,
  onEventClick,
  isAll,
  isGroup,
  isOddsLoading,
  onViewAllClick,
  market,
}) => {
  const dispatch = useDispatch();
  const betslip = useSelector(selectBetslipBets);
  const favouriteMarkets = useSelector(selectFavouriteMarkets);

  const onOddClick = odd => {
    dispatch(toggleBet(odd));
  };

  const onMarketFavourite = code => {
    dispatch(toggleFavouriteMarket(code));
  };

  return (
    <Events
      isGroup={isGroup}
      isAll={isAll}
      title={title}
      tabsWithIcon={tabsWithIcon}
      isLoading={isLoading}
      isOddsLoading={isOddsLoading}
      tabs={tabs}
      events={events}
      activeSportId={activeSportId}
      onEventClick={onEventClick}
      onOddClick={onOddClick}
      onViewAllClick={onViewAllClick}
      betslip={betslip}
      market={market}
      favouriteMarkets={favouriteMarkets}
      onMarketFavourite={onMarketFavourite}
    />
  );
};

export default EventsContainer;
