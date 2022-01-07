import { combineReducers } from '@reduxjs/toolkit';

import records from 'redux/slices/records';
import auth from 'redux/slices/auth';
import settings from 'redux/slices/settings';
import { recordsApi } from 'redux/services/recordsService';
import { recordStatsApi } from 'redux/services/recordStatsService';

const { reducerPath: recordsApiKey, reducer: recordsApiReducer } = recordsApi;
const { reducerPath: recordStatsApiKey, reducer: recordStatsApiReducer } = recordStatsApi;

export default combineReducers({
  auth,
  settings,
  records,
  [recordsApiKey]: recordsApiReducer,
  [recordStatsApiKey]: recordStatsApiReducer,
});
