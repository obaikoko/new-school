import { RESULTS_URL } from '../constants';
import { apiSlice } from '../apiSlice';
import { StudentResult } from '@/schemas/resultSchema';

export const resultsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResults: builder.query({
      query: (page) => ({
        url: `${RESULTS_URL}?pageNumber=${page}`,
        credentials: 'include',
      }),
      providesTags: ['Results'],
      keepUnusedDataFor: 5,
    }),
    getResultsData: builder.query({
      query: () => ({
        url: `${RESULTS_URL}/data`,
        credentials: 'include',
      }),
      providesTags: ['Results'],
      keepUnusedDataFor: 5,
    }),
    getResult: builder.query<StudentResult, string>({
      query: (resultId) => ({
        url: `${RESULTS_URL}/${resultId}`,
        credentials: 'include',
      }),
      providesTags: ['Results'],
      keepUnusedDataFor: 5,
    }),
    getResultsForStudent: builder.query<StudentResult[], string>({
      query: (studentId) => ({
        url: `${RESULTS_URL}/student/${studentId}`,
        credentials: 'include',
      }),
      providesTags: ['Results'],
      keepUnusedDataFor: 5,
    }),
    searchResults: builder.query({
      query: ({ keyword, level, page }) => ({
        url: `${RESULTS_URL}?keyword=${keyword}&level=${level}&pageNumber=${page}`,
        credentials: 'include',
      }),
      providesTags: ['Results'],
      keepUnusedDataFor: 5,
    }),
    updateResult: builder.mutation({
      query: (data) => ({
        url: `${RESULTS_URL}/${data.resultId}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
    generateResult: builder.mutation({
      query: (data) => ({
        url: `${RESULTS_URL}/${data.studentId}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),

    deleteResult: builder.mutation({
      query: (resultId) => ({
        url: `${RESULTS_URL}/${resultId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Results'],
    }),
    addSubject: builder.mutation({
      query: (data) => ({
        url: `${RESULTS_URL}/subjects`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    generatePositions: builder.mutation({
      query: (data) => ({
        url: `${RESULTS_URL}/positions`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    removeSubject: builder.mutation({
      query: (data) => ({
        url: `${RESULTS_URL}/subjects`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
    resultPayment: builder.mutation({
      query: (data) => ({
        url: `${RESULTS_URL}/payment`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
    generateBroadsheet: builder.mutation({
      query: (data) => ({
        url: `${RESULTS_URL}/broadsheet`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetResultQuery,
  useGetResultsQuery,
  useGetResultsDataQuery,
  useGetResultsForStudentQuery,
  useSearchResultsQuery,
  useUpdateResultMutation,
  useGenerateResultMutation,
  useDeleteResultMutation,
  useGeneratePositionsMutation,
  useRemoveSubjectMutation,
  useAddSubjectMutation,
  useResultPaymentMutation,
  useGenerateBroadsheetMutation,
} = resultsApiSlice;
