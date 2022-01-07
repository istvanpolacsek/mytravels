import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const type = 'stats';
const baseQuery = fetchBaseQuery({ baseUrl: 'api/' });

const RETRIEVE_STATS = 'retrieveStats';

export const recordStatsApi = createApi({
  reducerPath: 'recordStatsAPI',
  baseQuery,
  tagTypes: [type],
  endpoints: ({ query }) => ({
    [RETRIEVE_STATS]: query({
      query: () => ({ url: '/stats' }),
      providesTags: [{ type, id: 'OBJECT' }],
    }),
  }),
});
