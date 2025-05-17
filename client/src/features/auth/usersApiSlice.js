import { USERS_URL } from '../constants';
import { apiSlice } from '../apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    sendMail: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/mails`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forget-password`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reset-password?token=${data.token}`,
        method: 'PUT',
        body: data,
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        credentials: 'include',
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useSendMailMutation,
  useGetUserDetailsQuery,
} = usersApiSlice;
