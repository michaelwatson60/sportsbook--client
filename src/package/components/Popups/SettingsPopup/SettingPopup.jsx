import { useDispatch, useSelector } from 'react-redux';
import ModeSwitcherContainer from '../../../../components/ModeSwitcherContainer/ModeSwitcherContainer';
import { selectTheme } from '../../../../redux/reducers/configs/configs.slice';
import { closePopup } from '../../../../redux/reducers/popups/popups.slice';
import { ODDS_FORMATS_CONFIGS } from '../../../providers/OddFormatProvider/constants/oddFormat.constants';
import { useOddFormat } from '../../../providers/OddFormatProvider/OddFormatProvider';
import { POPUPS_IDS } from '../configs/popup.configs';
import {
  Body__styled,
  BodyInner__styled,
  Close__styled,
  Select__styled,
  SelectBody__styled,
  SelectHead__styled,
  SelectItem__styled,
  SelectRatio__styled,
  SelectSquare__styled,
  SelectSquareInner__styled,
  SelectText__styled,
  Theme__styled,
  ThemeCheckbox__styled,
  ThemeTitle__styled,
  Title__styled,
} from './SettingsPopup.styled';
import { useTranslation } from 'react-i18next';

const SettingPopup = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const { format, toggleFormat } = useOddFormat();
  const { t } = useTranslation();

  const isLightExist = theme === 'dark';

  const onClose = () => {
    dispatch(closePopup(POPUPS_IDS.SETTINGS));
  };

  return (
    <Body__styled onClick={onClose}>
      <BodyInner__styled onClick={e => e.stopPropagation()}>
        <Title__styled>{t('settings')}</Title__styled>
        <Close__styled onClick={onClose}>
          <svg>
            <use xlinkHref={'#close'} />
          </svg>
        </Close__styled>
        {isLightExist && (
          <Theme__styled>
            <ThemeTitle__styled>{t('dark')}</ThemeTitle__styled>
            <ThemeCheckbox__styled>
              <ModeSwitcherContainer />
            </ThemeCheckbox__styled>
          </Theme__styled>
        )}
        <Select__styled>
          <SelectHead__styled>{t('betSlip:oddsFormat')}</SelectHead__styled>
          <SelectBody__styled>
            {ODDS_FORMATS_CONFIGS.map(item => (
              <SelectItem__styled
                key={item.value}
                onClick={() => toggleFormat(item.value)}>
                <SelectText__styled>{t(item.name)}</SelectText__styled>
                <SelectRatio__styled>{item.view}</SelectRatio__styled>
                <SelectSquare__styled>
                  {format === item.value && <SelectSquareInner__styled />}
                </SelectSquare__styled>
              </SelectItem__styled>
            ))}
          </SelectBody__styled>
        </Select__styled>
      </BodyInner__styled>
    </Body__styled>
  );
};

export default SettingPopup;
