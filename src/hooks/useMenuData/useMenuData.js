import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectMenu } from '@/redux/reducers/sport/sport.selector';
import { filterMenuData, reorderArrayByIds } from './helpers';
import useMenuStructure from '@/hooks/useMenuStructure';

const useMenuData = ({ type = 'all' }) => {
  const menuData = useSelector(selectMenu);
  const menu = useMemo(() => {
    return filterMenuData(menuData, type);
  }, [menuData, type]);

  const eventsCount =
    type === 'all' ? (menu?.live || 0) + (menu?.prematch || 0) : menu[type];

  const { menuStructure, menuStructureLoading } = useMenuStructure();

  const menuSports = useMemo(() => {
    if (!menuStructure) {
      return null;
    }
    return reorderArrayByIds({
      array: menu?.sports || [],
      order: menuStructure?.sports,
    }).map(sport => {
      return {
        ...sport,
        countries: reorderArrayByIds({
          array: sport.countries,
          order: menuStructure?.countries[sport.id],
        }).map(country => {
          return {
            ...country,
            leagues: reorderArrayByIds({
              array: country.leagues,
              order: menuStructure?.leagues[`${sport.id}:${country.id}`],
            }),
          };
        }),
      };
    });
  }, [menu, menuStructure]);

  return {
    isLoading: menuStructureLoading,
    eventsCount,
    menuSports,
  };
};

export default useMenuData;
