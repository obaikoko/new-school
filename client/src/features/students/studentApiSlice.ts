import { STUDENTS_URL } from '../constants';
import { apiSlice } from '../apiSlice';
import { Student, Students } from '@/schemas/studentSchema';

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentProfile: builder.query<Student, string>({
      query: () => ({
        url: `${STUDENTS_URL}/profile`,
        credentials: 'include',
      }),
      providesTags: ['Students'],
      keepUnusedDataFor: 5,
    }),
    getStudents: builder.query<Students, number>({
      query: (page) => ({
        url: `${STUDENTS_URL}?pageNumber=${page}`,
        credentials: 'include',
      }),
      providesTags: ['Students'],
      keepUnusedDataFor: 5,
    }),
    getStudentResults: builder.query({
      query: () => ({
        url: `${STUDENTS_URL}/results`,
        credentials: 'include',
      }),
      providesTags: ['Students'],
      keepUnusedDataFor: 5,
    }),
    searchStudents: builder.query<
      Students,
      { keyword: string | null; level: string | null; page: number | null }
    >({
      query: ({ keyword, level, page }) => ({
        url: `${STUDENTS_URL}/?keyword=${keyword}&level=${level}&pageNumber=${page}`,
        credentials: 'include',
      }),
      providesTags: ['Students'],
      keepUnusedDataFor: 5,
    }),
    getStudent: builder.query<Student, string>({
      query: (studentId) => ({
        url: `${STUDENTS_URL}/${studentId}`,
        credentials: 'include',
      }),
      providesTags: ['Students'],
      keepUnusedDataFor: 5,
    }),
    registerStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/register`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    updateStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/${data.studentId}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
    deleteStudent: builder.mutation({
      query: (studentId) => ({
        url: `${STUDENTS_URL}/${studentId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),
    graduateStudents: builder.mutation({
      query: () => ({
        url: `${STUDENTS_URL}/graduate`,
        method: 'PUT',
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),
    reserStudentsFee: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/fees`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Students'],
    }),

    forgetStudentPassword: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/forget-password`,
        method: 'POST',
        body: data,
      }),
    }),
    resetStudentPassword: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/reset-password?token=${data.token}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetStudentProfileQuery,
  useGetStudentsQuery,
  useGetStudentQuery,
  useGetStudentResultsQuery,
  useSearchStudentsQuery,
  useRegisterStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useGraduateStudentsMutation,
  useForgetStudentPasswordMutation,
  useResetStudentPasswordMutation,
  useReserStudentsFeeMutation,
} = studentsApiSlice;
