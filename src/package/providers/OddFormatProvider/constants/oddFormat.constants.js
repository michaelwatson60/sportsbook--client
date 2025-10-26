export const ODDS_FORMAT_TYPES = {
  DECIMAL: 'decimal',
  FRACTIAL: 'fractional',
  AMERICAN: 'moneyline',
  HONK_KONG: 'hongKong',
  MALAY: 'malay',
  INDONESIAN: 'indonesian',
};

const { DECIMAL, FRACTIAL, AMERICAN, HONK_KONG, MALAY, INDONESIAN } =
  ODDS_FORMAT_TYPES;

export const ODDS_FORMATS_CONFIGS = [
  { name: 'decimal', value: DECIMAL, view: '2.5' },
  { name: 'fractional', value: FRACTIAL, view: '3/2' },
  { name: 'american', value: AMERICAN, view: '150.00' },
  { name: 'hongKong', value: HONK_KONG, view: '1.50' },
  { name: 'malay', value: MALAY, view: '-0.66' },
  { name: 'indonesian', value: INDONESIAN, view: '1.50' },
];
