import React, { useState } from 'react';
import Button from '../../../../components/UI/Button/Button';
import Radiobutton from '../../../../components/UI/Radiobutton/Radiobutton';
import { numberWithCommas } from '../../../../helpers/utils';
import { useOddFormat } from '../../../../providers/OddFormatProvider/OddFormatProvider';
import {
  BetslipActionBet__styled,
  BetslipActionBook__styled,
  // BetslipActionBook__styled,
  BetslipAction__styled,
  BetslipCombinationGiftIcon__styled,
  BetslipCombinationGift__styled,
  BetslipCombinationSvg__styled,
  BetslipFinalBody__styled,
  BetslipFinalCount__styled,
  BetslipFinalInfoItem__styled,
  BetslipFinalInfoList__styled,
  BetslipFinalInfoName__styled,
  BetslipFinalInfo__styled,
  BetslipFinalSum__styled,
  BetslipFooter__styled,
  BetslipSettingsBody__styled,
  BetslipSettingsButton__styled,
  BetslipSettingsHead__styled,
  BetslipSettingsIcon__styled,
  BetslipSettingsItem__styled,
  BetslipSettingsList__styled,
  BetslipSettingsOpenSvg__styled,
  BetslipSettingsOpen__styled,
  BetslipSettingsProps__styled,
  BetslipSettingsRadio__styled,
  BetslipSettingsSvg__styled,
  BetslipSettingsText__styled,
  BetslipSettingsTitle__styled,
  BetslipSettings__styled,
  BetslipSetting__styled,
} from '../../Betslip.styled';
import {
  BETSLIP_ACCEPT_TYPES_IDS,
  BETSLIP_ACCEPT_TYPES_NAMES,
  BETSLIP_TYPES,
} from '../../constants/betslip.constants';
import { useTranslation } from 'react-i18next';

const allAcceptTypes = Object.values(BETSLIP_ACCEPT_TYPES_IDS);

const BetslipFooter = ({
  onBet,
  activeType,
  totalStake,
  totalWin,
  totalOdds,
  systemTicketsCount,
  acceptType,
  setAcceptType,
  isAuth,
  isLoading,
  currency,
  isBetDisabled,
  isBookLoading,
  onBook,
  bonusWin,
}) => {
  const { convertOdd } = useOddFormat();
  const [advancedSettings, setAdvancedSettings] = useState(false);
  const { t } = useTranslation();

  return (
    <BetslipFooter__styled>
      <BetslipFinalInfo__styled>
        {/* <BetslipFinalHead__styled>
          <BetslipFinalInfoName__styled>
            Number of bets
          </BetslipFinalInfoName__styled>
          <BetslipFinalSum__styled>46</BetslipFinalSum__styled>
        </BetslipFinalHead__styled> */}
        <BetslipFinalBody__styled>
          <BetslipFinalInfoList__styled>
            {activeType === BETSLIP_TYPES.SYSTEM && (
              <BetslipFinalInfoItem__styled>
                <BetslipFinalInfoName__styled>
                  {t('betSlip:numberOfBets')}
                </BetslipFinalInfoName__styled>
                <BetslipFinalSum__styled>
                  {systemTicketsCount}
                </BetslipFinalSum__styled>
              </BetslipFinalInfoItem__styled>
            )}
            {activeType === BETSLIP_TYPES.MULTIPLE && (
              <BetslipFinalInfoItem__styled>
                <BetslipFinalInfoName__styled>
                  {t('betSlip:totalOdds')}
                </BetslipFinalInfoName__styled>
                <BetslipFinalSum__styled>
                  {convertOdd(totalOdds)}
                </BetslipFinalSum__styled>
              </BetslipFinalInfoItem__styled>
            )}
            <BetslipFinalInfoItem__styled>
              <BetslipFinalInfoName__styled>
                {t('betSlip:totalStake')}
              </BetslipFinalInfoName__styled>
              <BetslipFinalSum__styled>
                {numberWithCommas(totalStake, true)} {currency}
              </BetslipFinalSum__styled>
            </BetslipFinalInfoItem__styled>
            {!!bonusWin && (
              <BetslipFinalInfoItem__styled>
                <BetslipFinalInfoName__styled>
                  Extra Winnings
                </BetslipFinalInfoName__styled>
                <BetslipFinalCount__styled>
                  <BetslipCombinationGift__styled>
                    <BetslipCombinationGiftIcon__styled>
                      <BetslipCombinationSvg__styled>
                        <use xlinkHref={'#gift'} />
                      </BetslipCombinationSvg__styled>
                    </BetslipCombinationGiftIcon__styled>
                  </BetslipCombinationGift__styled>
                  <BetslipFinalSum__styled>
                    {numberWithCommas(bonusWin, true)} {currency}
                  </BetslipFinalSum__styled>
                </BetslipFinalCount__styled>
              </BetslipFinalInfoItem__styled>
            )}
            <BetslipFinalInfoItem__styled>
              <BetslipFinalInfoName__styled>
                Total Win
              </BetslipFinalInfoName__styled>
              <BetslipFinalSum__styled>
                {numberWithCommas(totalWin + bonusWin, true)} {currency}
              </BetslipFinalSum__styled>
            </BetslipFinalInfoItem__styled>
          </BetslipFinalInfoList__styled>
        </BetslipFinalBody__styled>
      </BetslipFinalInfo__styled>
      <BetslipAction__styled>
        <BetslipActionBet__styled>
          <Button
            disabled={isBetDisabled || !totalStake}
            isLoading={isLoading}
            onClick={onBet}
            text={`${isAuth ? '' : 'Login & '}place bet`}
          />
        </BetslipActionBet__styled>
        <BetslipActionBook__styled>
          <Button isLoading={isBookLoading} text={'book'} onClick={onBook} />
        </BetslipActionBook__styled>
        <BetslipSettings__styled>
          <BetslipSettingsHead__styled>
            <BetslipSettingsButton__styled
              onClick={() => setAdvancedSettings(prevState => !prevState)}>
              <BetslipSettingsIcon__styled>
                <BetslipSettingsSvg__styled>
                  <use xlinkHref={'#settings'} />
                </BetslipSettingsSvg__styled>
              </BetslipSettingsIcon__styled>
              <BetslipSettingsText__styled>
                {BETSLIP_ACCEPT_TYPES_NAMES[acceptType]}
              </BetslipSettingsText__styled>
              <BetslipSettingsOpen__styled open={advancedSettings}>
                <BetslipSettingsOpenSvg__styled>
                  <use xlinkHref={'#down'} />
                </BetslipSettingsOpenSvg__styled>
              </BetslipSettingsOpen__styled>
            </BetslipSettingsButton__styled>
          </BetslipSettingsHead__styled>
          <BetslipSettingsBody__styled active={advancedSettings}>
            <BetslipSettingsTitle__styled>
              Odds change settings
            </BetslipSettingsTitle__styled>
            <BetslipSettingsProps__styled>
              <BetslipSettingsList__styled>
                {allAcceptTypes.map(id => (
                  <BetslipSettingsItem__styled
                    key={id}
                    onClick={() => setAcceptType(id)}>
                    <BetslipSettingsRadio__styled>
                      <Radiobutton active={acceptType === id} />
                    </BetslipSettingsRadio__styled>
                    <BetslipSetting__styled>
                      {BETSLIP_ACCEPT_TYPES_NAMES[id]}
                    </BetslipSetting__styled>
                  </BetslipSettingsItem__styled>
                ))}
              </BetslipSettingsList__styled>
            </BetslipSettingsProps__styled>
          </BetslipSettingsBody__styled>
        </BetslipSettings__styled>
      </BetslipAction__styled>
    </BetslipFooter__styled>
  );
};

export default BetslipFooter;
