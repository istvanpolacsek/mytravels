import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { assign, find, map, without } from 'lodash';

import { DELETE, POST, PUT } from 'lib/constants';
import { selectFilter } from 'redux/slices/records';

const type = 'record';

export const recordsApi = createApi({
  reducerPath: 'recordsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'api/' }),
  tagTypes: [type],
  endpoints: ({ query, mutation }) => ({
    createRecord: mutation({
      query: (body) => ({ url: '/records', method: POST, body }),
      invalidatesTags: [{ type, id: 'LIST' }],
      onQueryStarted: async(body, { dispatch, queryFulfilled, getState }) => {
        const { util } = recordsApi;
        const filter = selectFilter(getState());
        const patch = dispatch(util.updateQueryData(
          'retrieveRecords',
          { filter },
          (draft) =>
            ([body, ...draft]).sort((a, b) => new Date(b.traveldate) - new Date(a.traveldate)),
        ));

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
    retrieveRecords: query({
      query: ({ limit = 10, filter }) => ({ url: '/records', params: { limit, filter } }),
      providesTags: (results) => [
        ...(results ? [...map(results, ({ _id: id }) => ({ type, id }))] : []),
        { type, id: 'LIST' },
      ],
    }),
    updateRecord: mutation({
      query: (body) => ({ url: `/records/${body._id}`, method: PUT, body }),
      invalidatesTags: (results, error, { _id: id }) => [{ type, id }],
      onQueryStarted: async(body, { dispatch, queryFulfilled, getState }) => {
        const { _id } = body;
        const { util } = recordsApi;
        const filter = selectFilter(getState());
        const patch = dispatch(util.updateQueryData(
          'retrieveRecords',
          { filter },
          (draft) => {
            const updated = find(draft, { _id });

            assign(updated, body);
          }));

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
    deleteRecord: mutation({
      query: (id) => ({ url: `/records/${id}`, method: DELETE }),
      invalidatesTags: (results, error, id) => [{ type, id }],
      onQueryStarted: async(_id, { dispatch, queryFulfilled, getState }) => {
        const { util } = recordsApi;
        const filter = selectFilter(getState());
        const patch = dispatch(util.updateQueryData(
          'retrieveRecords',
          { filter },
          (draft) => without(draft, { _id }),
        ));

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});
