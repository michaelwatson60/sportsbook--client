import {
  CategoryButton__styled,
  CategoryIcon__styled,
  CategoryImg__styled,
  CategoryItem__styled,
  CategorySvg__styled,
  CategoryText__styled,
} from './CategoryItem.styled';
import sportsSprite from '../../../assets/images/sprites/sportsSprite.svg';
import { SPORTS_ICONS_3D } from '../../../assets/images/3dSportIcons';
import { useTranslation } from 'react-i18next';

const CategoryItem = ({ category, active }) => {
  const { t } = useTranslation();
  return (
    <CategoryItem__styled
      onClick={() => category.cb && category.cb()}
      active={active}
      count={7}>
      <CategoryButton__styled>
        <CategoryIcon__styled>
          {category.is3D ? (
            <CategoryImg__styled src={SPORTS_ICONS_3D[category.id]} />
          ) : (
            <CategorySvg__styled>
              <use xlinkHref={`${sportsSprite}#${category.id}`} />
            </CategorySvg__styled>
          )}
        </CategoryIcon__styled>
        <CategoryText__styled>{t(category.name)}</CategoryText__styled>
      </CategoryButton__styled>
    </CategoryItem__styled>
  );
};

export default CategoryItem;
