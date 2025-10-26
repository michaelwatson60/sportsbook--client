import React from 'react';
import { Link } from 'react-router-dom';
import './BetHistoryButton.scss';
const whiteLabelFlag = process.env.REACT_APP_LABEL_FLAG;

const whitelabel2 = whiteLabelFlag === 'whitelabel-2';

const BetHistoryButton = () => {
  return (
    <Link to="/bet-history" className="bet-history-button">
      <div className="bet-history-button__inner">
        <div className="bet-history-button__icon">
          <svg>
            <use xlinkHref={whitelabel2 ? '#history' : '#betslip'} />
          </svg>
        </div>
        {!whitelabel2 && (
          <span className="bet-history-button__text">
            Bet <br /> History
          </span>
        )}
      </div>
    </Link>
  );
};

export default BetHistoryButton;
