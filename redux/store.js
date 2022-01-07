import { concat } from 'lodash';
import { configureStore } from '@reduxjs/toolkit';

import reducer from 'redux/index';
import { recordsApi } from 'redux/services/recordsService';
import { recordStatsApi } from 'redux/services/recordStatsService';

const { middleware: recordsApiMiddleware } = recordsApi;
const { middleware: recordStatsApiMiddleware } = recordStatsApi;

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => concat(getDefaultMiddleware({
    serializableCheck: false,
  }), recordsApiMiddleware, recordStatsApiMiddleware),
});
