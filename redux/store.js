import { reduce } from 'lodash';
import { configureStore } from '@reduxjs/toolkit';

import * as reducers from 'redux/index';

const reducer = reduce(reducers, (acc, reducer, name) => {
  return { ...acc, [name]: reducer };
}, {});

export default configureStore({
  reducer,
});
