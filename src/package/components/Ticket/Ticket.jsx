import React, { useState } from 'react';
import Checkbox from '../UI/Checkbox/Checkbox';
import Button from '../UI/Button/Button';
import { BETSLIP_TYPES } from '../../sections/Betslip/constants/betslip.constants';
import { numberWithCommas } from '../../helpers/utils';
import { useEffect } from 'react';
import SuccessAnimation from '../SuccessAnimation/SuccessAnimation';
import { useTranslation } from 'react-i18next';
import { useOddFormat } from '../../providers/OddFormatProvider/OddFormatProvider';
import { useSelector } from 'react-redux';
import {
  selectEventById,
  selectPrice,
} from '@/redux/reducers/sport/sport.selector';
import { dispatch } from '@/redux/store';
import { updateBetslip } from '@/redux/reducers/betslip/betslip.slice';
import './Ticket.scss';
import useEvent from '@/hooks/useEvent';
import BetslipEventRowDetails from '@/package/sections/Betslip/components/BetslipEventRowTime/BetslipEventRowTime';
import BetslipEventRowTeams from '@/package/sections/Betslip/components/BetSlipEventRowTeam/BetslipEventRowTeams';

const { SINGLE, SYSTEM } = BETSLIP_TYPES;

const whiteLabelFlag = process.env.REACT_APP_LABEL_FLAG;
const whitelabel2 = whiteLabelFlag === 'whitelabel-2';

const Ticket = ({
  bet,
  activeType,
  checked,
  error,
  onDelete,
  amount,
  onAmountChange,
  onBetCheck,
  currency,
  ticketRef,
  setBetDisabled,
  loading,
}) => {
  const { convertOdd } = useOddFormat();
  const {
    marketCode,
    T1,
    T2,
    name,
    h,
    rate,
    isLive,
    success,
    ref,
    eventId,
    removed,
    param,
  } = bet;

  const { team1Name, team2Name, countryId, countryName, leagueName } =
    useEvent(eventId);

  const eventData = useSelector(state => selectEventById(state, eventId));
  const odd = useSelector(state => selectPrice(state, ref));
  const [simple, setSimple] = useState(false);
  const { t } = useTranslation(['markets2', 'translation']);

  useEffect(() => {
    if (success) {
      setBetDisabled(true);
      setTimeout(() => {
        onDelete();
        setBetDisabled(false);
      }, 2400);
    }
  }, [success]);

  useEffect(() => {
    if (!loading) {
      let updatedData = {};

      if (!eventData && (!removed || isLive)) {
        updatedData = {
          removed: true,
          isLive: false,
        };
      } else if (
        eventData &&
        odd &&
        (rate !== odd.rate || !!isLive !== !!eventData.isLive || removed)
      ) {
        updatedData = {
          rate: odd.rate,
          isLive: !!eventData.isLive,
          lastValue: odd.lastValue,
          removed: false,
        };
      } else if (eventData && !odd && !removed) {
        updatedData = {
          removed: true,
        };
      }
      if (Object.keys(updatedData).length > 0) {
        dispatch(
          updateBetslip({
            path: `bets>${ref}`,
            value: { ...bet, ...updatedData },
          }),
        );
      }
    }
  }, [loading, eventData, odd, rate, isLive, removed]);

  const ticketClass =
    `ticket` +
    (error ? ' ticket--error' : '') +
    (success ? ' ticket--success' : '');

  return (
    <div className={ticketClass} ref={ticketRef}>
      {activeType === SYSTEM && (
        <div className="ticket__action">
          <div className="ticket__checkbox">
            <Checkbox checked={checked} onChange={onBetCheck} forTicket />
          </div>
          <div className="ticket__simple">
            <Button
              onClick={() => setSimple(prev => !prev)}
              icon="b-button"
              fill={simple ? 'var(--color-black)' : 'var(--color-black--05)'}
            />
          </div>
        </div>
      )}

      <div className="ticket__body">
        <div className="ticket__info">
          <div className="ticket__event">
            {isLive && (
              <div className="ticket__live">{t('translation:live')}</div>
            )}
            <div className="ticket__title">
              {T1} vs. {T2}
            </div>
          </div>
          {whitelabel2 && (
            <>
              {isLive && (
                <BetslipEventRowDetails
                  eventId={eventId}
                  countryId={countryId}
                  countryName={countryName}
                  leagueName={leagueName}
                />
              )}
              {isLive && (
                <BetslipEventRowTeams
                  eventId={eventId}
                  T1={team1Name}
                  T2={team2Name}
                />
              )}
            </>
          )}

          <div className="ticket__type">{t('markets:' + marketCode)}</div>

          <div className="ticket__coefficient">
            <span>
              {name}
              {!!h && ` (${h})`} {!!param && ` [${param}]`}
            </span>
            <span>{convertOdd(rate)}</span>
          </div>
        </div>

        {activeType === SINGLE && (
          <div className="ticket__bet">
            <div className="ticket__bet-sum">
              <label className="ticket__bet-label">
                <input
                  className="ticket__bet-input"
                  placeholder="Stake"
                  value={amount}
                  onChange={onAmountChange}
                />
              </label>
            </div>
            <div className="ticket__bet-win">
              Win: {numberWithCommas(amount * rate, true)} {currency}
            </div>
          </div>
        )}

        {removed && (
          <div className="ticket__message ellipsis">
            <div className="ticket__message-icon">
              <svg>
                <use xlinkHref="#error" />
              </svg>
            </div>
            <div className="ticket__message-text ellipsis" title={error}>
              {t('unavailableOdd', {
                defaultValue: 'This odd is no longer available',
              })}
            </div>
          </div>
        )}

        {typeof error === 'string' && (
          <div className="ticket__message ellipsis">
            <div className="ticket__message-icon">
              <svg>
                <use xlinkHref="#error" />
              </svg>
            </div>
            <div className="ticket__message-text ellipsis" title={error}>
              {error}
            </div>
          </div>
        )}
      </div>

      <div className="ticket__remove">
        <Button
          onClick={onDelete}
          icon="close"
          fill="var(--color-active-contrast)"
        />
      </div>

      {success && (
        <div className="ticket__success">
          <div className="ticket__success-icon">
            <SuccessAnimation />
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticket;
