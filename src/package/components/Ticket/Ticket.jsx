import React, { useState } from 'react';
import {
  Ticket__styled,
  TicketCheckbox__styled,
  TicketTitle__styled,
  TicketLive__styled,
  TicketAction__styled,
  TicketSimple__styled,
  TicketEvent__styled,
  TicketInfo__styled,
  TicketType__styled,
  TicketCoefficient__styled,
  TicketBet__styled,
  TicketBetSum__styled,
  TicketBetLabel__styled,
  TicketBetInput__styled,
  TicketBetWin__styled,
  TicketBody__styled,
  TicketRemove__styled,
  TicketSuccess__styled,
  TicketSuccessIcon__styled,
  TicketMessage__styled,
  TicketMessageIcon__styled,
  TicketMessageText__styled,
} from './Ticket.styled';
import Checkbox from '../UI/Checkbox/Checkbox';
import Button from '../UI/Button/Button';
import { BETSLIP_TYPES } from '../../sections/Betslip/constants/betslip.constants';
import { numberWithCommas } from '../../helpers/utils';
import { useEffect } from 'react';
import SuccessAnimation from '../SuccessAnimation/SuccessAnimation';
import { useTranslation } from 'react-i18next';
import { useOddFormat } from '../../providers/OddFormatProvider/OddFormatProvider';
const { SINGLE, SYSTEM } = BETSLIP_TYPES;

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
}) => {
  const { convertOdd } = useOddFormat();
  const { marketCode, T1, T2, name, h, rate, isLive, success } = bet;
  const [simple, setSimple] = useState(false);
  const { t } = useTranslation(['markets2', 'translation']);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onDelete();
      }, 2400);
    }
  }, [success]);

  return (
    <Ticket__styled error={error} success={success} ref={ticketRef}>
      {activeType === SYSTEM && (
        <TicketAction__styled>
          <TicketCheckbox__styled>
            <Checkbox checked={checked} onChange={onBetCheck} forTicket />
          </TicketCheckbox__styled>
          <TicketSimple__styled>
            <Button
              onClick={() => setSimple(prevState => !prevState)}
              icon={'b-button'}
              fill={simple ? 'var(--color-black)' : 'var(--color-black--05)'}
            />
          </TicketSimple__styled>
        </TicketAction__styled>
      )}
      <TicketBody__styled>
        <TicketInfo__styled>
          <TicketEvent__styled>
            <TicketTitle__styled>
              {T1} vs. {T2}
            </TicketTitle__styled>
          </TicketEvent__styled>
          <TicketType__styled>{t('markets:' + marketCode)}</TicketType__styled>
          <TicketCoefficient__styled>
            <span>
              {isLive && (
                <TicketLive__styled>{t('translation:live')}</TicketLive__styled>
              )}
              {name}
              {!!h && ` (${h})`}
            </span>
            <span>{convertOdd(rate)}</span>
          </TicketCoefficient__styled>
        </TicketInfo__styled>
        {activeType === SINGLE && (
          <TicketBet__styled>
            <TicketBetSum__styled>
              <TicketBetLabel__styled>
                <TicketBetInput__styled
                  placeholder="Stake"
                  value={amount}
                  onChange={onAmountChange}
                />
              </TicketBetLabel__styled>
            </TicketBetSum__styled>
            <TicketBetWin__styled>
              Win: {numberWithCommas(amount * rate, true)} {currency}
            </TicketBetWin__styled>
          </TicketBet__styled>
        )}

        {typeof error === 'string' && (
          <TicketMessage__styled className={'ellipsis'}>
            <TicketMessageIcon__styled>
              <svg>
                <use xlinkHref={'#error'} />
              </svg>
            </TicketMessageIcon__styled>
            <TicketMessageText__styled className={'ellipsis'} title={error}>
              {error}
            </TicketMessageText__styled>
          </TicketMessage__styled>
        )}
      </TicketBody__styled>
      <TicketRemove__styled>
        <Button onClick={onDelete} icon={'close'} fill={'#565555'} />
      </TicketRemove__styled>
      {success && (
        <TicketSuccess__styled>
          <TicketSuccessIcon__styled>
            <SuccessAnimation />
          </TicketSuccessIcon__styled>
        </TicketSuccess__styled>
      )}
    </Ticket__styled>
  );
};

export default Ticket;
