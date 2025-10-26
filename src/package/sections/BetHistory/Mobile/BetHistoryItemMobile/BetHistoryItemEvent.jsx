import React from 'react';
import sportsSprite from '@/package/assets/images/sprites/sportsSprite.svg';
import dayjs from 'dayjs';
import { TICKET_STATUSES } from '@/package/sections/BetHistory/constants/betHistory.constants';
import { useTranslation } from 'react-i18next';
import useEvent from '@/hooks/useEvent';
import { useSelector } from 'react-redux';
import {
  selectEventStatus,
  selectEventTime,
} from '@/redux/reducers/sport/sport.selector';
import EventRowTime from '@/package/sections/Events/components/EventRowTime/EventRowTime';

const whiteLabelFlag = process.env.REACT_APP_LABEL_FLAG;
const whitelabel2 = whiteLabelFlag === 'whitelabel-2';

const BetHistoryItemEvent = ({ event }) => {
  const { t } = useTranslation();

  const { result, sportId, team1, team2, id, startDate, odds } = event;
  const { FT, HT = [0, 0] } = result?.score || {};
  const fullTime = FT || HT;

  const { leagueName } = useEvent(id);
  const eventStatus = useSelector(state => selectEventStatus(state, event.id));
  const eventTime = useSelector(state => selectEventTime(state, event.id));

  return (
    <div className="bet-history-item-mobile__game" key={id}>
      <div className="bet-history-item-mobile__game-head">{leagueName}</div>
      <div className="bet-history-item-mobile__game-body">
        <div className="bet-history-item-mobile__row">
          <div className="bet-history-item-mobile__game-info">
            <svg className="bet-history-item-mobile__game-team-icon">
              <use xlinkHref={`${sportsSprite}#${sportId}`} />
            </svg>

            <div className="bet-history-item-mobile__game-teams">
              <div className="bet-history-item-mobile__game-date">
                {dayjs(startDate).format('DD/MM/YY HH:mm')}
                {whitelabel2 && (
                  <EventRowTime
                    period={eventStatus}
                    time={Math.ceil(eventTime / 60)}
                  />
                )}
              </div>

              <div className="bet-history-item-mobile__game-team">
                <span>{team1}</span>
                <span className="bet-history-item-mobile__game-team-score">
                  <span className="bet-history-item-mobile__game-team-score-item">
                    {fullTime[0]}
                  </span>
                  {HT[0] + ' ' + (fullTime[0] - HT[0])}
                </span>
              </div>

              <div className="bet-history-item-mobile__game-team">
                <span>{team2}</span>
                <span className="bet-history-item-mobile__game-team-score">
                  <span className="bet-history-item-mobile__game-team-score-item">
                    {fullTime[1]}
                  </span>
                  {HT[1] + ' ' + (fullTime[1] - HT[1])}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bet-history-item-mobile__row">
          <span>{t('results')}</span>
          <span>
            {t(`markets:${odds[0].marketName}`)} ({odds[0].priceName}
            {odds[0].handicapValue ? ` ${odds[0].handicapValue}` : ''})
          </span>
        </div>

        <div className="bet-history-item-mobile__row">
          <span>{t('odds', { ns: 'betSlip' })}</span>
          <span>{odds[0].rate.toTruncFixed()}</span>
        </div>

        <div className="bet-history-item-mobile__row">
          <span>{t('status')}</span>
          <span className="bet-history-item-mobile__game-status-icon">
            <svg>
              <use xlinkHref={`#${TICKET_STATUSES[odds[0].status].status}`} />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BetHistoryItemEvent;
