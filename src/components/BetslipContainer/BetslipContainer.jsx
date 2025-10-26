import { useDispatch, useSelector } from 'react-redux';
import Betslip from '../../package/sections/Betslip/Betslip';
import {
  selectBalance,
  selectCurrency,
  selectIsAuth,
} from '../../redux/reducers/auth/auth.slice';
import {
  clearBetslipBook,
  closeBetslip,
  removeBet,
  resetBetslip,
  selectBetslip,
  toggleBetslipLoading,
  updateBetslip,
} from '../../redux/reducers/betslip/betslip.slice';
import {
  betslipBookThunk,
  placeBetThunk,
} from '../../redux/reducers/betslip/betslip.thunk';
import { selectIsSportBonusAvailable } from '../../redux/reducers/configs/configs.slice';
import { getRequestBody } from './utils';
import axios from 'axios';
import { useState } from 'react';

const BetslipContainer = () => {
  const dispatch = useDispatch();
  const betslip = useSelector(selectBetslip);
  const isAuth = useSelector(selectIsAuth);
  const currency = useSelector(selectCurrency);
  const balance = useSelector(selectBalance);
  const isBonusAvailable = useSelector(selectIsSportBonusAvailable);
  const [requestDelay, setRequestDelay] = useState(0);

  const onClose = () => {
    dispatch(closeBetslip());
  };

  const onBetDelete = ref => {
    dispatch(removeBet(ref));
  };

  const onPlaceBet = async ({
    bets,
    accept,
    isSingle,
    amount,
    isSystem,
    p,
  }) => {
    const body = getRequestBody({
      bets,
      accept,
      isSingle,
      amount,
      isSystem,
      p,
    });
    dispatch(toggleBetslipLoading(true));
    const response = await axios.post(`sportsbook/pre-submit-bet`, {
      ...body,
      sp: 'v2',
    });
    const { delay, token } = response;
    setRequestDelay(delay);
    setTimeout(async () => {
      await dispatch(
        placeBetThunk({
          bets: isSingle ? bets.filter(bet => bet.amount > 0) : bets,
          accept,
          isSingle,
          amount,
          isSystem,
          p,
          token,
        }),
      );
      setRequestDelay(0);
    }, delay * 1000); // Simulate delay
  };

  const onBook = () => {
    dispatch(betslipBookThunk());
  };

  const onReset = () => {
    dispatch(resetBetslip());
  };

  const clearBook = () => {
    dispatch(clearBetslipBook());
  };

  return (
    <Betslip
      betslip={betslip}
      onPlaceBet={onPlaceBet}
      onClose={onClose}
      onBetDelete={onBetDelete}
      updateBetslip={params => dispatch(updateBetslip(params))}
      isAuth={isAuth}
      currency={currency}
      balance={balance}
      onBook={onBook}
      onReset={onReset}
      clearBook={clearBook}
      isBonusAvailable={isBonusAvailable}
      requestDelay={requestDelay}
    />
  );
};

export default BetslipContainer;
