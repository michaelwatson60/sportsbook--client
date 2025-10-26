import React, { memo } from 'react';
import { EventRowOdds__styled } from '@/package/components/EventRow/EventRow.styled';
import Odds from '../../../../components/Odds/Odds';

const EventRowOdds = ({
  visibleMarketsTypes,
  onOdd,
  marketsGroup = {},
  betslip,
}) => {
  return (
    <>
      {visibleMarketsTypes.map(type => (
        <EventRowOdds__styled
          key={type.code}
          onClick={e => e.stopPropagation()}>
          <Odds
            data={type}
            onOddClick={onOdd}
            betslip={betslip}
            market={marketsGroup[type.code] || {}}
            isLive
          />
        </EventRowOdds__styled>
      ))}
    </>
  );
};

export default memo(EventRowOdds);
