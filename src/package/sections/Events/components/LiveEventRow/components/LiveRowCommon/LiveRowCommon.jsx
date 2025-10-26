import React, { memo } from 'react';
import { EventRowCommon__styled } from '../../../../../../components/EventRow/EventRow.styled';
import SingleBets from '../../../../../../components/SingleBets/SingleBets';

const LiveRowCommon = ({
  betslip,
  onOdd,
  sportId,
  onMarketFavourite,
  favouriteMarkets,
  eventId,
}) => {
  return (
    <EventRowCommon__styled>
      <SingleBets
        isLive
        onOddClick={onOdd}
        betslip={betslip}
        sportId={sportId}
        favouriteMarkets={favouriteMarkets}
        onMarketFavourite={onMarketFavourite}
        eventId={eventId}
      />
    </EventRowCommon__styled>
  );
};

export default memo(LiveRowCommon);

// sportId,
//   onOddClick,
//   betslip = {},
//   favouriteMarkets = {},
//   onMarketFavourite = () => {},
//   eventId,
