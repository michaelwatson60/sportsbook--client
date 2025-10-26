import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Categories from '../../package/sections/Categories/Categories';
import { THEMES, useTheme } from '../../providers/ThemProvider';
import { selectIsSportsLoading } from '../../redux/reducers/sportsbook/sportsbook.slice';

const configs = [
  { id: 50, name: 'Football' },
  { id: 51, name: 'Ice Hockey' },
  { id: 52, name: 'Tennis' },
  { id: 53, name: 'Basketball' },
  { id: 54, name: 'Volleyball' },
];

const purpleConfigs = [
  { id: 50, name: 'Football' },
  { id: 75, name: 'Cricket' },
  { id: 52, name: 'Tennis' },
  { id: 53, name: 'Basketball' },
  { id: 54, name: 'Volleyball' },
];

const CategoriesContainer = ({ isTree }) => {
  const navigate = useNavigate();
  const { sportId } = useParams();
  const isSportsLoading = useSelector(selectIsSportsLoading);
  const { mode } = useTheme();

  const categories = useMemo(() => {
    const isPurple = mode === THEMES.PURPLE;
    const currentConfigs = isPurple ? purpleConfigs : configs;
    const formatedSports = currentConfigs.map(sport => {
      const path = isTree
        ? `/tree/${sport.id}/all/match-odds`
        : `/sport/${sport.id}/Competitions`;
      return {
        ...sport,
        name: 'sports:' + sport.name,
        is3D: isPurple,
        cb() {
          navigate(path);
        },
      };
    });
    return [
      {
        id: 'live',
        name: 'live',
        is3D: isPurple,
        cb() {
          navigate('/live');
        },
      },
      ...formatedSports,
      {
        id: 'cup',
        name: 'allSports',
        is3D: isPurple,
        cb() {
          navigate('/all-sports');
        },
      },
    ];
  }, [navigate, mode]);

  return (
    <Categories
      isLoading={isSportsLoading}
      categories={categories}
      activeCategory={isTree && sportId}
    />
  );
};

export default CategoriesContainer;
