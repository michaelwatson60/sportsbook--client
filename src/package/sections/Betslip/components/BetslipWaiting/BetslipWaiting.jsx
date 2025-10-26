import React, { useEffect, useState } from 'react';
import ButtonLoader from '../../../../components/UI/Button/ButtonLoader/ButtonLoader';
import {
  BetslipWaitingText__styled,
  BetslipWaitingTimer__styled,
  BetslipWaiting__styled,
} from '../../Betslip.styled';

const BetslipWaiting = ({ requestDelay }) => {
  const [timer, setTimer] = useState(requestDelay);

  useEffect(() => {
    if (requestDelay > 0) {
      setTimer(requestDelay);
    }
  }, [requestDelay]);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setTimer(prev => {
          if (prev > 0) {
            return prev - 1;
          }
          return prev;
        }),
      1000,
    );

    return () => clearInterval(intervalId);
  }, []);

  return (
    <BetslipWaiting__styled>
      {!!timer && (
        <BetslipWaitingTimer__styled>{timer}</BetslipWaitingTimer__styled>
      )}
      <BetslipWaitingText__styled>Please wait...</BetslipWaitingText__styled>
      <ButtonLoader big />
    </BetslipWaiting__styled>
  );
};

export default BetslipWaiting;
