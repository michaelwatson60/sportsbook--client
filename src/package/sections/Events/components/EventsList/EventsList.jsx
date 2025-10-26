import EventRow from '../../../../components/EventRow/EventRow';

const EventsList = ({
  events,
  betslip,
  favouriteMarkets,
  onMarketFavourite,
}) => {
  return events.map(event => (
    <EventRow
      key={event.id}
      event={event}
      betslip={betslip}
      favouriteMarkets={favouriteMarkets}
      onMarketFavourite={onMarketFavourite}
    />
  ));
};

export default EventsList;
