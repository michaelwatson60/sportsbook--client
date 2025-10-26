import React, { useMemo, useState } from 'react';

import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  BET_TYPES,
  TICKET_STATUSES,
} from '../../constants/betHistory.constants';
import Button from '../../../../components/UI/Button/Button';
import { getBetslipBonusPercent } from '../../../Betslip/helpers/betslip.helpers';
import { openPopup } from '@/redux/reducers/popups/popups.slice';
import { POPUPS_IDS } from '@/package/components/Popups/configs/popup.configs';
import './BetHistoryItemMobile.scss';
import BetHistoryItemEvent from '@/package/sections/BetHistory/Mobile/BetHistoryItemMobile/BetHistoryItemEvent';

const BetHistoryItemMobile = ({ data, getBetHistory, isBonusAvailable }) => {
  const { kind, events, maxRate, status } = data;
  const [gamesOpened, setGamesOpened] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation(['translation', 'betSlip']);

  const possibleWinning = data.maxRate * data.amount;
  const wonAmount = data.wonAmount;

  const eventsWithoutReturns = useMemo(
    () => events.filter(item => item.odds[0].status !== 2),
    [events],
  );

  const isBonusExist = useMemo(() => {
    if (
      !isBonusAvailable ||
      kind !== 2 ||
      ![0, 3].includes(status) ||
      eventsWithoutReturns.length < 5
    ) {
      return false;
    }
    return !eventsWithoutReturns.some(item => item.odds[0].rate < 1.11);
  }, [kind, eventsWithoutReturns, status]);

  const bonusPercent =
    isBonusExist && getBetslipBonusPercent(eventsWithoutReturns.length);
  const bonusAmount = isBonusExist ? (bonusPercent * maxRate) / 100 : 0;

  return (
    <div className="bet-history-item-mobile">
      {/* HEAD */}
      <div className="bet-history-item-mobile__head">
        <div className="bet-history-item-mobile__head-id">
          <div className="bet-history-item-mobile__head-id-circle" />
          <span>id {data.id}</span>
        </div>
        <div
          className="bet-history-item-mobile__head-status"
          style={{ color: `${TICKET_STATUSES[data.status].color}` }}>
          {t(TICKET_STATUSES[data.status].status)}
          {data.isCashout === 1 && ` (cashout)`}
        </div>
      </div>

      {/* BODY */}
      <div className="bet-history-item-mobile__body">
        <div className="bet-history-item-mobile__row">
          <span>{t('date')}</span>
          <span>{dayjs(data.createdAt).format('DD/MM/YY HH:mm')}</span>
        </div>

        <div className="bet-history-item-mobile__row">
          <span>{t('betType')}</span>
          <span>
            {data.consistOf === 2 && 'live'} {BET_TYPES[data.kind]} (
            {data.events.length})
          </span>
        </div>

        <div className="bet-history-item-mobile__row">
          <span>{t('amount')}</span>
          <span>
            {data.amount.toTruncFixed()} {data.currency}
          </span>
        </div>

        <div
          className={`bet-history-item-mobile__row${
            bonusAmount ? ' bet-history-item-mobile__row--success' : ''
          }`}>
          <span>{t('Bonus')}</span>
          <span>
            {bonusAmount ? bonusAmount.toTruncFixed() : 0} {data.currency}
          </span>
        </div>

        <div className="bet-history-item-mobile__row">
          <span>{t('possibleWinning')}</span>
          <span>
            {possibleWinning.toTruncFixed()}
            {!!bonusAmount && (
              <span style={{ color: 'var(--color-increment)', marginLeft: 5 }}>
                (+{bonusAmount.toTruncFixed()})
              </span>
            )}
            <span style={{ marginLeft: 5 }}>{data.currency}</span>
          </span>
        </div>

        <div
          className="bet-history-item-mobile__row"
          style={{ color: `${TICKET_STATUSES[data.status].color}` }}>
          <span>{t('gain', { ns: 'betSlip' })}</span>
          <span>
            {wonAmount.toTruncFixed()} {data.currency}
          </span>
        </div>

        {!!data.cashout > 0 && (
          <div className="bet-history-item-mobile__cashout">
            <div className="bet-history-item-mobile__cashout-button">
              <Button
                onClick={() => {
                  dispatch(
                    openPopup({
                      id: POPUPS_IDS.CASHOUT,
                      getBetHistory,
                      ticketId: data.id,
                      amount: data.cashout,
                    }),
                  );
                }}>
                {t('cashout')} {data.cashout.toTruncFixed()} {data.currency}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* GAMES */}
      {gamesOpened && (
        <div className="bet-history-item-mobile__games">
          {data.events.map(event => {
            return <BetHistoryItemEvent key={event.id} event={event} />;
          })}
        </div>
      )}

      {/* COLLAPSE */}
      <div
        className="bet-history-item-mobile__collapse"
        onClick={() => setGamesOpened(prev => !prev)}>
        <span>{t('betDetails')}</span>
        <span
          className={`bet-history-item-mobile__collapse-icon${
            gamesOpened ? ' bet-history-item-mobile__collapse-icon--active' : ''
          }`}>
          <svg>
            <use xlinkHref="#arrow" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default BetHistoryItemMobile;
