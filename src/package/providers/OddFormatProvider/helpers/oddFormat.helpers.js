import { ODDS_FORMAT_TYPES } from '../constants/oddFormat.constants';

const { DECIMAL, FRACTIAL, AMERICAN, HONK_KONG, MALAY, INDONESIAN } =
  ODDS_FORMAT_TYPES;

export function fixedOddValue(value, oddType) {
  switch (oddType) {
    case DECIMAL:
    case HONK_KONG:
      return value.toTruncFixed();
    case FRACTIAL: {
      const slipedString = value.split('/');
      const newValue =
        slipedString[0].slice(0, 3) + '/' + slipedString[1].slice(0, 3);

      return newValue;
    }
    case AMERICAN:
      return value.toTruncFixed(0);
    case MALAY:
    case INDONESIAN:
      return value.toTruncFixed(3);
  }
}
