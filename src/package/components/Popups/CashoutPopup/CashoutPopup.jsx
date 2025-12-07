import React, { useEffect, useState } from 'react';
import Popup from '../../UI/Popup/Popup';
import { closePopup } from '../../../../redux/reducers/popups/popups.slice';
import { POPUPS_IDS } from '../configs/popup.configs';
import { useDispatch, useSelector } from 'react-redux';
import { Close__styled, Title__styled, Wrapper } from './CashoutPopup.styled';
import { useTranslation } from 'react-i18next';
import * as S from './CashoutPopup.styled';
import {
  selectCurrency,
  updateBalance,
} from '../../../../redux/reducers/auth/auth.slice';
import axios from 'axios';
import ButtonLoader from '../../UI/Button/ButtonLoader/ButtonLoader';
import CashoutCompleted from './CashoutCompleted';
import { API } from '@/api';

const CASHOUT_TYPES = {
  full: 1,
  partial: 2,
};

const CashoutPopup = ({ amount, getBetHistory, ticketId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [cashoutType, setCashoutType] = useState(CASHOUT_TYPES.full);
  const currency = useSelector(selectCurrency);
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cashoutDetails, setCashoutDetails] = useState(null);
  const [cashoutDetailsLoading, setCashoutDetailsLoading] = useState(true);

  const onClose = () => {
    dispatch(closePopup(POPUPS_IDS.CASHOUT));
  };

  function handleBlur(e) {
    if (e.target.value > cashoutDetails.max) {
      setValue({ type: 'max', amount: cashoutDetails.max.toTruncFixed() });
    } else if (e.target.value < cashoutDetails.min) {
      setValue({ type: 'min', amount: cashoutDetails.min.toTruncFixed() });
    }
  }

  useEffect(() => {
    axios
      .get(API.betSlip.cashoutDetails, { params: { id: ticketId } })
      .then(res => {
        setCashoutDetails(res);

        setValue({ type: 'min', amount: res?.min?.toTruncFixed() });
      })
      .finally(() => setCashoutDetailsLoading(false));
  }, []);

  const handleCashOut = () => {
    setLoading(true);

    axios
      .post(API.betSlip.preSubmitCashout, {
        ticketId,
        accept: true,
        amount,
        part:
          cashoutType === CASHOUT_TYPES.full
            ? 'all'
            : value.type || +value.amount,
      })
      .then(response => {
        const { token, delay } = response;

        if (!delay) {
          return token;
        }

        return new Promise(resolve => setTimeout(resolve, delay * 1000, token));
      })
      .then(token => axios.post(API.betSlip.submitCashout, { token }))
      .then(res => {
        dispatch(
          updateBalance({
            balance: res.currentBalance,
            displayBalance: res.displayBalance,
          }),
        );
        setCompleted(true);
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  };

  function onOk() {
    getBetHistory();

    onClose();
  }

  return (
    <Popup onClose={onClose}>
      <Wrapper completed={completed}>
        {cashoutDetailsLoading ? (
          <ButtonLoader />
        ) : (
          <>
            <Title__styled>{t('betSlip:cashout')}</Title__styled>
            <Close__styled onClick={onClose}>
              <svg>
                <use xlinkHref={'#close'} />
              </svg>
            </Close__styled>

            {completed ? (
              <CashoutCompleted
                onOk={onOk}
                amount={
                  cashoutType === CASHOUT_TYPES.full ? amount : value.amount
                }
              />
            ) : (
              <S.StyledCashout>
                <S.Section
                  active={cashoutType === CASHOUT_TYPES.full}
                  onClick={() => {
                    setCashoutType(CASHOUT_TYPES.full);
                  }}>
                  <S.Title>{t('fullCashout')}</S.Title>

                  <S.Amount>
                    {amount.toTruncFixed()} {currency}
                  </S.Amount>
                </S.Section>

                <S.Section
                  disabled={!cashoutDetails.partial}
                  active={cashoutType === CASHOUT_TYPES.partial}
                  onClick={() =>
                    cashoutDetails.partial &&
                    setCashoutType(CASHOUT_TYPES.partial)
                  }>
                  <S.Title>{t('partialCashout')}</S.Title>
                  <S.Label>Cashout Amount</S.Label>

                  <S.AmountGroup>
                    <S.Button
                      color="var(--bw-neutral-clr)"
                      onClick={() =>
                        setValue({
                          type: 'min',
                          amount: cashoutDetails.min.toTruncFixed(),
                        })
                      }>
                      {t('min')}
                    </S.Button>
                    <S.InputWrapper
                      min={
                        cashoutDetails.min
                          ? `${cashoutDetails.min.toTruncFixed()} ${currency}`
                          : ''
                      }
                      max={
                        cashoutDetails.max
                          ? `${cashoutDetails.max.toTruncFixed()} ${currency}`
                          : ''
                      }>
                      <input
                        onChange={e => setValue({ amount: e.target.value })}
                        value={value.amount}
                        type="number"
                        placeholder={t('amount')}
                        onBlur={handleBlur}
                      />
                    </S.InputWrapper>
                    <S.Button
                      color="var(--bw-neutral-clr)"
                      onClick={() =>
                        setValue({
                          type: 'max',
                          amount: cashoutDetails.max.toTruncFixed(),
                        })
                      }>
                      {t('max')}
                    </S.Button>
                  </S.AmountGroup>
                </S.Section>

                <S.ButtonGroup>
                  <S.Button type={'button'} onClick={onClose}>
                    {t('cancel')}
                  </S.Button>
                  <S.Button
                    disabled={loading}
                    type={'button'}
                    onClick={handleCashOut}
                    color="var(--bw-active-color)">
                    {loading ? <ButtonLoader /> : t('cashout')}
                  </S.Button>
                </S.ButtonGroup>
              </S.StyledCashout>
            )}
          </>
        )}
      </Wrapper>
    </Popup>
  );
};

export default CashoutPopup;
