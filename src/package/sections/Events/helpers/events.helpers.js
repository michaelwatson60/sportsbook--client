import dayjs from 'dayjs';
import { store } from '@/redux/store';

export function getGroupedEventsByLeague(events) {
  const group = {};
  const countriesData = store.getState()?.sport?.countries;
  const leaguesData = store.getState()?.sport?.leagues;
  events.forEach(event => {
    const { league, country, startDate } = event;
    const leagueId = league?.id;
    const countryId = country?.id;
    const countryName = countriesData?.[countryId]?.name;
    const leagueName = leaguesData?.[leagueId]?.name;
    const eventDate = dayjs.unix(startDate).format('DD/MM/YYYY');

    if (!group[leagueId]) {
      return (group[leagueId] = {
        leagueId,
        leagueName,
        countryName,
        countryId,
        datesGroup: {
          [eventDate]: [event],
        },
      });
    }

    if (!group[leagueId].datesGroup[eventDate]) {
      return (group[leagueId].datesGroup[eventDate] = [event]);
    }
    group[leagueId].datesGroup[eventDate].push(event);
  });
  return group;
}

export function getGroupedEventsByDate(events) {
  const group = {};
  const countriesData = store.getState()?.sport?.countries;
  const leaguesData = store.getState()?.sport?.leagues;
  events.forEach(event => {
    const { league, country, startDate } = event;
    const leagueId = league?.id;
    const countryId = country?.id;
    const countryName = countriesData?.[countryId]?.name;
    const leagueName = leaguesData?.[leagueId]?.name;
    const eventDate = dayjs.unix(startDate).format('DD/MM/YYYY');

    if (!group[eventDate]) {
      return (group[eventDate] = {
        leagueId,
        leagueName,
        countryName,
        countryId,
        events: [event],
      });
    }

    group[eventDate].events.push(event);
  });
  return group;
}
