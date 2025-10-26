export const BETSLIP_TYPES = {
  SINGLE: 'singleBet',
  MULTIPLE: 'multiBet',
  SYSTEM: 'systemBet',
};

export const BETSLIP_ACCEPT_TYPES_IDS = {
  ACCEPT: 1,
  // ACCEPT_HIGHER: 2,
  ASK: 0,
};

const { ASK, ACCEPT, ACCEPT_HIGHER } = BETSLIP_ACCEPT_TYPES_IDS;

export const BETSLIP_ACCEPT_TYPES_NAMES = {
  [ACCEPT]: 'Accept any odds change',
  [ACCEPT_HIGHER]: 'Accept higher odds',
  [ASK]: 'Always ask on odds change',
};

export const SYSTEM_ORDERS = { 1: 'Singles', 2: 'Doubles', 3: 'Trebles' };

export const BETSLIP_ERRORS = {
  SAME_EVENTS: 'Some of your selections cannot be combined',
  NOT_ENOUGH_BALANCE: 'Not enough balance',
};

export const BETSLIP_BONUS_BY_BETS_COUNT = {
  5: 5,
  6: 10,
  7: 15,
  8: 20,
  9: 25,
  10: 30,
  11: 35,
  12: 40,
  13: 45,
  14: 50,
  15: 55,
  16: 65,
  17: 75,
  18: 85,
  19: 95,
  20: 105,
  21: 115,
  22: 125,
  23: 135,
  24: 145,
  25: 155,
  26: 175,
  27: 195,
  28: 215,
  29: 235,
  30: 255,
  31: 275,
  32: 295,
  33: 315,
  34: 335,
  35: 365,
};
