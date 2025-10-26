import dayjs from 'dayjs';
import React from 'react';
import {
  EventRowBet__styled,
  EventRowCountryFlag__styled,
  EventRowDetails__styled,
  EventRowInfo__styled,
  EventRowLigueName__styled,
  EventRowSportIcon__styled,
  EventRowSportSvg__styled,
  EventRowSport__styled,
  EventRowTeamName__styled,
  EventRowTeams__styled,
  EventRowTeam__styled,
  EventRowTime__styled,
} from '@/package/components/EventRow/EventRow.styled';
import Flag from '../../../../../../components/UI/Flag/Flag';
import { SearchEventsRow__styled } from './SearchEventRow.styled';
import sportsSprite from '../../../../../../assets/images/sprites/sportsSprite.svg';
import { getTranslatedLeague } from '@/helpers/sportsbook.helpers';
import { useTranslation } from 'react-i18next';
import useEvent from '@/hooks/useEvent';
import LiveIndicator from '@/package/sections/Events/components/LiveIndicator/LiveIndicator';
import EventRowTime from '@/package/sections/Events/components/EventRowTime/EventRowTime';
import { useSelector } from 'react-redux';
import {
  selectEventStatus,
  selectEventTime,
} from '@/redux/reducers/sport/sport.selector';

const SearchEventRow = ({ event, onEventClick }) => {
  const {
    team1Name,
    team2Name,
    countryName,
    sportId,
    countryId,
    leagueName,
    startDate,
    isLive,
  } = useEvent(event.id);
  const eventStatus = useSelector(state => selectEventStatus(state, event.id));
  const eventTime = useSelector(state => selectEventTime(state, event.id));
  const { t } = useTranslation();

  return (
    <SearchEventsRow__styled onClick={() => onEventClick(event)}>
      <EventRowSportIcon__styled>
        <EventRowSportSvg__styled>
          <use xlinkHref={`${sportsSprite}#${sportId}`} />
        </EventRowSportSvg__styled>
      </EventRowSportIcon__styled>
      <EventRowInfo__styled>
        <EventRowDetails__styled>
          {/* <EventRowLive__styled>Live</EventRowLive__styled> */}
          {isLive ? (
            <>
              <LiveIndicator />
              <EventRowTime
                period={eventStatus}
                time={Math.ceil(eventTime / 60)}
              />
            </>
          ) : (
            <EventRowTime__styled>
              {dayjs.unix(startDate).format('DD/MM')} <span />
              {dayjs.unix(startDate).format('HH:mm')}
            </EventRowTime__styled>
          )}
          <EventRowCountryFlag__styled>
            <Flag country={countryName} id={countryId} />
          </EventRowCountryFlag__styled>
          <EventRowLigueName__styled
            title={`${t(`leagues:${getTranslatedLeague(leagueName)}`, {
              defaultValue: leagueName,
            })} - ${t(`countries:C__${countryName.replace(/ /g, '_')}`, {
              defaultValue: countryName,
            })}`}
            className={'ellipsis'}>
            {t(`leagues:${getTranslatedLeague(leagueName)}`, {
              defaultValue: leagueName,
            })}
            <span />
            {t(`countries:C__${countryName.replace(/ /g, '_')}`, {
              defaultValue: countryName,
            })}
          </EventRowLigueName__styled>
        </EventRowDetails__styled>
        <EventRowBet__styled>
          <EventRowSport__styled>
            <EventRowTeams__styled search>
              <EventRowTeam__styled>
                {/* <EventRowScore__styled>1</EventRowScore__styled> */}
                <EventRowTeamName__styled>{team1Name}</EventRowTeamName__styled>
              </EventRowTeam__styled>
              <EventRowTeam__styled>
                {/* <EventRowScore__styled>1</EventRowScore__styled> */}
                <EventRowTeamName__styled>{team2Name}</EventRowTeamName__styled>
              </EventRowTeam__styled>
            </EventRowTeams__styled>
          </EventRowSport__styled>
        </EventRowBet__styled>
      </EventRowInfo__styled>
    </SearchEventsRow__styled>
  );
};

export default SearchEventRow;
