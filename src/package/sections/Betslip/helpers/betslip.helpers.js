import {
  BETSLIP_BONUS_BY_BETS_COUNT,
  SYSTEM_ORDERS,
} from '../constants/betslip.constants';

const choose = function choose_func(events, len) {
  const result = [];
  events.forEach((eventItem, i) => {
    if (len === 1) {
      result.push([eventItem]);
    } else {
      const remainingItems = choose_func(
        events.slice(i + 1, events.length),
        len - 1,
      );
      remainingItems.forEach(rItem => {
        result.push([eventItem].concat(rItem));
      });
    }
  });
  return result;
};

const getCombinations = events => {
  // console.log('events     -------', events);
  const { banksCount, systems, systemsCount, banks } = events.reduce(
    (a, c) => {
      if (c.b) {
        a.banks.push(c);
        ++a.banksCount;
      } else {
        a.systems.push(c);
        ++a.systemsCount;
      }
      return a;
    },
    { systems: [], systemsCount: 0, banks: [], banksCount: 0 },
  );

  const result = [];
  for (let i = 1; i <= systemsCount; ++i) {
    const combination = choose([...systems], i);
    const bankCombination = choose([...banks], banksCount);

    result.push({
      banksCount,
      current: i,
      systemsCount,
      count: (combination.length || 1) * (bankCombination.length || 1),
      bankCombination,
      combination,
      combinationCount: combination.length,
    });
  }
  return result;
};

const getWinningCombinations = combination => {
  return combination.reduce((a, c) => a * c.rate, 1);
};

const getCombinationsMaximumCoeficent = combinations => {
  const results = combinations.map(({ combination, bankCombination, ...c }) => {
    const coefs = combination.map(odds => getWinningCombinations(odds));
    const coefsBank = bankCombination.map(odds => getWinningCombinations(odds));
    const combainCoeficent = coefs.length
      ? coefs.reduce((a, c) => a + c, 0)
      : 1;
    const banksCombainCoeficent = coefsBank.length
      ? coefsBank.reduce((a, c) => a + c, 0)
      : 1;

    return {
      ...c,
      maxCoeficent: combainCoeficent * banksCombainCoeficent,
    };
  });
  return results;
};

export const calculateSystem = events => {
  const combinations = getCombinations(events);

  const result = getCombinationsMaximumCoeficent(combinations);

  return result;
};

export function getSystemOrderName(order) {
  return order > 3 ? `${order}-fold` : SYSTEM_ORDERS[order];
}

export function getBetslipBonusPercent(count) {
  const validCount = count > 35 ? 35 : count;
  return BETSLIP_BONUS_BY_BETS_COUNT[validCount];
}
