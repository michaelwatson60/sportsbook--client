import Skeleton from '../../../components/UI/Skeleton/Skeleton';
import {
  CategoryButton__styled,
  CategoryIcon__styled,
  CategoryItem__styled,
  CategoryText__styled,
} from './CategoryItem.styled';

const CategoryItemSkeleton = () => {
  return (
    <CategoryItem__styled count={7}>
      <CategoryButton__styled>
        <CategoryIcon__styled skeleton>
          <Skeleton
            backgroundColor="var(--color-active-contrast)"
            foregroundColor="var(--color-second)"
          />
        </CategoryIcon__styled>
        <CategoryText__styled skeleton>
          <Skeleton
            backgroundColor="var(--color-active-contrast)"
            foregroundColor="var(--color-second)"
          />
        </CategoryText__styled>
      </CategoryButton__styled>
    </CategoryItem__styled>
  );
};

export default CategoryItemSkeleton;
