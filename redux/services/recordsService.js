import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { assign, find, includes, map, nth, pullAllBy, tail, without } from 'lodash';

import { selectQuerySettings } from 'redux/slices/records';
import { DELETE, POST, PUT } from 'lib/constants';

export const CREATE_RECORD = 'createRecord';
export const RETRIEVE_RECORDS = 'retrieveRecords';
export const RETRIEVE_STATS = 'retrieveStats';
export const UPDATE_RECORD = 'updateRecord';
export const DELETE_RECORD = 'deleteRecord';

const RECORD = 'record';
const STATS = 'stats';
const baseQuery = fetchBaseQuery({ baseUrl: 'api/' });

export const recordsApi = createApi({
  reducerPath: 'recordsAPI',
  baseQuery,
  tagTypes: [RECORD, STATS],
  endpoints: ({ query }) => ({
    [RETRIEVE_RECORDS]: query({
      query: ({ limit = 10, filter }) => ({ url: '/records', params: { limit, filter } }),
      providesTags: (results) => [
        ...(results ? [...map(results, ({ _id: id }) => ({ type: RECORD, id }))] : []),
        { type: RECORD, id: 'LIST' },
      ],
    }),
    [RETRIEVE_STATS]: query({
      query: () => ({ url: '/stats' }),
      providesTags: [{ type: STATS, id: 'OBJECT' }],
    }),
  }),
});

const { util } = recordsApi;

const onCreateQueryStarted = async(body, { dispatch, queryFulfilled, getState }) => {
  try {
    const { filter, limit } = selectQuerySettings(getState());
    const { updateQueryData } = util;
    const { traveltype } = body;

    const patch = dispatch(updateQueryData(
      RETRIEVE_RECORDS,
      { filter, limit },
      (draft) => {
        const records = tail(draft);
        const settings = nth(draft, 0);
        const newRecords = ([...(includes(['All', traveltype], filter) ? [body] : []), ...records])
          .sort((a, b) => new Date(b.traveldate) - new Date(a.traveldate));

        return [settings, ...newRecords];
      },
    ));

    try {
      await queryFulfilled;
    } catch {
      patch.undo();
    }
  } catch (e) {

  }
};

const onUpdateQueryStarted = async(body, { dispatch, queryFulfilled, getState }) => {
  try {
    const { filter, limit } = selectQuerySettings(getState());
    const { _id, traveltype } = body;
    const { updateQueryData } = util;

    const patch = dispatch(updateQueryData(
      RETRIEVE_RECORDS,
      { filter, limit },
      (draft) => {
        const settings = nth(draft, 0);
        const touched = find(draft, { _id });
        const records = without(draft, settings, touched);
        const updated = assign({}, touched, body);
        const newRecords = ([...(includes(['All', traveltype], filter) ? [updated] : []), ...records])
          .sort((a, b) => new Date(b.traveldate) - new Date(a.traveldate));

        return [settings, ...newRecords];
      },
    ));

    try {
      await queryFulfilled;
    } catch {
      patch.undo();
    }
  } catch (e) {

  }
};

const onDeleteQueryStarted = async(_id, { dispatch, queryFulfilled, getState }) => {
  try {
    const { filter, limit } = selectQuerySettings(getState());
    const { updateQueryData } = util;

    const patch = dispatch(updateQueryData(
      RETRIEVE_RECORDS,
      { filter, limit },
      (draft) => pullAllBy(draft, [{ _id }], '_id'),
    ));

    try {
      await queryFulfilled;
    } catch {
      patch.undo();
    }
  } catch (e) {

  }
};

recordsApi.injectEndpoints({
  endpoints: ({ mutation }) => ({
    [CREATE_RECORD]: mutation({
      query: (body) => ({ url: '/records', method: POST, body }),
      invalidatesTags: [{ type: RECORD, id: 'LIST' }, { type: STATS, id: 'OBJECT' }],
      onQueryStarted: onCreateQueryStarted,
    }),
    [UPDATE_RECORD]: mutation({
      query: (body) => ({ url: `/records/${body._id}`, method: PUT, body }),
      invalidatesTags: (results, error, { _id: id }) => [{ type: RECORD, id }, { type: STATS, id: 'OBJECT' }],
      onQueryStarted: onUpdateQueryStarted,
    }),
    [DELETE_RECORD]: mutation({
      query: (id) => ({ url: `/records/${id}`, method: DELETE }),
      invalidatesTags: (results, error, id) => [{ type: RECORD, id }, { type: STATS, id: 'OBJECT' }],
      onQueryStarted: onDeleteQueryStarted,
    }),
  }),
});
