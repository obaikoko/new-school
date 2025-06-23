'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, School, BookOpenCheck, CreditCard } from 'lucide-react';
import {
  useGetStudentsDataQuery,
  useGetStaffDataQuery,
  useGetUsersDataQuery,
} from '@/src/features/data/dataApiSlice';
import { useGetAllAdmissionQuery } from '@/src/features/admission/admissionApiSlice';
import StudentsTable from '@/components/shared/students/students-table';
import { useGetStudentsQuery } from '@/src/features/students/studentApiSlice';
const DashboardPage = () => {
  const {
    data,
    isLoading: loadingStudents,
    isError: studentError,
  } = useGetStudentsQuery(1);
  const {
    data: studentsData,
    isLoading: loadingStudentsData,
    isError: studentsDataError,
  } = useGetStudentsDataQuery({});
  const {
    data: usersData,
    isLoading: loadingUsersData,
    isError: usersDataError,
  } = useGetUsersDataQuery({});
  const {
    data: staffData,
    isLoading: loadingStaffData,
    isError: staffDataError,
  } = useGetStaffDataQuery({});
  const {
    data: admission,
    isLoading: loadingAdmission,
    isError: admissionError,
  } = useGetAllAdmissionQuery({});
  const students = data?.students ?? [];

  return (
    <div className='p-6 space-y-6'>
      {/* Header */}
      <h1 className='text-2xl font-bold'>
        Welcome to the School Admin Dashboard
      </h1>

      {/* Overview cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Users</CardTitle>
            <BookOpenCheck className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {loadingUsersData ? (
                <>
                  <p>Loading...</p>
                </>
              ) : usersDataError ? (
                <>
                  <p>An Error occurred</p>
                </>
              ) : (
                <> {usersData.totalUsers}</>
              )}
            </div>
            <p className='text-xs text-muted-foreground'>Registered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Students</CardTitle>
            <Users className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {loadingStudentsData ? (
                <>
                  <p>Loading...</p>
                </>
              ) : studentsDataError ? (
                <>
                  <p>An Error occurred</p>
                </>
              ) : (
                <>{studentsData?.totalStudents}</>
              )}
            </div>
            <p className='text-xs text-muted-foreground'>Registered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Staff</CardTitle>
            <School className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {loadingStaffData ? (
                <>
                  <p>Loading...</p>
                </>
              ) : staffDataError ? (
                <>
                  <p>An Error occurred</p>
                </>
              ) : (
                <>{staffData?.totalStaff}</>
              )}
            </div>

            <p className='text-xs text-muted-foreground'>Registered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Admissions</CardTitle>
            <CreditCard className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {loadingAdmission ? (
                <>
                  <p>Loading...</p>
                </>
              ) : admissionError ? (
                <>
                  <p>An Error occurred</p>
                </>
              ) : (
                <> {admission?.totalAdmission}</>
              )}
            </div>
            <p className='text-xs text-muted-foreground'>Registered</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent enrollments table */}
      <div className='mt-6'>
        <h2 className='text-lg font-semibold mb-2'>Recent Enrollments</h2>

        <StudentsTable
          students={students}
          isLoading={loadingStudents}
          isError={studentError}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
