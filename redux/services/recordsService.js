import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { assign, find, map, nth, pullAllBy, tail } from 'lodash';

import { selectFilter, selectLimit } from 'redux/slices/records';
import { DELETE, POST, PUT } from 'lib/constants';

export const CREATE_RECORD = 'createRecord';
export const RETRIEVE_RECORDS = 'retrieveRecords';
export const UPDATE_RECORD = 'updateRecord';
export const DELETE_RECORD = 'deleteRecord';

const type = 'record';
const baseQuery = fetchBaseQuery({ baseUrl: 'api/' });

export const recordsApi = createApi({
  reducerPath: 'recordsAPI',
  baseQuery,
  tagTypes: [type],
  endpoints: ({ query }) => ({
    [RETRIEVE_RECORDS]: query({
      query: ({ limit = 10, filter }) => ({ url: '/records', params: { limit, filter } }),
      providesTags: (results) => [
        ...(results ? [...map(results, ({ _id: id }) => ({ type, id }))] : []),
        { type, id: 'LIST' },
      ],
    }),
  }),
});

const { util } = recordsApi;

const onCreateQueryStarted = async(body, { dispatch, queryFulfilled, getState }) => {
  try {
    const filter = selectFilter(getState());
    const limit = selectLimit(getState());
    const { updateQueryData } = util;

    const patch = dispatch(updateQueryData(
      RETRIEVE_RECORDS,
      { filter, limit },
      (draft) => {
        const records = tail(draft);
        const settings = nth(draft, 0);
        const newRecords = ([body, ...records]).sort((a, b) => new Date(b.traveldate) - new Date(a.traveldate));

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
    const filter = selectFilter(getState());
    const limit = selectLimit(getState());
    const { _id } = body;
    const { updateQueryData } = util;

    const patch = dispatch(updateQueryData(
      RETRIEVE_RECORDS,
      { filter, limit },
      (draft) => {
        const updated = find(draft, { _id });

        assign(updated, body);
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
    const filter = selectFilter(getState());
    const limit = selectLimit(getState());
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
      invalidatesTags: [{ type, id: 'LIST' }],
      onQueryStarted: onCreateQueryStarted,
    }),
    [UPDATE_RECORD]: mutation({
      query: (body) => ({ url: `/records/${body._id}`, method: PUT, body }),
      invalidatesTags: (results, error, { _id: id }) => [{ type, id }],
      onQueryStarted: onUpdateQueryStarted,
    }),
    [DELETE_RECORD]: mutation({
      query: (id) => ({ url: `/records/${id}`, method: DELETE }),
      invalidatesTags: (results, error, id) => [{ type, id }],
      onQueryStarted: onDeleteQueryStarted,
    }),
  }),
});
