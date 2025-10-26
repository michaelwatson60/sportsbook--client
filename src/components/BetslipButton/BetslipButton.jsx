import React from 'react';
import { useTranslation } from 'react-i18next';
import './BetslipButton.scss';

const whiteLabelFlag = process.env.REACT_APP_LABEL_FLAG;

const whitelabel2 = whiteLabelFlag === 'whitelabel-2';

const BetslipButton = ({ count = 4, onClick }) => {
  const { t } = useTranslation();

  return (
    <div className="betslip-button" onClick={onClick}>
      <div className="betslip-button__inner">
        <div className="betslip-button__icon">
          <svg>
            <use xlinkHref={whitelabel2 ? '#betslipV2' : '#betslip'} />
          </svg>
        </div>
        {!whitelabel2 && (
          <span className="betslip-button__text">{t('betSlip')}</span>
        )}
        <div className="betslip-button__count">{count}</div>
      </div>
    </div>
  );
};

export default BetslipButton;
