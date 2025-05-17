'use client';

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
import { useState } from 'react';
import { BarChart } from 'lucide-react';

const students = [
  {
    id: 'STU001',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    level: 'JSS1',
    yearAdmitted: 2022,
    stateOfOrigin: 'Lagos',
  },
  {
    id: 'STU002',
    firstName: 'Jane',
    lastName: 'Smith',
    gender: 'Female',
    level: 'SS2',
    yearAdmitted: 2021,
    stateOfOrigin: 'Enugu',
  },
  {
    id: 'STU003',
    firstName: 'Ahmed',
    lastName: 'Bello',
    gender: 'Male',
    level: 'JSS3',
    yearAdmitted: 2023,
    stateOfOrigin: 'Kano',
  },
  {
    id: 'STU004',
    firstName: 'Chika',
    lastName: 'Okafor',
    gender: 'Female',
    level: 'SS1',
    yearAdmitted: 2020,
    stateOfOrigin: 'Abia',
  },
];

const StudentsPage = () => {
  const [search, setSearch] = useState('');

  const filteredStudents = students.filter(
    (s) =>
      s.firstName.toLowerCase().includes(search.toLowerCase()) ||
      s.lastName.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  const total = students.length;
  const males = students.filter((s) => s.gender === 'Male').length;
  const females = students.filter((s) => s.gender === 'Female').length;

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
          <CardContent className='text-3xl font-bold'>{total}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Male Students</CardTitle>
            <CardDescription>Number of boys</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-blue-600'>
            {males}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Female Students</CardTitle>
            <CardDescription>Number of girls</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-pink-600'>
            {females}
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Year Admitted</TableHead>
              <TableHead>State</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.level}</TableCell>
                <TableCell>{student.yearAdmitted}</TableCell>
                <TableCell>{student.stateOfOrigin}</TableCell>
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
      </div>
    </div>
  );
};

export default StudentsPage;
