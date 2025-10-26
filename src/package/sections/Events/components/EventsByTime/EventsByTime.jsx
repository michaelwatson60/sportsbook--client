import EventRow from '../../../../components/EventRow/EventRow';
import ExpansionPanel from '../../../../components/ExpansionPanel/ExpansionPanel';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const EventsByTime = ({
  eventsByTime,
  betslip,
  favouriteMarkets,
  onMarketFavourite,
}) => {
  return Object.keys(eventsByTime)
    .sort(
      (a, b) =>
        dayjs(a, 'DD/MM/YYYY').toDate() - dayjs(b, 'DD/MM/YYYY').toDate(),
    )
    .map((date, i) => (
      <ExpansionPanel key={date} date={date} isOpen={i < 3}>
        {eventsByTime[date].events.map(event => {
          return (
            <EventRow
              key={event.id}
              event={event}
              betslip={betslip}
              favouriteMarkets={favouriteMarkets}
              onMarketFavourite={onMarketFavourite}
            />
          );
        })}
      </ExpansionPanel>
    ));
};

export default EventsByTime;
