import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectMenu } from '@/redux/reducers/sport/sport.selector';
import useMenuStructure from '@/hooks/useMenuStructure';
import { reorderArrayByIds } from '@/hooks/useMenuData/helpers';

/**
 * Custom hook to retrieve and filter a list of sports from the Redux store,
 * optionally filtered by type ("all", "live", "prematch", or "top").
 *
 * It uses the `menuStructure` hook to determine the order of sports and
 * reorders the final result accordingly.
 *
 * @param {Object} params - Hook parameters.
 * @param {'all' | 'live' | 'prematch' | 'top'} params.type - The type of sports to filter:
 *   - `"all"`: returns all sports
 *   - `"live"`: returns only sports with live events
 *   - `"prematch"`: returns only sports with prematch events
 *   - `"top"`: returns only sports marked as top
 *
 * @returns {Object} An object containing:
 *   @property {Array|null} sports - The filtered and ordered list of sports,
 *   or `null` if menu structure is not yet available.
 *
 * @example
 * const { sports } = useSportList({ type: 'live' });
 */
const useSportList = ({ type }) => {
  const menuData = useSelector(selectMenu);
  const sportsData = useSelector(state => state.sport.sports);

  const { menuStructure } = useMenuStructure();

  const sports = useMemo(() => {
    if (!menuStructure) {
      return null;
    }

    let sourceMenu = menuData?.sports || [];

    if (type === 'live') {
      sourceMenu = sourceMenu.filter(sport => sport.live > 0);
    } else if (type === 'prematch') {
      sourceMenu = sourceMenu.filter(sport => sport.prematch > 0);
    } else if (type === 'top') {
      sourceMenu = sourceMenu.filter(sport => sport.top > 0);
    }
    sourceMenu = sourceMenu.map(sport => ({
      ...sport,
      name: sportsData[sport.id]?.name,
    }));
    // If type is "all" or anything else, no filtering is applied

    // Reorder sports according to menuStructure order
    return reorderArrayByIds({
      array: sourceMenu,
      order: menuStructure?.sports,
    });
  }, [menuData, menuStructure, type]);

  return {
    sports,
  };
};

export default useSportList;
