import _ from 'lodash';
import { createSelectorCreator, defaultMemoize } from 'reselect';

export const createDeepSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual,
);
