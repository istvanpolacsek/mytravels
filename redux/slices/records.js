import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

import { recordsApi } from 'redux/services/recordsService';

const { endpoints } = recordsApi;

const initialLimit = 5;
const increment = 5;

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

export const selectFilter = createDraftSafeSelector(
  (state) => state,
  ({ records }) => records.filter,
);

export const selectLimit = createDraftSafeSelector(
  (state) => state,
  ({ records }) => records.limit,
);

export default recordsSlice.reducer;
