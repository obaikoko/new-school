import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    'User',
    'Students',
    'Staff',
    'Results',
    'Awards',
    'Admission',
    'Events',
    'NextTerm',
    'Data',
  ],
  // eslint-disable-next-line
  endpoints: (builder) => ({}),
});
