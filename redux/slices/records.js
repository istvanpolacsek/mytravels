import { createDraftSafeSelector, createSelector, createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

import { recordsApi, RETRIEVE_RECORDS } from 'redux/services/recordsService';

const { endpoints } = recordsApi;
const retrieve = endpoints[RETRIEVE_RECORDS].select();

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

export const selectFilter = createDraftSafeSelector(
  (state) => state,
  ({ records }) => records.filter,
);

export const selectLimit = createDraftSafeSelector(
  (state) => state,
  ({ records }) => records.limit,
);

export const selectQuerySettings = createSelector(
  selectFilter,
  selectLimit,
  (filter, limit) => retrieve({ filter, limit }),
  (filter, limit, res) => res,
);


export default recordsSlice.reducer;
