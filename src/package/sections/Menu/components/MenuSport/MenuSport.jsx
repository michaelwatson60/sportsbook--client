import React, { useState } from 'react';
import {
  MenuCenter__styled,
  MenuLeft__styled,
  MenuLive__styled,
  MenuOpenIcon__styled,
  MenuOpenSvg__styled,
} from '../../Menu.styled';
import MenuCountry from '../MenuCountry/MenuCountry';
import {
  MenuSportButton__styled,
  MenuSportCount__styled,
  MenuSportEvents__styled,
  MenuSportEventsShow__styled,
  MenuSportIcon__styled,
  MenuSportInfo__styled,
  MenuSportItem__styled,
  MenuSportName__styled,
  MenuSportSvg__styled,
} from './MenuSport.styled';
import sportsSprite from '../../../../assets/images/sprites/sportsSprite.svg';
import Button from '../../../../components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectSportNameById } from '@/redux/reducers/sport/sport.selector';

const MenuSport = ({
  sport,
  isSingleEvent,
  isCompetitions,
  onShowEventsClick,
  onLeagueClick,
}) => {
  const { t } = useTranslation(['translation', 'sports']);
  const [checkedLeagues, setCheckedLeagues] = useState({});
  const [isOpen, setIsOpen] = useState(isCompetitions);

  const { live, prematch, countries, id } = sport;
  const name = useSelector(state => selectSportNameById(state, sport.id));

  const count = +(live || 0) + +(prematch || 0);
  const finalCount = count > 999 ? '999+' : count;

  const onCountryCheck = (ids, countryId, isAll) => {
    const copyLeagues = { ...checkedLeagues };
    if (isAll) {
      delete copyLeagues[countryId];
    } else {
      copyLeagues[countryId] = ids;
    }
    setCheckedLeagues(copyLeagues);
  };

  const onLeagueCheck = (id, countryId, isChecked) => {
    const copyLeagues = { ...checkedLeagues };
    if (isChecked) {
      copyLeagues[countryId].length <= 1
        ? delete copyLeagues[countryId]
        : (copyLeagues[countryId] = copyLeagues[countryId].filter(
            item => item !== id,
          ));
    } else {
      copyLeagues[countryId]
        ? copyLeagues[countryId].push(id)
        : (copyLeagues[countryId] = [id]);
    }
    setCheckedLeagues(copyLeagues);
  };

  return (
    <MenuSportItem__styled>
      {!isCompetitions && (
        <MenuSportInfo__styled>
          <MenuSportButton__styled
            isSingleEvent={isSingleEvent}
            onClick={() => setIsOpen(prev => !prev)}>
            <MenuLeft__styled>
              <MenuSportIcon__styled>
                <MenuSportSvg__styled>
                  <use xlinkHref={`${sportsSprite}#${id}`} />
                </MenuSportSvg__styled>
              </MenuSportIcon__styled>
              <MenuSportName__styled className={'ellipsis'}>
                {t(`sports:${name}`)}
              </MenuSportName__styled>
            </MenuLeft__styled>
            <MenuCenter__styled>
              {!isSingleEvent && (
                <>
                  {live > 0 && <MenuLive__styled>{t('live')}</MenuLive__styled>}
                  <MenuSportCount__styled>{finalCount}</MenuSportCount__styled>
                </>
              )}
              <MenuOpenIcon__styled open={isOpen}>
                <MenuOpenSvg__styled>
                  <use xlinkHref={'#down'} />
                </MenuOpenSvg__styled>
              </MenuOpenIcon__styled>
            </MenuCenter__styled>
          </MenuSportButton__styled>
        </MenuSportInfo__styled>
      )}
      {isOpen &&
        countries.map(country => (
          <MenuCountry
            key={country.id}
            sportId={id}
            country={country}
            checkedLeagues={checkedLeagues}
            isSingleEvent={isSingleEvent}
            onCountryCheck={onCountryCheck}
            onLeagueCheck={onLeagueCheck}
            onLeagueClick={onLeagueClick}
          />
        ))}
      {isOpen && !!Object.keys(checkedLeagues).length && (
        <MenuSportEvents__styled>
          <MenuSportEventsShow__styled>
            <Button
              onClick={() => onShowEventsClick(checkedLeagues, id)}
              text={t('showEvents')}
            />
          </MenuSportEventsShow__styled>
        </MenuSportEvents__styled>
      )}
    </MenuSportItem__styled>
  );
};

export default MenuSport;
