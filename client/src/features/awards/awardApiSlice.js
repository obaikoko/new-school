import { AWARDS_URL } from '../constants';
import { apiSlice } from '../apiSlice';

export const awardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAwards: builder.query({
      query: () => ({
        url: `${AWARDS_URL}`,
      }),
      providesTags: ['Awards'],
      keepUnusedDataFor: 5,
    }),
    addAwards: builder.mutation({
      query: (data) => ({
        url: `${AWARDS_URL}/${data.student}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      providesTags: ['Awards'],
      keepUnusedDataFor: 5,
    }),
    deleteAward: builder.mutation({
      query: (awardId) => ({
        url: `${AWARDS_URL}/${awardId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      providesTags: ['Awards'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetAwardsQuery,
  useAddAwardsMutation,
  useDeleteAwardMutation,
} = awardApiSlice;
