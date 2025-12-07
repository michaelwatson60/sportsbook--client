// cashout
const cashoutApi = 'sportsbook/cashout'; // TODO: should be removed
const preSubmitCashout = '/sportsbook/pre-submit-cashout';
const submitCashout = '/sportsbook/submit-cashout';
const cashoutDetails = 'sportsbook/cashout-details';
const partialCashout = 'sportsbook/partial-cashout'; //TODO: should be removed
// bet
const placeBetApi = '/sportsbook/submit-bet';
const getMaxBet = '/sportsbook/max-bet';
const placeSingleBetApi = '/sportsbook/submit-single-bet';
const preSubmitBet = '/sportsbook/pre-submit-bet';

export const betSlipApi = {
  placeBetApi,
  cashoutApi,
  cashoutDetails,
  partialCashout,
  getMaxBet,
  placeSingleBetApi,
  preSubmitBet,
  preSubmitCashout,
  submitCashout,
};
