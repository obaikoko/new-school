import { DATA_URL } from '../constants';
import { apiSlice } from '../apiSlice';

export const dataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStaffData: builder.query({
      query: () => ({
        url: `${DATA_URL}/staff`,
        credentials: 'include',
      }),
      providesTags: ['Data'],
      keepUnusedDataFor: 5,
    }),
    getStudentsData: builder.query({
      query: () => ({
        url: `${DATA_URL}/students`,
        credentials: 'include',
      }),
      providesTags: ['Data'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetStaffDataQuery, useGetStudentsDataQuery } = dataApiSlice;
