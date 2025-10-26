import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TopCards from '../../package/sections/TopCards/TopCards';
import {
  selectBetslipBets,
  toggleBet,
} from '@/redux/reducers/betslip/betslip.slice';
import useTopEvents from '@/hooks/useTopEvents';
import useMarketsTemplate from '@/hooks/useMarketsTemplate';

const TopCardsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sportId = 50;
  const betslip = useSelector(selectBetslipBets);
  const { marketsTemplate, isLoading } = useMarketsTemplate({ sportId });

  const onEventClick = event => {
    navigate(`/event/${event.id}`);
  };

  const onOddClick = odd => {
    dispatch(toggleBet(odd));
  };

  const { events, loading } = useTopEvents({
    defaultSportId: sportId,
    key: 'top-cards',
  });

  return (
    <TopCards
      isLoading={loading || isLoading}
      events={events}
      onEventClick={onEventClick}
      onOddClick={onOddClick}
      betslip={betslip}
      marketsTemplate={marketsTemplate}
      sportId={sportId}
    />
  );
};

export default TopCardsContainer;
