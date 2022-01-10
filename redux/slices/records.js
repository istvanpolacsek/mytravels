import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

const initialLimit = 10;
const increment = 10;

const recordsSlice = createSlice({
  name: 'records',
  initialState: { filter: 'All', limit: initialLimit },
  reducers: {
    setFilter(state, { payload }) {
      assign(state, payload, { limit: initialLimit });
    },
    increaseLimit(state) {
      assign(state, { limit: state.limit + increment });
    },
  },
});

export const { setFilter, increaseLimit } = recordsSlice.actions;

export const selectQuerySettings = createDraftSafeSelector(
  (state) => state,
  ({ records: { filter, limit } }) => ({ filter, limit }),
);

export default recordsSlice.reducer;
