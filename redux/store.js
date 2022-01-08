import { concat } from 'lodash';
import { configureStore } from '@reduxjs/toolkit';

import reducer from 'redux/index';
import { recordsApi } from 'redux/services/recordsService';

const { middleware: recordsApiMiddleware } = recordsApi;

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => concat(
    getDefaultMiddleware({ serializableCheck: false }), recordsApiMiddleware),
});
