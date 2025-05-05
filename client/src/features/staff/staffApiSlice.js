import { STAFF_URL } from '../constants';
import { apiSlice } from '../apiSlice';

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerStaff: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getAllStaff: builder.query({
      query: (page) => ({
        url: `${STAFF_URL}?pageNumber=${page}`,
        credentials: 'include',
      }),
      providesTags: ['Staff'],
      keepUnusedDataFor: 5,
    }),
    searchStaff: builder.query({
      query: ({ keyword }) => ({
        url: `${STAFF_URL}?keyword=${keyword}`,
        credentials: 'include',
      }),
      providesTags: ['Staff'],
      keepUnusedDataFor: 5,
    }),
    getStaff: builder.query({
      query: (staffId) => ({
        url: `${STAFF_URL}/${staffId}`,
        credentials: 'include',
      }),
      providesTags: ['Staff'],
      keepUnusedDataFor: 5,
    }),

    updateStaff: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/${data.staffId}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
    deleteStaff: builder.mutation({
      query: (staffId) => ({
        url: `${STAFF_URL}/${staffId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      providesTags: ['Staff'],
    }),
    staffData: builder.query({
      query: () => ({
        url: `${STAFF_URL}/data`,
        credentials: 'include',
      }),
      providesTags: ['Staff'],
    }),
  }),
});

export const {
  useRegisterStaffMutation,
  useGetAllStaffQuery,
  useGetStaffQuery,
  useDeleteStaffMutation,
  useSearchStaffQuery,
  useStaffDataQuery,
  useUpdateStaffMutation,
} = studentsApiSlice;
