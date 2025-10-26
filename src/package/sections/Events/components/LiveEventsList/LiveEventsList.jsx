import React, { memo } from 'react';
import LiveEventRow from '../LiveEventRow/LiveEventRow';

const LiveEventsList = ({
  eventsIds,
  visibleMarketsTypes,
  onOddClick,
  betslip,
  onEventClick,
  favouriteMarkets,
  onMarketFavourite,
}) => {
  return (
    <div>
      {eventsIds.map(id => {
        return (
          <LiveEventRow
            key={id}
            eventId={id}
            visibleMarketsTypes={visibleMarketsTypes}
            onOddClick={onOddClick}
            betslip={betslip}
            onEventClick={onEventClick}
            favouriteMarkets={favouriteMarkets}
            onMarketFavourite={onMarketFavourite}
          />
        );
      })}
    </div>
  );
};

export default memo(LiveEventsList);
