import React, { Fragment, useMemo, useRef, useState } from 'react';
import {
  HistoryColumn__styled,
  HistoryColumn_cashout__styled,
  HistoryColumn_gain__styled,
  HistoryColumn_status__styled,
  HistoryColumnButton__styled,
  HistoryColumnButton_arrow__styled,
  HistoryColumnButtons__styled,
  HistoryRow__styled,
} from '../BetHistoryDesktop.styled';
import dayjs from 'dayjs';
import BetHistoryPrint from '../BetHistoryPrint/BetHistoryPrint';
import ReactToPrint from 'react-to-print';
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
import BetHistoryItemEvent from '@/package/sections/BetHistory/Desktop/BetHistoryItem/BetHistoryItemEvent';

const BetHistoryItem = ({ data, getBetHistory, isBonusAvailable }) => {
  const { kind, events, maxRate, status } = data;
  const [infoOpened, setInfoOpened] = useState(false);
  const componentRef = useRef();
  const { t } = useTranslation(['translation', 'betSlip', 'markets2']);
  const dispatch = useDispatch();

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
    <>
      <HistoryRow__styled
        onClick={() => setInfoOpened(prevState => !prevState)}>
        <HistoryColumn__styled>
          {dayjs(data.createdAt).format('DD/MM/YY HH:mm')}
        </HistoryColumn__styled>
        <HistoryColumn__styled>{data.id}</HistoryColumn__styled>
        <HistoryColumn__styled>
          {data.consistOf === 2 && `live`}
          {t(BET_TYPES[data.kind].toLowerCase())} ({data.events.length})
        </HistoryColumn__styled>
        <HistoryColumn__styled>
          {data.amount.toTruncFixed()} {data.currency}
        </HistoryColumn__styled>
        <HistoryColumn__styled success={!!bonusAmount}>
          {bonusAmount ? bonusAmount.toTruncFixed() : 0} {data.currency}
        </HistoryColumn__styled>
        <HistoryColumn__styled>
          {possibleWinning.toTruncFixed()}
          {!!bonusAmount && (
            <span style={{ color: 'var(--color-increment)', marginLeft: 5 }}>
              (+{bonusAmount.toTruncFixed()})
            </span>
          )}
          <span style={{ marginLeft: 5 }}>{data.currency}</span>
        </HistoryColumn__styled>
        <HistoryColumn_gain__styled
          style={{ color: `${TICKET_STATUSES[data.status].color}` }}>
          {wonAmount.toTruncFixed()} {data.currency}
        </HistoryColumn_gain__styled>
        <HistoryColumn_cashout__styled>
          <Button
            disabled={!data.cashout}
            onClick={e => {
              e.stopPropagation();
              dispatch(
                openPopup({
                  id: POPUPS_IDS.CASHOUT,
                  getBetHistory,
                  ticketId: data.id,
                  amount: data.cashout,
                }),
              );
            }}>
            {data.cashout
              ? `${data.cashout.toTruncFixed()} ${data.currency}`
              : t('betSlip:notAvailable')}
          </Button>
        </HistoryColumn_cashout__styled>
        <HistoryColumn_status__styled
          style={{ color: `${TICKET_STATUSES[data.status].color}` }}>
          {t(TICKET_STATUSES[data.status].status)}
          {data.isCashout === 1 && ` (cashout)`}
        </HistoryColumn_status__styled>
        <HistoryColumnButtons__styled>
          <div onClick={e => e.stopPropagation()}>
            <ReactToPrint
              trigger={() => (
                <HistoryColumnButton__styled type="button">
                  <svg>
                    <use xlinkHref={'#print'} />
                  </svg>
                </HistoryColumnButton__styled>
              )}
              content={() => componentRef.current}
            />
          </div>
          <div style={{ display: 'none' }}>
            <BetHistoryPrint ref={componentRef} bet={data} />
          </div>
          <HistoryColumnButton_arrow__styled active={infoOpened}>
            <svg>
              <use xlinkHref={'#arrow'} />
            </svg>
          </HistoryColumnButton_arrow__styled>
        </HistoryColumnButtons__styled>
      </HistoryRow__styled>
      {infoOpened &&
        data.events.map(event => {
          return <BetHistoryItemEvent key={event.id} event={event} />;
        })}
    </>
  );
};

export default BetHistoryItem;
