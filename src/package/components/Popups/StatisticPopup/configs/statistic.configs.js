import StatisticHth from '../components/StatisticHth/StatisticHth';
import StatisticList from '../components/StatisticList/StatisticList';

export const STATISTIC_TABS_KEYS = {
  FORM: 'form',
  HTH: 'hth',
  STANDING: 'standing',
};

const { FORM, HTH, STANDING } = STATISTIC_TABS_KEYS;

export const STATISTIC_TABS_NAMES = {
  [FORM]: 'Form',
  [HTH]: 'Head to Head',
  [STANDING]: 'Standing',
};

export const STATISTIC_TABS_COMPONENTS = {
  [FORM]: StatisticList,
  [HTH]: StatisticHth,
  [STANDING]: StatisticList,
};
