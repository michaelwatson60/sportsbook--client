import React, { memo, useMemo, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import LiveRowCommon from './components/LiveRowCommon/LiveRowCommon';
import LiveRowMain from './components/LiveRowMain/LiveRowMain';
import LiveRowWrapper from './components/LiveRowWrapper/LiveRowWrapper';
import EventRowInfoWrapper from '../EventRowInfoWrapper/EventRowInfoWrapper';
import EventRowDetails from '../EventRowDetails/EventRowDetails';
import LiveIndicator from '../LiveIndicator/LiveIndicator';
import EventRowTime from '../EventRowTime/EventRowTime';
import EventRowFLag from '../EventRowFlag/EventRowFLag';
import EventRowLeague from '../EventRowLeague/EventRowLeague';
import EventRowBottom from '../../../../components/EventRowBottom/EventRowBottom';
import EventRowTeamsWrapper from '../EventRowTeamsWrapper/EventRowTeamsWrapper';
import EventRowTeams from '../EventRowTeams/EventRowTeams';
import EventRowMore from '../EventRowMore/EventRowMore';
import EventRowActions from '../EventRowActions/EventRowActions';
import EventRowOdds from '../EventRowOdds/EventRowOdds';
import { dispatch } from '@/redux/store';
import {
  selectMatchTrackerId,
  setMatchTrackerId,
} from '@/redux/reducers/live/live.slice';
import { MatchTrackerButton } from './LiveEventRow.styled';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  selectEventById,
  selectEventMarkets,
  selectEventScore,
  selectEventStatus,
  selectEventTime,
} from '@/redux/reducers/sport/sport.selector';
import useEvent from '@/hooks/useEvent';
import { generateMarketsGroupForEventRow } from '@/package/helpers/utils';

const LiveEventRow = ({
  visibleMarketsTypes,
  onOddClick,
  betslip,
  onEventClick,
  onMarketFavourite,
  favouriteMarkets,
  simple,
  eventId,
}) => {
  const event = useSelector(state => selectEventById(state, eventId));
  const { team1Name, team2Name, countryId, countryName, leagueName, sportId } =
    useEvent(eventId);

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const activeMatchTrackerId = useSelector(selectMatchTrackerId);
  const eventMarkets = useSelector(state => selectEventMarkets(state, eventId));
  const marketsGroup = useMemo(() => {
    return generateMarketsGroupForEventRow(eventMarkets);
  }, [eventMarkets]);
  const sc = useSelector(state => selectEventScore(state, eventId));
  const eventStatus = useSelector(state => selectEventStatus(state, eventId));
  const eventTime = useSelector(state => selectEventTime(state, eventId));
  const { GOAL, T } = sc;

  const isMobile = useMediaQuery('only screen and (max-width: 600px)');
  const isDesktop = useMediaQuery('only screen and (min-width: 1025px)');

  const onOdd = (odd, market) => {
    onOddClick({
      ...odd,
      eventId,
      T1: team1Name,
      T2: team2Name,
      marketName: market.name,
      marketCode: market.code,
    });
  };

  const score = GOAL || T || [0, 0];

  return (
    <LiveRowWrapper>
      <LiveRowMain>
        {/* {!isMobileM && !simple && <EventRowId id={event.id} />} */}
        <EventRowInfoWrapper onClick={() => onEventClick(event.id)}>
          <EventRowDetails>
            {/* <EventRowFavourite /> */}
            {isDesktop && (
              <MatchTrackerButton
                title={t('matchTracker')}
                onClick={e => {
                  e.stopPropagation();
                  dispatch(setMatchTrackerId(event.id));
                }}
                active={event.id === activeMatchTrackerId}>
                {/*{MATCH_TRACKER_SETTINGS[event.s].fieldIcon}*/}
              </MatchTrackerButton>
            )}
            <LiveIndicator />
            <EventRowTime
              period={eventStatus}
              time={Math.ceil(eventTime / 60)}
            />
            <EventRowFLag countryName={countryName} countryId={countryId} />
            <EventRowLeague info={`${countryName}. ${leagueName}`} />
          </EventRowDetails>
          <EventRowBottom>
            <EventRowTeamsWrapper>
              <EventRowTeams
                T1={team1Name}
                T2={team2Name}
                score1={score[0]}
                score2={score[1]}
              />
              {/* <EventRowStatistic eventId={event.id} team1={t1.n} team2={t2.n} /> */}
              {isMobile && !simple && (
                <EventRowMore isOpen={isOpen} setIsOpen={setIsOpen} />
              )}
            </EventRowTeamsWrapper>
            {!simple && (
              <EventRowActions onClick={e => e.stopPropagation()}>
                <EventRowOdds
                  visibleMarketsTypes={visibleMarketsTypes}
                  marketsGroup={marketsGroup}
                  onOdd={onOdd}
                  betslip={betslip}
                />
                {!isMobile && (
                  <EventRowMore isOpen={isOpen} setIsOpen={setIsOpen} />
                )}
              </EventRowActions>
            )}
          </EventRowBottom>
        </EventRowInfoWrapper>
      </LiveRowMain>
      {isOpen && (
        <LiveRowCommon
          onOdd={onOdd}
          betslip={betslip}
          sportId={sportId}
          favouriteMarkets={favouriteMarkets}
          onMarketFavourite={onMarketFavourite}
          eventId={eventId}
        />
      )}
    </LiveRowWrapper>
  );
};

export default memo(LiveEventRow);
