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

const results = [
  {
    id: 'RES001',
    studentName: 'John Doe',
    term: 'First Term',
    session: '2023/2024',
    class: 'JSS1',
    status: 'Published',
  },
  {
    id: 'RES002',
    studentName: 'Jane Smith',
    term: 'Second Term',
    session: '2023/2024',
    class: 'SS2',
    status: 'Unpublished',
  },
  {
    id: 'RES003',
    studentName: 'Ahmed Bello',
    term: 'First Term',
    session: '2023/2024',
    class: 'JSS3',
    status: 'Published',
  },
];

const AdminResultsPage = () => {
  const [search, setSearch] = useState('');

  const filteredResults = results.filter((result) =>
    result.studentName.toLowerCase().includes(search.toLowerCase())
  );

  const total = results.length;
  const published = results.filter((r) => r.status === 'Published').length;
  const unpublished = results.filter((r) => r.status === 'Unpublished').length;

  return (
    <div className='p-4 space-y-6'>
      <h1 className='text-2xl font-semibold'>Results Overview</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Total Results</CardTitle>
            <CardDescription>All uploaded results</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold'>{total}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published</CardTitle>
            <CardDescription>Visible to students</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-green-600'>
            {published}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unpublished</CardTitle>
            <CardDescription>Pending publication</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-red-600'>
            {unpublished}
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className='max-w-md'>
        <Input
          placeholder='Search by student name'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Result ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.studentName}</TableCell>
                <TableCell>{r.class}</TableCell>
                <TableCell>{r.term}</TableCell>
                <TableCell>{r.session}</TableCell>
                <TableCell
                  className={
                    r.status === 'Published'
                      ? 'text-green-600 font-medium'
                      : 'text-red-600 font-medium'
                  }
                >
                  {r.status}
                </TableCell>
              </TableRow>
            ))}
            {filteredResults.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='text-center py-4 text-muted-foreground'
                >
                  No matching results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminResultsPage;
