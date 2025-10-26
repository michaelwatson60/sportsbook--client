import * as S from './SportTabs.styled.js';
import React from 'react';
import sportsMapper from '../../../assets/mocks/sportsMapper.json';
import { useTranslation } from 'react-i18next';
import { CategorySvg__styled } from '../../../package/sections/Categories/CategoryItem/CategoryItem.styled';
import sportsSprite from '../../../package/assets/images/sprites/sportsSprite.svg';

const SportTabs = ({ selectedSportId, onSelectSportId, tabsSports }) => {
  const { t } = useTranslation();

  return (
    <S.Container className="sport-tabs">
      {tabsSports.map(({ id }) => (
        <S.Item
          key={id}
          onClick={() => onSelectSportId(id)}
          isSelected={id === +selectedSportId}
          className="sport-tabs-item">
          <S.Image>
            <CategorySvg__styled>
              <use xlinkHref={`${sportsSprite}#${id}`} />
            </CategorySvg__styled>
          </S.Image>
          <S.Title>{t(sportsMapper[id])}</S.Title>
          {/*{sId === selectedSportId && <S.Title>{t(sportsMapper[sId])}</S.Title>}*/}
        </S.Item>
      ))}
    </S.Container>
  );
};

export default SportTabs;
