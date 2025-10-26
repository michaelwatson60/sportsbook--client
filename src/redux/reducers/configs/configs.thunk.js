import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOP_LEAGUE_IDS_BY_SPORT } from '@/constants/sports.constants';
import {
  setMinBet,
  setOddMaxCount,
} from '@/redux/reducers/betslip/betslip.slice';

export const getConfigsThunk = createAsyncThunk('configs/get', async () => {
  const response = await axios.get('configs');

  return response;
});

export const fetchSportsbookSettings = createAsyncThunk(
  'configs/fetchSportsbookSettings',
  async (_, thunkApi) => {
    const response = await axios.get('configs/sportsbook-settings');

    if (response.settings?.generalSettings?.bet?.min) {
      thunkApi.dispatch(
        setMinBet(response.settings?.generalSettings?.bet?.min),
      );
    }
    if (response.settings?.generalSettings?.oddMaxCount) {
      thunkApi.dispatch(
        setOddMaxCount(response.settings.generalSettings.oddMaxCount),
      );
    }

    return response;
  },
);
export const configsExtraReducers = builder => {
  builder
    .addCase(getConfigsThunk.pending, state => {
      state.isLoading = true;
    })
    .addCase(getConfigsThunk.fulfilled, (state, { payload }) => {
      if (Array.isArray(payload?.topLeagues)) {
        TOP_LEAGUE_IDS_BY_SPORT[50] = payload.topLeagues;
      }

      return {
        ...state,
        isLoading: false,
        isConfigsExist: true,
        ...payload,
      };
    })
    .addCase(getConfigsThunk.rejected, state => {
      state.isLoading = false;
    })
    .addCase(fetchSportsbookSettings.pending, state => {
      state.sportsbookSettingsLoading = true;
    })
    .addCase(fetchSportsbookSettings.fulfilled, (state, { payload }) => {
      return {
        ...state,
        sportsbookSettingsLoading: false,
        ...payload,
      };
    })
    .addCase(fetchSportsbookSettings.rejected, state => {
      state.sportsbookSettingsLoading = false;
    });
};
