import EventRow from '../../../../components/EventRow/EventRow';
import ExpansionPanel from '../../../../components/ExpansionPanel/ExpansionPanel';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const EventsByLeague = ({
  eventsByLeague,
  betslip,
  favouriteMarkets,
  onMarketFavourite,
}) => {
  return eventsByLeague.map((league, i) => (
    <ExpansionPanel
      key={league.leagueId}
      name={`${league.leagueName}, ${league.countryName}`}
      league
      countryId={league.countryId}
      countryName={league.countryName}
      isOpen={i < 3}>
      {Object.keys(league.datesGroup)
        .sort(
          (a, b) =>
            dayjs(a, 'DD/MM/YYYY').toDate() - dayjs(b, 'DD/MM/YYYY').toDate(),
        )
        .map(date => (
          <ExpansionPanel key={date} date={date}>
            {league.datesGroup[date].map(event => (
              <EventRow
                key={event.id}
                event={event}
                betslip={betslip}
                favouriteMarkets={favouriteMarkets}
                onMarketFavourite={onMarketFavourite}
              />
            ))}
          </ExpansionPanel>
        ))}
    </ExpansionPanel>
  ));
};

export default EventsByLeague;
