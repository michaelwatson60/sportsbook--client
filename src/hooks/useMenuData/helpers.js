/**
 * Filters sports menu data based on the given type (e.g., 'prematch', 'live', 'top').
 * It removes any sports, countries, or leagues where the count for that type is 0.
 *
 * @param {Object} data - The full menu data object containing sports, countries, and leagues.
 * @param {string} [type='prematch'] - The type of filtering to apply.
 *   Possible values: 'prematch', 'live', 'top'.
 * @returns {Object} - A new filtered menu data object. If input is invalid, returns an empty object.
 *
 * @example
 * const filtered = filterMenuData(menuData, 'live');
 * // Returns only sports/countries/leagues that have live > 0
 */
export const filterMenuData = (data, type = 'all') => {
  if (!data) {
    return {};
  }
  if (type === 'all') {
    return data;
  }

  return {
    ...data,
    sports: data.sports
      ?.map(sport => {
        // Skip sport if it has no events of this type
        if (sport[type] === 0) {
          return null;
        }

        // Filter countries inside each sport
        const filteredCountries = sport.countries
          .map(country => {
            // Skip country if it has no events of this type
            if (country[type] === 0) {
              return null;
            }

            // Filter leagues that have events of this type
            const filteredLeagues = country.leagues.filter(
              league => league[type] > 0,
            );

            return {
              ...country,
              leagues: filteredLeagues,
            };
          })
          .filter(Boolean); // remove nulls

        return {
          ...sport,
          countries: filteredCountries,
        };
      })
      ?.filter(Boolean),
  };
};

/**
 * Reorders an array of objects based on a given order of IDs.
 * Items not found in the order array will be appended at the end.
 *
 * @param {Object} params - Function parameters.
 * @param {Array<Object>} params.array - Array of objects to reorder (each object must have an `id`).
 * @param {Array<string|number>} params.order - Array of IDs specifying the desired order.
 * @returns {Array<Object>} - A reordered array of objects.
 *
 * @example
 * const array = [{id: 1}, {id: 2}, {id: 3}];
 * const order = [3, 1];
 * const result = reorderArrayByIds({ array, order });
 * // result = [{id: 3}, {id: 1}, {id: 2}]
 */
export function reorderArrayByIds({ array = [], order = [] }) {
  if (!order?.length) {
    return array;
  }

  // Map items by their id for quick lookup
  const map = new Map(array.map(item => [item.id, item]));

  // Reorder according to the given order array
  const ordered = order.map(id => map.get(id)).filter(Boolean);

  // Collect items that weren’t in the order list
  const leftovers = array.filter(item => !order.includes(item.id));

  return [...ordered, ...leftovers];
}
