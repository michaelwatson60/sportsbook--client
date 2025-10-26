import React, { memo } from 'react';
import Flag from '../../../../components/UI/Flag/Flag';
import {
  MenuCenter__styled,
  MenuLeft__styled,
  MenuOpenIcon__styled,
  MenuOpenSvg__styled,
} from '../../Menu.styled';
import {
  MenuCountryButton__styled,
  MenuCountryIcon__styled,
  MenuCountryInfo__styled,
  MenuCountryInner__styled,
  MenuCountryText__styled,
} from '../MenuCountry/MenuCountry.styled';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCountryNameById } from '@/redux/reducers/sport/sport.selector';
import { getTranslatedLeague } from '@/helpers/sportsbook.helpers';

const LiveMenuLeagueHeader = ({ isOpen, setIsOpen, countryId, name }) => {
  const { t } = useTranslation('countries');
  const countryName = useSelector(state =>
    selectCountryNameById(state, countryId),
  );
  return (
    <MenuCountryInner__styled>
      <MenuCountryInfo__styled isSingleEvent={true}>
        <MenuCountryButton__styled
          isSingleEvent={true}
          onClick={() => setIsOpen(prev => !prev)}>
          <MenuLeft__styled>
            <MenuCountryIcon__styled>
              <Flag country={countryName} id={countryId} />
            </MenuCountryIcon__styled>
            <MenuCountryText__styled className={'ellipsis'}>
              {t(`countries:C__${countryName.replace(/ /g, '_')}`, {
                defaultValue: countryName,
              })}
              {'. '}
              {t(`leagues:${getTranslatedLeague(name)}`, {
                defaultValue: name,
              })}
            </MenuCountryText__styled>
          </MenuLeft__styled>
          <MenuCenter__styled>
            <MenuOpenIcon__styled open={isOpen}>
              <MenuOpenSvg__styled>
                <use xlinkHref={'#down'} />
              </MenuOpenSvg__styled>
            </MenuOpenIcon__styled>
          </MenuCenter__styled>
        </MenuCountryButton__styled>
      </MenuCountryInfo__styled>
    </MenuCountryInner__styled>
  );
};

export default memo(LiveMenuLeagueHeader);
