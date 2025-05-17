'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const dummyStudents = [
  {
    id: 'STU001',
    name: 'Jane Doe',
    gender: 'Female',
    level: 'JSS 2',
    status: 'Active',
  },
  {
    id: 'STU002',
    name: 'John Smith',
    gender: 'Male',
    level: 'JSS 2',
    status: 'Active',
  },
  {
    id: 'STU003',
    name: 'Sarah Brown',
    gender: 'Female',
    level: 'JSS 2',
    status: 'Inactive',
  },
  {
    id: 'STU004',
    name: 'Ali Musa',
    gender: 'Male',
    level: 'JSS 2',
    status: 'Active',
  },
];

const StudentsList = () => {
  const [search, setSearch] = useState('');

  const filteredStudents = dummyStudents.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>My Students</h1>


      {/* Search */}
      <div className='max-w-sm'>
        <Input
          placeholder='Search by name...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Student Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl'>
          <thead className='bg-gray-100 dark:bg-gray-800'>
            <tr>
              <th className='px-4 py-2 text-left'>ID</th>
              <th className='px-4 py-2 text-left'>Name</th>
              <th className='px-4 py-2 text-left'>Gender</th>
              <th className='px-4 py-2 text-left'>Level</th>
              <th className='px-4 py-2 text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className='border-t border-gray-200 dark:border-gray-800'
              >
                <td className='px-4 py-2'>{student.id}</td>
                <td className='px-4 py-2'>{student.name}</td>
                <td className='px-4 py-2'>{student.gender}</td>
                <td className='px-4 py-2'>{student.level}</td>
                <td className='px-4 py-2'>
                  <span
                    className={`text-sm font-medium ${
                      student.status === 'Active'
                        ? 'text-green-600'
                        : 'text-yellow-500'
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination (Optional Stub) */}
        <div className='flex justify-end mt-4'>
          <Button variant='outline' size='sm'>
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
