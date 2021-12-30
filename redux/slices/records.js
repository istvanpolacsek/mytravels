import { createDraftSafeSelector, createSelector, createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

import { recordsApi } from 'redux/services/recordsService';

const { endpoints } = recordsApi;

const recordsSlice = createSlice({
  name: 'records',
  initialState: { filter: 'All' },
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
