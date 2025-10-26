import React, { memo } from 'react';
import {
  MenuCenter__styled,
  MenuLeft__styled,
  MenuOpenIcon__styled,
  MenuOpenSvg__styled,
} from '../../Menu.styled';
import {
  MenuSportButton__styled,
  MenuSportIcon__styled,
  MenuSportInfo__styled,
  MenuSportName__styled,
  MenuSportSvg__styled,
} from './MenuSport.styled';
import sportsSprite from '../../../../assets/images/sprites/sportsSprite.svg';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectSportNameById } from '@/redux/reducers/sport/sport.selector';

const LiveMenuSportHeader = ({ isOpen, setIsOpen, sportId }) => {
  const { t } = useTranslation('sports');
  const name = useSelector(state => selectSportNameById(state, sportId));

  return (
    <MenuSportInfo__styled>
      <MenuSportButton__styled onClick={() => setIsOpen(prev => !prev)}>
        <MenuLeft__styled>
          <MenuSportIcon__styled>
            <MenuSportSvg__styled>
              <use xlinkHref={`${sportsSprite}#${sportId}`} />
            </MenuSportSvg__styled>
          </MenuSportIcon__styled>
          <MenuSportName__styled className={'ellipsis'}>
            {t(name)}
          </MenuSportName__styled>
        </MenuLeft__styled>
        <MenuCenter__styled>
          <MenuOpenIcon__styled open={isOpen}>
            <MenuOpenSvg__styled>
              <use xlinkHref={'#down'} />
            </MenuOpenSvg__styled>
          </MenuOpenIcon__styled>
        </MenuCenter__styled>
      </MenuSportButton__styled>
    </MenuSportInfo__styled>
  );
};

export default memo(LiveMenuSportHeader);
