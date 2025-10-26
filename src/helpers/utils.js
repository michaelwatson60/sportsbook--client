import marketsGroups from '../constants/marketsGroups.json';
import { MARKET_TYPES } from '../constants/sports.constants';
import tldjs from 'tldjs';

const { getDomain, getSubdomain } = tldjs;

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

export const copyToClipboard = text => {
  navigator.clipboard.writeText(text);
};

export function getIsDevelopment() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}
export function updateNestedObject(obj, path, value) {
  const keys = path.split('>');
  let currentObj = obj;
  keys.forEach((key, i) => {
    if (i !== keys.length - 1) {
      currentObj = currentObj[key];
    } else {
      currentObj[key] = value;
    }
  });
}

const MARKET_1X2 = ['1', 'X', '2'];
const MARKET_1X12X2 = ['1X', '12', 'X2'];
const MARKET_OVER_UNDER = ['Over', 'Under'];
const MARKET_EVEN_ODD = ['Even', 'Odd'];
const MARKET_OVER_UNDER_EXACTLY = ['Over', 'Exactly', 'Under'];
const MARKET_YES_NO = ['Yes', 'No'];
const MARKET_12 = ['1', '2'];
const MARKET_1X = ['1', 'X'];
const MARKET_X2 = ['X', '2'];
const MARKET_1_2_NO_GOAL = ['1', '2', 'No goal'];
const MARKET_1_2_NEITHER = ['1', '2', 'Neither'];

const { SIMPLE, HANDICAP, SELECT } = MARKET_TYPES;

export const exportJson = (data, name = 'data') => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data),
  )}`;
  const link = document.createElement('a');
  link.href = jsonString;
  link.download = name + '.json';

  link.click();
};

const abc = [...marketsGroups];

abc.forEach(sport => {
  sport.groups.forEach(group => {
    group.markets.forEach(market => {
      market.type = SIMPLE;
      if (market.prices.length > 3) {
        return (market.type = SELECT);
      }
      if (
        market.prices.includes('Yes') &&
        market.prices.includes('No') &&
        market.prices.length === 2
      ) {
        market.prices = MARKET_YES_NO;
      }
      if (market.code.includes('AH')) {
        market.type = HANDICAP;
        market.prices = MARKET_12;
      }
      if (
        market.prices.includes('Over') &&
        market.prices.includes('Under') &&
        market.prices.length === 2
      ) {
        market.type = HANDICAP;
        market.prices = MARKET_OVER_UNDER;
      }
      if (
        market.prices.includes('Over') &&
        market.prices.includes('Under') &&
        market.prices.includes('Exactly') &&
        market.prices.length === 3
      ) {
        market.type = HANDICAP;
        market.prices = MARKET_OVER_UNDER_EXACTLY;
      }
      if (
        market.prices.includes('1') &&
        market.prices.includes('2') &&
        market.prices.length === 2
      ) {
        market.prices = MARKET_12;
      }
      if (
        market.prices.includes('1') &&
        market.prices.includes('X') &&
        market.prices.length === 2
      ) {
        market.prices = MARKET_1X;
      }
      if (
        market.prices.includes('2') &&
        market.prices.includes('X') &&
        market.prices.length === 2
      ) {
        market.prices = MARKET_X2;
      }
      if (
        market.prices.includes('Even') &&
        market.prices.includes('Odd') &&
        market.prices.length === 2
      ) {
        market.prices = MARKET_EVEN_ODD;
      }
      // if(market.code.includes('OU') ) {
      //   market.type = HANDICAP;
      //   market.prices = MARKET_OVER_UNDER
      // }
      // if(market.code.includes('1x2') ) {
      //   market.prices = MARKET_1X2
      // }
      if (
        market.prices.includes('1') &&
        market.prices.includes('X') &&
        market.prices.includes('2') &&
        market.prices.length === 3
      ) {
        market.prices = MARKET_1X2;
      }
      if (
        market.prices.includes('1') &&
        market.prices.includes('2') &&
        market.prices.includes('No goal') &&
        market.prices.length === 3
      ) {
        market.prices = MARKET_1_2_NO_GOAL;
      }
      if (
        market.prices.includes('1') &&
        market.prices.includes('2') &&
        market.prices.includes('Neither') &&
        market.prices.length === 3
      ) {
        market.prices = MARKET_1_2_NEITHER;
      }
      if (
        market.prices.includes('1X') &&
        market.prices.includes('12') &&
        market.prices.includes('X2') &&
        market.prices.length === 3
      ) {
        market.prices = MARKET_1X12X2;
      }
      // if(market.code.includes('DC') ) {
      //   market.prices = MARKET_1X12X2
      // }
    });
  });
});

const searchParams = new URLSearchParams(location.search);

function getServerUrls() {
  const domain = getDomain(location.hostname);

  const domainUrls = {
    staticUrl: domain
      ? `https://st.${domain}`
      : process.env.REACT_APP_STATIC_URL,
    dictionaryUrl: domain
      ? `https://ts.${domain}`
      : process.env.REACT_APP_DICTIONARY_URL,
    socketUrl: domain
      ? `https://lv.${domain}`
      : process.env.REACT_APP_SOCKET_URL,
    serverUrl: domain ? `https://api.${domain}` : process.env.REACT_APP_API_URL,
    sportUrl: domain ? `https://sp.${domain}` : process.env.REACT_APP_SPORT_URL,
  };

  // const urls = {
  //   serverUrl: process.env.REACT_APP_API_URL,
  //   staticUrl: process.env.REACT_APP_STATIC_URL,
  //   dictionaryUrl: process.env.REACT_APP_DICTIONARY_URL,
  //   socketUrl: process.env.REACT_APP_SOCKET_URL,
  //   sportUrl: process.env.REACT_APP_SPORT_URL,
  // };

  // if (process.env.NODE_ENV === 'production') {
  //   return domainUrls;
  // }

  const subdomain = getSubdomain(location.hostname);
  domainUrls.serverUrl = searchParams.get('serverUrl');

  if (!domainUrls.serverUrl) {
    domainUrls.serverUrl = !subdomain
      ? `https://api.${domain}`
      : `https://api${subdomain}.${domain}`;
  }
  if (
    subdomain &&
    subdomain.startsWith('sp') &&
    !subdomain.startsWith('sport')
  ) {
    const modifiedSub = subdomain.replace(/^sp(.*)/, 'sp-$1');
    console.log(subdomain, modifiedSub, domain);
    domainUrls.sportUrl = `https://${modifiedSub}.${domain}`;

    return domainUrls;
  }

  return domainUrls;
}

export const SERVER_URLS = getServerUrls();
