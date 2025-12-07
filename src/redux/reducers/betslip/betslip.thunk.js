import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateBalance } from '../auth/auth.slice';
import { API } from '@/api';

export const placeBetThunk = createAsyncThunk(
  'betslip/placeBet',
  async ({ isSingle, token }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        isSingle ? API.betSlip.placeSingleBetApi : API.betSlip.placeBetApi,
        { token },
      );

      if (typeof response?.currentBalance === 'number') {
        dispatch(updateBalance(response.currentBalance));
      }

      return response.events;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const betslipBookThunk = createAsyncThunk(
  'betslip/book',
  async (_, { getState }) => {
    const { bets } = getState().betslip;

    const response = await axios.post('v2/book-betslip', { betslip: bets });

    return response;
  },
);

export const getBetslipBookThunk = createAsyncThunk(
  'betslip/get-book',
  async id => {
    const response = await axios.get('v2/book-betslip', { params: { id } });

    return response;
  },
);

export const betslipExtraReducers = builder => {
  builder
    .addCase(placeBetThunk.pending, state => {
      state.isLoading = true;
    })
    .addCase(placeBetThunk.fulfilled, (state, { meta }) => {
      const { bets } = meta.arg;
      state.isLoading = false;
      bets.forEach(bet => {
        state.bets[bet.ref].success = true;
      });
    })
    .addCase(placeBetThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isLoading = false;
      // if (Array.isArray(payload) && payload[0]?.message) {
      //   state.error = payload[0].message;
      // } else
      if (payload?.odds) {
        payload?.odds.forEach(odd => {
          if (odd.message?.length) {
            state.bets[odd.r].error = odd.message.join(', ');
          }
        });
      }

      // bets.forEach(bet => {
      //   state.bets[bet.ref].error = true;
      // });
    })
    .addCase(betslipBookThunk.pending, state => {
      state.isBookLoading = true;
    })
    .addCase(betslipBookThunk.fulfilled, (state, { payload }) => {
      state.isBookLoading = false;
      state.bookCode = payload.id;
    })
    .addCase(betslipBookThunk.rejected, state => {
      state.isBookLoading = false;
    })
    .addCase(getBetslipBookThunk.pending, state => {
      state.isBookGetLoading = true;
    })
    .addCase(getBetslipBookThunk.fulfilled, (state, { payload }) => {
      state.isBookGetLoading = false;
      if (payload.betslip) {
        state.bets = payload.betslip;
      }
    })
    .addCase(getBetslipBookThunk.rejected, state => {
      state.isBookGetLoading = false;
    });
};
