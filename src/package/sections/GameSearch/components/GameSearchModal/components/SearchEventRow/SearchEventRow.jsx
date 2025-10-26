import dayjs from 'dayjs';
import React from 'react';
import {
  EventRowBet__styled,
  EventRowCountryFlag__styled,
  EventRowDetails__styled,
  EventRowInfo__styled,
  EventRowLigueName__styled,
  EventRowSport__styled,
  EventRowTeamName__styled,
  EventRowTeams__styled,
  EventRowTeam__styled,
  EventRowTime__styled,
} from '../../../../../../components/EventRow/EventRow.styled';
import Flag from '../../../../../../components/UI/Flag/Flag';
import { SearchEventsRow__styled } from './SearchEventRow.styled';

const SearchEventRow = ({
  event,
  onEventClick,
  countryId,
  league,
  country,
}) => {
  const { info = {}, startDate } = event;

  const { T1, T2 } = info;
  return (
    <SearchEventsRow__styled>
      <EventRowInfo__styled onClick={() => onEventClick(event)}>
        <EventRowDetails__styled>
          {/* <EventRowLive__styled>Live</EventRowLive__styled> */}
          <EventRowTime__styled>
            {dayjs(startDate).format('DD/MM')} <span />
            {dayjs(startDate).format('HH:mm')}
          </EventRowTime__styled>
          <EventRowCountryFlag__styled>
            <Flag id={countryId} />
          </EventRowCountryFlag__styled>
          <EventRowLigueName__styled className={'ellipsis'}>
            {league} <span /> {country}
          </EventRowLigueName__styled>
        </EventRowDetails__styled>
        <EventRowBet__styled>
          <EventRowSport__styled>
            <EventRowTeams__styled>
              <EventRowTeam__styled>
                {/* <EventRowScore__styled>1</EventRowScore__styled> */}
                <EventRowTeamName__styled>{T1}</EventRowTeamName__styled>
              </EventRowTeam__styled>
              <EventRowTeam__styled>
                {/* <EventRowScore__styled>1</EventRowScore__styled> */}
                <EventRowTeamName__styled>{T2}</EventRowTeamName__styled>
              </EventRowTeam__styled>
            </EventRowTeams__styled>
          </EventRowSport__styled>
        </EventRowBet__styled>
      </EventRowInfo__styled>
    </SearchEventsRow__styled>
  );
};

export default SearchEventRow;
