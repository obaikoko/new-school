'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, School, BookOpenCheck, CreditCard } from 'lucide-react';

const DashboardPage = () => {
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
            <CardTitle className='text-sm font-medium'>Students</CardTitle>
            <Users className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,200</div>
            <p className='text-xs text-muted-foreground'>+30 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Teachers</CardTitle>
            <School className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>85</div>
            <p className='text-xs text-muted-foreground'>+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Classes</CardTitle>
            <BookOpenCheck className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>36</div>
            <p className='text-xs text-muted-foreground'>Organized by grade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Fees Collected
            </CardTitle>
            <CreditCard className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>₦5,400,000</div>
            <p className='text-xs text-muted-foreground'>This term</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent enrollments table */}
      <div className='mt-6'>
        <h2 className='text-lg font-semibold mb-2'>Recent Enrollments</h2>
        <div className='overflow-x-auto rounded-md border'>
          <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-800'>
            <thead className='bg-gray-100 dark:bg-gray-800'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                  Student
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                  Grade
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                  Date
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-800 dark:bg-gray-900'>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap'>Blessing Okafor</td>
                <td className='px-6 py-4 whitespace-nowrap'>JSS 2</td>
                <td className='px-6 py-4 whitespace-nowrap text-green-600'>
                  Active
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>2025-05-01</td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap'>Samuel Adeniyi</td>
                <td className='px-6 py-4 whitespace-nowrap'>SSS 1</td>
                <td className='px-6 py-4 whitespace-nowrap text-green-600'>
                  Active
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>2025-04-29</td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap'>Chisom Eze</td>
                <td className='px-6 py-4 whitespace-nowrap'>JSS 3</td>
                <td className='px-6 py-4 whitespace-nowrap text-yellow-600'>
                  Pending
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>2025-04-28</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
