import React, { Fragment } from 'react';
import { HistoryInfoLiveRow__styled } from '@/package/sections/BetHistory/Desktop/BetHistoryItem/BetHistoryItem.styles';
import LiveIndicator from '@/package/sections/Events/components/LiveIndicator/LiveIndicator';
import EventRowFLag from '@/package/sections/Events/components/EventRowFlag/EventRowFLag';
import EventRowLeague from '@/package/sections/Events/components/EventRowLeague/EventRowLeague';
import {
  HistoryColumn__styled,
  HistoryColumn_statusIcon__styled,
  HistoryColumn_teams__styled,
  HistoryColumnIcon__styled,
  HistoryInfo__styled,
} from '@/package/sections/BetHistory/Desktop/BetHistoryDesktop.styled';
import sportsSprite from '@/package/assets/images/sprites/sportsSprite.svg';
import dayjs from 'dayjs';
import { TICKET_STATUSES } from '@/package/sections/BetHistory/constants/betHistory.constants';
import { useTranslation } from 'react-i18next';
import BetslipEventRowDetails from '@/package/sections/Betslip/components/BetslipEventRowTime/BetslipEventRowTime';
import useEvent from '@/hooks/useEvent';
import BetslipEventRowTeams from '@/package/sections/Betslip/components/BetSlipEventRowTeam/BetslipEventRowTeams';
const whiteLabelFlag = process.env.REACT_APP_LABEL_FLAG;
const whitelabel2 = whiteLabelFlag === 'whitelabel-2';

const BetHistoryItemEvent = ({ event }) => {
  const { t } = useTranslation();

  const { result, sportId, team1, team2, id, startDate, odds, inf, isLive } =
    event;
  const { FT, HT = [0, 0] } = result?.score || {};
  const fullTime = FT || HT;

  const { countryId, countryName, leagueName } = useEvent(id);

  return (
    <Fragment>
      {isLive && countryId && whitelabel2 && (
        <HistoryInfoLiveRow__styled>
          <LiveIndicator />

          <BetslipEventRowDetails
            eventId={id}
            countryId={countryId}
            countryName={countryName}
            leagueName={leagueName}
          />

          {event.c && <EventRowFLag countryId={event.c} />}
          <EventRowLeague info={inf} />

          {isLive && (
            <BetslipEventRowTeams eventId={id} T1={team1} T2={team2} />
          )}
        </HistoryInfoLiveRow__styled>
      )}

      <HistoryInfo__styled>
        <HistoryColumnIcon__styled>
          <use xlinkHref={`${sportsSprite}#${sportId}`} />
        </HistoryColumnIcon__styled>{' '}
        <HistoryColumn__styled>
          {dayjs(startDate).format('DD/MM/YY HH:mm')}
        </HistoryColumn__styled>
        <HistoryColumn__styled>
          <span>{team1}</span>
          <span style={{ marginLeft: 5 }}>
            {fullTime[0] + ' ' + HT[0] + ' ' + (fullTime[0] - HT[0])}
          </span>
        </HistoryColumn__styled>
        <HistoryColumn_teams__styled>
          <span>{team2}</span>
          <span style={{ marginLeft: 5 }}>
            {fullTime[0] + ' ' + HT[0] + ' ' + (fullTime[0] - HT[0])}
          </span>
        </HistoryColumn_teams__styled>
        <HistoryColumn__styled>
          <span>{t('results')}</span> : {t(`markets:${odds[0].marketName}`)} (
          {odds[0].priceName}
          {odds[0].handicapValue ? ` ${odds[0].handicapValue}` : ''})
        </HistoryColumn__styled>
        <HistoryColumn__styled>
          {t('odds', { ns: 'betSlip' })}: {odds[0].rate.toTruncFixed()}
        </HistoryColumn__styled>
        <HistoryColumn_statusIcon__styled>
          <span>
            <svg>
              <use xlinkHref={`#${TICKET_STATUSES[odds[0].status].status}`} />
            </svg>
          </span>
        </HistoryColumn_statusIcon__styled>
      </HistoryInfo__styled>
    </Fragment>
  );
};

export default BetHistoryItemEvent;
