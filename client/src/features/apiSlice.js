import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://bew-school-server.onrender.com',
  // baseUrl: 'http://localhost:5000',
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
