import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { data: undefined, loading: true },
  reducers: {
    setUser(state, { payload }) {
      assign(state, payload);
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectAuthData = createDraftSafeSelector((state) => state, ({ auth }) => auth.data);
export const selectAuthIsLoading = createDraftSafeSelector((state) => state, ({ auth }) => auth.loading);

export default authSlice.reducer;
