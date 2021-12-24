import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const recordsApi = createApi({
  reducerPath: 'recordsAPI',
  baseQuery: fetchBaseQuery(),
  endpoints: (build) => ({
    fetchAllRecords: build.query({
      query: ({ limit = 10, filter }) => ({ url: '/api/records', params: { limit, filter } }),
    }),
  }),
});
