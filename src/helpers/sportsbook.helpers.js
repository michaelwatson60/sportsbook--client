import _ from 'lodash';
import { ASIAN_HANDICAP_MARKETS } from '../constants/sports.constants';
const formatMarketToSort = market => Math.abs(+market + 0.25);

export function groupMarkets(markets) {
  const marketsGroup = _.groupBy(markets, 'code');
  Object.values(marketsGroup).forEach(market => {
    if (market[0]?.h) {
      market.sort((a, b) => formatMarketToSort(a.h) - formatMarketToSort(b.h));
    }
  });
  return marketsGroup;
}

export function renderHandicapValue(marketCode, h, oddName) {
  if (!ASIAN_HANDICAP_MARKETS.includes(marketCode)) {
    return `(${h})`;
  }

  let handicap = h;

  if (oddName === '2') {
    if (h < 0) {
      handicap = `+${Math.abs(h)}`;
    } else if (h > 0) {
      handicap = `-${Math.abs(h)}`;
    }
  } else {
    if (handicap > 0) {
      handicap = `+${handicap}`;
    }
  }

  return `(${handicap})`;
}

export function getTranslatedLeague(name) {
  return (
    'l' +
    name
      .replace('.', '')
      .split(' ')
      .filter(Boolean)
      .join('-')
      .replace('--', '-')
  );
}
