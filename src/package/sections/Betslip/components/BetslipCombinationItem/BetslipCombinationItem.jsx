import React from 'react';
import {
  BetslipCombinationAction__styled,
  BetslipCombinationBet__styled,
  BetslipCombinationGiftIcon__styled,
  BetslipCombinationGiftPercent__styled,
  BetslipCombinationGift__styled,
  BetslipCombinationInput__styled,
  BetslipCombinationLabel__styled,
  BetslipCombinationMultiple__styled,
  BetslipCombinationName__styled,
  BetslipCombinationSvg__styled,
  BetslipCombination__styled,
} from '../../Betslip.styled';
import { useTranslation } from 'react-i18next';

const BetslipCombinationItem = ({
  name,
  value,
  onChange,
  rate = 1,
  giftPercent,
}) => {
  const { t } = useTranslation();
  return (
    <BetslipCombination__styled>
      <BetslipCombinationName__styled>{name}</BetslipCombinationName__styled>
      <BetslipCombinationAction__styled>
        {giftPercent && (
          <BetslipCombinationGift__styled>
            <BetslipCombinationGiftIcon__styled>
              <BetslipCombinationSvg__styled>
                <use xlinkHref={'#gift'} />
              </BetslipCombinationSvg__styled>
            </BetslipCombinationGiftIcon__styled>
            <BetslipCombinationGiftPercent__styled>
              {giftPercent}%
            </BetslipCombinationGiftPercent__styled>
          </BetslipCombinationGift__styled>
        )}
        <BetslipCombinationMultiple__styled>
          {rate}x
        </BetslipCombinationMultiple__styled>
        <BetslipCombinationBet__styled>
          <BetslipCombinationLabel__styled>
            <BetslipCombinationInput__styled
              placeholder={t('betSlip:stake')}
              value={value}
              onChange={onChange}
              type="tel"
            />
          </BetslipCombinationLabel__styled>
        </BetslipCombinationBet__styled>
      </BetslipCombinationAction__styled>
    </BetslipCombination__styled>
  );
};

export default BetslipCombinationItem;
