import PropTypes from 'prop-types';
import { Category__styled, CategoryList__styled } from './Categories.styled';
import CategoryItem from './CategoryItem/CategoryItem';
import CategoryItemSkeleton from './CategoryItem/CategoryItem.skeleton';
import { useRef } from 'react';
import Scroller from '../../components/Scroller/Scroller';

const categoriesList = new Array(7).fill(null);

const Categories = ({ isLoading, categories, activeCategory }) => {
  const ref = useRef(null);

  return (
    <Category__styled>
      <CategoryList__styled ref={ref}>
        {categoriesList.map((_, i) => {
          return isLoading ? (
            <CategoryItemSkeleton key={i} />
          ) : (
            <CategoryItem
              key={i}
              category={categories[i] || {}}
              active={
                activeCategory === String(categories[i]?.name) ||
                activeCategory === String(categories[i]?.id)
              }
            />
          );
        })}
      </CategoryList__styled>
      <Scroller ref={ref} />
    </Category__styled>
  );
};

Categories.propTypes = {
  isLoading: PropTypes.bool,
  categories: PropTypes.array,
  activeCategory: PropTypes.string,
};

export default Categories;
