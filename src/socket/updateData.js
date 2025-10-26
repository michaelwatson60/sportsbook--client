import _ from 'lodash';

/**
 * Deep merge two data structures with special handling for arrays:
 * - Arrays merged by unique identifiers: 'key', 'id', or 'code'
 * - Items with r: 1 are removed
 * - Empty arrays in specific keys (leagues, countries, sports) cause removal of parent objects
 * - Empty arrays in updates mean "no change"
 *
 * @param {object|array} target - existing data
 * @param {object|array} source - new data (update)
 * @param {boolean} isMenu - calls cleanEmptyTree in case of true
 * @returns {object|array} merged result
 */
// export function deepMergeWithArraySupport(target, source, isMenu = false) {
//   const merged = _.mergeWith(_.cloneDeep(target), source, customMerge);
//
//   for (const key in source) {
//     if (source[key] && source[key].r === 1) {
//       delete merged[key];
//     }
//   }
//
//   // console.log(merged);
//
//   return isMenu ? cleanEmptyTree(merged) : merged;
// }

// function customMerge(objValue, srcValue, key) {
//   // console.log({ objValue, srcValue });
//
//   if (srcValue.f === 1) {
//     return srcValue;
//   }
//
//   if (_.isArray(objValue) && _.isArray(srcValue)) {
//     if (srcValue.length === 0) {
//       return objValue;
//     }
//
//     const identifier = findIdentifier(objValue, srcValue);
//
//     if (!identifier) {
//       return srcValue;
//     }
//
//     const resultArray = [...objValue];
//
//     srcValue.forEach(srcItem => {
//       const id = srcItem?.[identifier];
//
//       if (srcItem?.r === 1) {
//         const index = resultArray.findIndex(item => item?.[identifier] === id);
//
//         if (index !== -1) {
//           resultArray.splice(index, 1);
//         }
//       } else {
//         const index = resultArray.findIndex(item => item?.[identifier] === id);
//
//         if (index !== -1) {
//           const existingItem = resultArray[index];
//
//           // Special handling for prices → detect rate change
//           // console.log(key);
//
//           if (key === 'prices') {
//             const oldRate = existingItem.rate;
//             const newRate = srcItem.rate;
//
//             if (
//               typeof oldRate === 'number' &&
//               typeof newRate === 'number' &&
//               oldRate !== newRate
//             ) {
//               resultArray[index] = {
//                 ..._.cloneDeep(existingItem),
//                 ...srcItem,
//                 lastValue: oldRate,
//               };
//
//               return;
//             }
//           }
//
//           resultArray[index] = deepMergeWithArraySupport(existingItem, srcItem);
//         } else {
//           resultArray.push(srcItem);
//         }
//       }
//     });
//
//     return resultArray;
//   }
//
//   return undefined; // fallback to default lodash merge
// }

export function deepMergeWithArraySupport(target, source, isMenu = false) {
  if (!target) {
    return isMenu ? cleanEmptyTree(source) : source;
  }

  const merged = { ...target };

  for (const key in source) {
    const srcValue = source[key];
    const tgtValue = target[key];

    // Handle deletion flag r === 1
    if (srcValue?.r === 1) {
      if (Object.prototype.hasOwnProperty.call(merged, key)) {
        delete merged[key];
      }

      continue;
    }

    // Handle f === 1 → replace entirely
    if (srcValue?.f === 1) {
      merged[key] = srcValue;

      continue;
    }

    // Merge arrays
    if (Array.isArray(tgtValue) && Array.isArray(srcValue)) {
      merged[key] = mergeArraysWithSupport(tgtValue, srcValue, key);

      continue;
    }

    // Merge nested objects
    if (
      typeof tgtValue === 'object' &&
      tgtValue !== null &&
      typeof srcValue === 'object' &&
      srcValue !== null
    ) {
      const mergedNested = deepMergeWithArraySupport(tgtValue, srcValue);

      if (mergedNested !== tgtValue) {
        merged[key] = mergedNested;
      }

      continue;
    }

    // Replace primitives if changed
    if (tgtValue !== srcValue) {
      merged[key] = srcValue;
    }
  }

  return isMenu ? cleanEmptyTree(merged) : merged;
}

function mergeArraysWithSupport(targetArray, sourceArray, key) {
  const resultArray = [...targetArray];
  const identifier = findIdentifier(targetArray, sourceArray);

  sourceArray.forEach(srcItem => {
    const id = identifier ? srcItem?.[identifier] : null;

    // Deletion
    if (srcItem?.r === 1 && id != null) {
      const index = resultArray.findIndex(item => item?.[identifier] === id);

      if (index !== -1) {
        resultArray.splice(index, 1);
      }

      return;
    }

    if (id != null) {
      const index = resultArray.findIndex(item => item?.[identifier] === id);

      if (index !== -1) {
        const existingItem = resultArray[index];

        // Special handling for prices
        if (
          key === 'prices' &&
          typeof existingItem.rate === 'number' &&
          typeof srcItem.rate === 'number' &&
          existingItem.rate !== srcItem.rate
        ) {
          resultArray[index] = {
            ...existingItem,
            ...srcItem,
            lastValue: existingItem.rate,
          };

          return;
        }

        const mergedItem = deepMergeWithArraySupport(existingItem, srcItem);

        if (mergedItem !== existingItem) {
          resultArray[index] = mergedItem;
        }
      } else {
        resultArray.push(srcItem);
      }
    } else {
      resultArray.push(srcItem);
    }
  });

  return resultArray;
}

/**
 * Finds a unique identifier key for merging arrays.
 * Checks 'key', then 'id', then 'code' keys.
 * Returns the first key found that exists in all items.
 *
 * @param {array} arr1
 * @param {array} arr2
 * @returns {string|null} identifier key or null if none found
 */
function findIdentifier(arr1, arr2) {
  const allItems = [...arr1, ...arr2];

  for (const key of ['key', 'id', 'code']) {
    if (
      allItems.length > 0 &&
      allItems.every(item => typeof item === 'object' && item && key in item)
    ) {
      return key;
    }
  }

  return null;
}

/**
 * Cleans the merged object tree:
 * - Removes objects with empty 'leagues' arrays
 * - Removes objects with empty 'countries' arrays
 * - Removes 'sports' key if empty array
 * - Recursively cleans nested arrays and objects
 *
 * @param {any} obj
 * @returns {any} cleaned object or null if should be removed entirely
 */
function cleanEmptyTree(obj, parentKey) {
  if (_.isArray(obj)) {
    const cleanedArray = obj
      .map(item => cleanEmptyTree(item, parentKey))
      .filter(item => item !== null);

    // Special case: sports should stay empty instead of null
    if (parentKey === 'sports') {
      return cleanedArray;
    }

    return cleanedArray.length > 0 ? cleanedArray : null;
  }

  if (_.isObject(obj)) {
    const clone = { ...obj };

    for (const key in clone) {
      clone[key] = cleanEmptyTree(clone[key], key);
    }

    if (
      'leagues' in clone &&
      Array.isArray(clone.leagues) &&
      clone.leagues.length === 0
    ) {
      return null; // remove whole country if leagues empty
    }

    if (
      'countries' in clone &&
      Array.isArray(clone.countries) &&
      clone.countries.length === 0
    ) {
      return null; // remove whole sport if countries empty
    }

    if (
      'sports' in clone &&
      Array.isArray(clone.sports) &&
      clone.sports.length === 0
    ) {
      clone.sports = []; // keep empty sports array
    }

    return clone;
  }

  return obj;
}
