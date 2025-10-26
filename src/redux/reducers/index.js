import { combineReducers } from '@reduxjs/toolkit';
import configs from './configs/configs.slice';
import auth from './auth/auth.slice';
import live from './live/live.slice';
import sportsbook from './sportsbook/sportsbook.slice';
import popups from './popups/popups.slice';
import upcoming from './upcoming/upcoming.slice';
import topEvents from './topEvents/topEvents.slice';
import betslip from './betslip/betslip.slice';
import sport from './sport/sport.slice';

export const reducers = combineReducers({
  configs,
  auth,
  sportsbook,
  live,
  popups,
  upcoming,
  topEvents,
  betslip,
  sport,
});
