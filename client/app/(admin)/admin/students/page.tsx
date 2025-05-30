'use client';

import { useState } from 'react';
import { useGetStudentsQuery } from '@/src/features/students/studentApiSlice';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Student } from '@/schemas/studentSchema';
import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';

const StudentsPage = () => {
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useGetStudentsQuery({ page: 1 });

  const students = data?.students ?? [];
  const filteredStudents = students.filter(
    (s: Student) =>
      s.firstName.toLowerCase().includes(search.toLowerCase()) ||
      s.lastName.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  const total = students.length;
  const males = students.filter((s: Student) => s.gender === 'Male').length;
  const females = students.filter((s: Student) => s.gender === 'Female').length;

  return (
    <div className='p-4 space-y-6'>
      <h1 className='text-2xl font-semibold'>Students Overview</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
            <CardDescription>All registered students</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold'>
            {isLoading ? 'Loading...' : total}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Male Students</CardTitle>
            <CardDescription>Number of boys</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-blue-600'>
            {isLoading ? 'Loading...' : males}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Female Students</CardTitle>
            <CardDescription>Number of girls</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-pink-600'>
            {isLoading ? 'Loading...' : females}
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className='max-w-md'>
        <Input
          placeholder='Search by name or ID'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        {isLoading ? (
          <p className='text-muted-foreground'>Loading students...</p>
        ) : isError ? (
          <p className='text-red-500'>
            Failed to load students. Please try again.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Date Of Birth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student: Student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell className='cursor-pointer text-primary underline'>
                    <Link href={`/admin/students/${student.id}`}>
                      {student.firstName}
                    </Link>
                  </TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.level}</TableCell>
                  <TableCell>{formatDateTime(student.dateOfBirth)}</TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='text-center py-4 text-muted-foreground'
                  >
                    No students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
