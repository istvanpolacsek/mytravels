import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

const recordsSlice = createSlice({
  name: 'records',
  initialState: { filter: 'all' },
  reducers: {
    setFilter(state, { payload }) {
      assign(state, payload);
    },
  },
});

export const { setFilter } = recordsSlice.actions;

export const selectFilter = createDraftSafeSelector(
  (state) => state,
  ({ records }) => records.filter,
);

export default recordsSlice.reducer;
