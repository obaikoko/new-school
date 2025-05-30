'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';


const dummyResults = [
  {
    studentId: 'STU001',
    name: 'Jane Doe',
    class: 'JSS 2',
    term: 'First Term',
    session: '2023/2024',
    average: 84,
    status: 'Passed',
  },
  {
    studentId: 'STU002',
    name: 'John Smith',
    class: 'JSS 2',
    term: 'First Term',
    session: '2023/2024',
    average: 55,
    status: 'Passed',
  },
  {
    studentId: 'STU003',
    name: 'Ali Musa',
    class: 'JSS 2',
    term: 'First Term',
    session: '2023/2024',
    average: 38,
    status: 'Failed',
  },
];

const StudentsResultsPage = () => {
  const [session, setSession] = useState('');
  const [term, setTerm] = useState('');
  const [className, setClassName] = useState('');

  const filteredResults = dummyResults.filter((result) => {
    return (
      (session ? result.session === session : true) &&
      (term ? result.term === term : true) &&
      (className ? result.class === className : true)
    );
  });

  const total = filteredResults.length;
  const passed = filteredResults.filter((r) => r.status === 'Passed').length;
  const failed = total - passed;

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Student Results</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-sm text-muted-foreground'>Total Results</p>
            <p className='text-2xl font-semibold'>{total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-sm text-muted-foreground'>Passed</p>
            <p className='text-2xl font-semibold text-green-600'>{passed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-sm text-muted-foreground'>Failed</p>
            <p className='text-2xl font-semibold text-red-600'>{failed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <Select onValueChange={(val) => setSession(val)}>
          <SelectTrigger>
            <SelectValue placeholder='Select Session' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='2023/2024'>2023/2024</SelectItem>
            <SelectItem value='2022/2023'>2022/2023</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => setTerm(val)}>
          <SelectTrigger>
            <SelectValue placeholder='Select Term' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='First Term'>First Term</SelectItem>
            <SelectItem value='Second Term'>Second Term</SelectItem>
            <SelectItem value='Third Term'>Third Term</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => setClassName(val)}>
          <SelectTrigger>
            <SelectValue placeholder='Select Class' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='JSS 2'>JSS 2</SelectItem>
            <SelectItem value='JSS 3'>JSS 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl mt-4'>
          <thead className='bg-gray-100 dark:bg-gray-800'>
            <tr>
              <th className='px-4 py-2 text-left'>Student ID</th>
              <th className='px-4 py-2 text-left'>Name</th>
              <th className='px-4 py-2 text-left'>Class</th>
              <th className='px-4 py-2 text-left'>Term</th>
              <th className='px-4 py-2 text-left'>Session</th>
              <th className='px-4 py-2 text-left'>Average</th>
              <th className='px-4 py-2 text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((r) => (
              <tr
                key={r.studentId}
                className='border-t border-gray-200 dark:border-gray-800'
              >
                <td className='px-4 py-2'>{r.studentId}</td>
                <td className='px-4 py-2'>{r.name}</td>
                <td className='px-4 py-2'>{r.class}</td>
                <td className='px-4 py-2'>{r.term}</td>
                <td className='px-4 py-2'>{r.session}</td>
                <td className='px-4 py-2'>{r.average}</td>
                <td className='px-4 py-2'>
                  <span
                    className={
                      r.status === 'Passed' ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsResultsPage;
