import React from 'react';
import {
  BetslipButton__styled,
  BetslipButtonContainer__styled,
  BetslipButtonCount__styled,
  BetslipButtonIcon__styled,
} from './BetslipButton.styled';

const BetslipButton = ({ count = 0, onClick }) => {
  const n = Number(count) || 0;
  if (n <= 0) {
    return null;
  }

  return (
    <BetslipButtonContainer__styled onClick={onClick}>
      <BetslipButton__styled>
        <BetslipButtonIcon__styled>
          <svg>
            <use xlinkHref="#betslip" />
          </svg>
        </BetslipButtonIcon__styled>
        <span>betslip</span>
        <BetslipButtonCount__styled>{n}</BetslipButtonCount__styled>
      </BetslipButton__styled>
    </BetslipButtonContainer__styled>
  );
};

export default BetslipButton;
