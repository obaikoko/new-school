import { EVENTS_URL } from '../constants';
import { apiSlice } from '../apiSlice';

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: `${EVENTS_URL}`,
      }),
      providesTags: ['Events'],
      keepUnusedDataFor: 5,
    }),
    addEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      providesTags: ['Events'],
      keepUnusedDataFor: 5,
    }),
    deleteEvent: builder.mutation({
      query: (evebtId) => ({
        url: `${EVENTS_URL}/${evebtId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      providesTags: ['Events'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useDeleteEventMutation,
} = eventApiSlice;
