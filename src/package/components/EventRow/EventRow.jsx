import React, { useMemo, useState } from 'react';
import {
  EventRow__styled,
  EventRowAction__styled,
  EventRowBet__styled,
  EventRowCommon__styled,
  EventRowCountryFlag__styled,
  EventRowDetails__styled,
  // EventRowFavourite__styled,
  EventRowInfo__styled,
  EventRowLigueName__styled,
  EventRowMain__styled,
  EventRowMore__styled,
  EventRowMoreAction__styled,
  EventRowOdds__styled,
  EventRowSport__styled,
  EventRowTeam__styled,
  EventRowTeamName__styled,
  EventRowTeams__styled,
  EventRowTime__styled,
  EventRowStatistic__styled,
  EventRowStatisticSvg__styled,
  EventRowSportIconWrapper,
  EventRowSportIcon__styled,
  EventRowSportSvg__styled,
} from './EventRow.styled';

import Button from '../UI/Button/Button';
import Odds from '../Odds/Odds';
import Flag from '../UI/Flag/Flag';
import dayjs from 'dayjs';
import SingleBets from '../SingleBets/SingleBets';
import { useEvents } from '../../sections/Events/Events';
import { useMediaQuery } from '@react-hook/media-query';
import {
  formatEvent,
  generateMarketsGroupForEventRow,
} from '../../helpers/utils';
import OddsSkeleton from '../Odds/Odds.skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { openPopup } from '@/redux/reducers/popups/popups.slice';
import { POPUPS_IDS } from '../Popups/configs/popup.configs';
import sportsSprite from '../../assets/images/sprites/sportsSprite.svg';
import { useTranslation } from 'react-i18next';
import { getTranslatedLeague } from '@/helpers/sportsbook.helpers';
import useEvent from '@/hooks/useEvent';
import { selectEventMarkets } from '@/redux/reducers/sport/sport.selector';
// import { useTheme } from 'styled-components';

const EventRow = ({
  event,
  betslip,
  onMarketFavourite,
  favouriteMarkets,
  simple,
}) => {
  const eventId = event.id;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    onEventClick,
    onOddClick,
    visibleMarketsTypes,
    isOddsLoading,
    isOthers,
  } = useEvents() || {};
  const [openCommon, setOpenCommon] = useState(false);

  const formatedEvent = formatEvent(event);

  const { name, isSingleLoading, singleEvent } = formatedEvent;
  const eventMarkets = useSelector(state => selectEventMarkets(state, eventId));

  const marketsGroup = useMemo(() => {
    return generateMarketsGroupForEventRow(eventMarkets);
  }, [eventMarkets]);

  const { team1Name, team2Name, sportId, startDate, countryName, leagueName } =
    useEvent(eventId);
  const openSingle = () => {
    if (!openCommon && !isSingleLoading && !singleEvent) {
      // onOpenSingle(eventId);
    }
    setOpenCommon(prev => !prev);
  };
  const isMobile = useMediaQuery('only screen and (max-width: 600px)');
  const onOdd = (odd, market) => {
    if (!odd.name) {
      odd.name = odd.n || odd.priceName;
    }
    onOddClick({
      ...odd,
      eventId,
      T1: team1Name,
      T2: team2Name,
      marketName: market.name,
      marketCode: market.code,
    });
  };

  const openStatistic = e => {
    e.stopPropagation();
    dispatch(
      openPopup({
        id: POPUPS_IDS.STATISTIC,
        eventId,
        team1: team1Name,
        team2: team2Name,
      }),
    );
  };

  return (
    <EventRow__styled className="event-row">
      <EventRowMain__styled>
        {isOthers && (
          <EventRowSportIconWrapper>
            <EventRowSportIcon__styled>
              <EventRowSportSvg__styled>
                <use xlinkHref={`${sportsSprite}#${sportId}`} />
              </EventRowSportSvg__styled>
            </EventRowSportIcon__styled>
          </EventRowSportIconWrapper>
        )}
        {/* {!isMobileM && !simple && (
          <EventRowCode__styled>
            <EventRowCodeNum__styled>{eventId}</EventRowCodeNum__styled>
          </EventRowCode__styled>
        )} */}
        <EventRowInfo__styled onClick={() => onEventClick(event)}>
          <EventRowDetails__styled className="event-row__details">
            <EventRowTime__styled>
              {dayjs.unix(startDate).format('DD/MM')} <span />
              {dayjs.unix(startDate).format('HH:mm')}
            </EventRowTime__styled>
            <EventRowCountryFlag__styled>
              <Flag country={countryName} />
            </EventRowCountryFlag__styled>
            <EventRowLigueName__styled
              title={
                t(`leagues:${getTranslatedLeague(leagueName || name)}`, {
                  defaultValue: leagueName || name,
                }) +
                ' ' +
                t(`countries:C__${countryName.replace(/ /g, '_')}`, {
                  defaultValue: countryName,
                })
              }>
              {t(`leagues:${getTranslatedLeague(leagueName || name)}`, {
                defaultValue: leagueName || name,
              })}
              <span />
              {t(`countries:C__${countryName.replace(/ /g, '_')}`, {
                defaultValue: countryName,
              })}
            </EventRowLigueName__styled>
          </EventRowDetails__styled>
          <EventRowBet__styled>
            <EventRowSport__styled>
              <EventRowTeams__styled>
                <EventRowTeam__styled>
                  {/* <EventRowScore__styled>1</EventRowScore__styled> */}
                  <EventRowTeamName__styled>
                    {t(`teams:${team1Name}`)}
                  </EventRowTeamName__styled>
                </EventRowTeam__styled>
                <EventRowTeam__styled>
                  {/* <EventRowScore__styled>1</EventRowScore__styled> */}
                  <EventRowTeamName__styled>
                    {t(`teams:${team2Name}`)}
                  </EventRowTeamName__styled>
                </EventRowTeam__styled>
              </EventRowTeams__styled>
              {sportId === 50 && (
                <EventRowStatistic__styled onClick={openStatistic}>
                  <EventRowStatisticSvg__styled>
                    <use xlinkHref="#chart" />
                  </EventRowStatisticSvg__styled>
                </EventRowStatistic__styled>
              )}
              {isMobile && !simple && (
                <EventRowMore__styled onClick={e => e.stopPropagation()}>
                  {/* <EventRowMoreAction__styled>
                  <Button icon={'plus'} />
                </EventRowMoreAction__styled> */}
                  <EventRowMoreAction__styled open={openCommon}>
                    <Button onClick={openSingle} icon={'down'} />
                  </EventRowMoreAction__styled>
                </EventRowMore__styled>
              )}
            </EventRowSport__styled>
            {!simple && (
              <EventRowAction__styled onClick={e => e.stopPropagation()}>
                {isOddsLoading ? (
                  <EventRowOdds__styled>
                    <OddsSkeleton count={2} />
                  </EventRowOdds__styled>
                ) : (
                  visibleMarketsTypes.map(type => {
                    return (
                      <EventRowOdds__styled key={type.code}>
                        <Odds
                          data={type}
                          onOddClick={onOdd}
                          market={marketsGroup[type.code] || {}}
                          betslip={betslip}
                        />
                      </EventRowOdds__styled>
                    );
                  })
                )}
                {!isMobile && (
                  <EventRowMore__styled>
                    {/* <EventRowMoreAction__styled>
                  <Button icon={'plus'} />
                </EventRowMoreAction__styled> */}
                    <EventRowMoreAction__styled open={openCommon}>
                      <Button onClick={openSingle} icon={'down'} />
                    </EventRowMoreAction__styled>
                  </EventRowMore__styled>
                )}
              </EventRowAction__styled>
            )}
          </EventRowBet__styled>
        </EventRowInfo__styled>
      </EventRowMain__styled>
      {openCommon && (
        <EventRowCommon__styled>
          <SingleBets
            isLoading={isSingleLoading}
            markets={singleEvent?.markets || []}
            groups={singleEvent?.marketsGroup || {}}
            onOddClick={onOdd}
            betslip={betslip}
            sportId={sportId}
            favouriteMarkets={favouriteMarkets}
            onMarketFavourite={onMarketFavourite}
            eventId={eventId}
          />
        </EventRowCommon__styled>
      )}
    </EventRow__styled>
  );
};

export default EventRow;
