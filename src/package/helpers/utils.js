import _ from 'lodash';
import { SERVER_URLS } from '../../helpers/utils';

Number.prototype.toTruncFixed = function () {
  var count =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return (parseInt(this * 100) / 100).toFixed(count);
};

String.prototype.toTruncFixed = function () {
  var count =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return (parseInt(this * 100) / 100).toFixed(count);
};

export function generateArray(length = 0, value = null) {
  return new Array(length).fill(value);
}

export const LOADING_ITEMS_SHORT = generateArray(8);
export const LOADING_ITEMS = generateArray(20);

export function getRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

export function swapArrayPositions(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}

export const getTeamLogoUrl = (id, sportId) => {
  return `${SERVER_URLS.staticUrl}/teams2/${sportId}/70x70/${id}.png`;
};

export function formatEvents(events) {
  if (!events || !Array.isArray(events)) {
    return [];
  }
  const copyEvents = JSON.parse(JSON.stringify(events));
  copyEvents.forEach(event => {
    event.marketsGroup = {};
    event.markets.forEach(market => {
      event.marketsGroup[market.code] = market;
      market.oddsGroup = {};
      market.odds.forEach(odd => {
        const key = `${odd.name}:${odd.h || 0}`;
        market.oddsGroup[key] = odd;
      });
    });
  });
  return copyEvents;
}

export function formatEvent(event) {
  if (!event) {
    return {};
  }
  const copyEvent = JSON.parse(JSON.stringify(event));
  copyEvent.marketsGroup = {};
  // copyEvent.markets.forEach(market => {
  //   copyEvent.marketsGroup[market.code] = market;
  //   market.oddsGroup = {};
  //   market.odds.forEach(odd => {
  //     const key = `${odd.name || odd.priceName}:${odd.h || market.h || 0}`;
  //     market.oddsGroup[key] = odd;
  //   });
  // });
  return copyEvent;
}

export function numberWithCommas(x, isFixid, fixCount = 2) {
  const number = isFixid ? (+x).toTruncFixed(fixCount) : x;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatLiveEvent(event) {
  if (!event) {
    return;
  }
  const marketsGroup = {};
  event.markets.forEach(market => {
    formatLiveMarket(market, marketsGroup);
  });
  event.marketsGroup = marketsGroup;
  event.singleMarkets = groupLiveMarkets(marketsGroup);
}

export function formatLiveMarket(market, marketsGroup) {
  const oddsGroup = {};
  if (market.odds) {
    market.odds.forEach(odd => {
      if (odd.r) {
        return;
      }
      const handicap = market.h || 0;
      odd.rate = odd.v;
      odd.h = handicap;
      odd.name = odd.n;
      const key = `${odd.n}:${handicap}`;
      odd.groupKey = key;
      oddsGroup[key] = odd;
    });
  }

  if (marketsGroup[market.n]) {
    marketsGroup[market.n].oddsGroup = {
      ...marketsGroup[market.n].oddsGroup,
      ...oddsGroup,
    };
  } else {
    marketsGroup[market.n] = { ...market, code: market.n, oddsGroup };
  }
}

export function getFormatedLiveMarket(market) {
  // eslint-disable-next-line no-unused-vars
  const [_eventId, marketCode] = market.key.split('|');
  if (!market.n) {
    market.n = marketCode;
  }
  if (!market.code) {
    market.code = marketCode;
  }
  const oddsGroup = {};
  if (market.odds) {
    market.odds.forEach(odd => {
      if (odd.r) {
        return;
      }
      const handicap = market.h || 0;
      odd.rate = odd.v;
      odd.h = handicap;
      odd.name = odd.n;
      const key = `${odd.n}:${handicap}`;
      odd.groupKey = key;
      oddsGroup[key] = odd;
      // oddsGroup[odd.ref] = odd;
    });
  }
  return { ...market, oddsGroup };
}

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

export function groupLiveMarkets(markets) {
  const marketsGroup = {};
  Object.keys(markets).forEach(code => {
    const market = markets[code];
    // eslint-disable-next-line no-unused-vars
    const { oddsGroup, odds, ...restMarket } = market;

    const oddsGroupByHandicap = _.groupBy(Object.values(oddsGroup), 'h');
    marketsGroup[code] = Object.values(oddsGroupByHandicap).map(odds => ({
      ...restMarket,
      h: odds[0].h,
      odds,
    }));
  });

  Object.values(marketsGroup).forEach(market => {
    if (market[0]?.h) {
      market.sort((a, b) => formatMarketToSort(a.h) - formatMarketToSort(b.h));
    }
  });
  return marketsGroup;
}

export function generateMarketsGroupForEventRow(eventMarkets) {
  const group = {};
  eventMarkets?.forEach(market => {
    if (!group[market.code]) {
      group[market.code] = { ...market, oddsGroup: {} };
    }
    market.prices.forEach(odd => {
      const key = `${odd.name || odd.priceName}:${odd.h || market.h || 0}`;
      group[market.code].oddsGroup[key] = { ...odd };
    });
  });
  return group;
}
