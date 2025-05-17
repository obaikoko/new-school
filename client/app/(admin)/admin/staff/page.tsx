'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Users, UserPlus, UserCheck } from 'lucide-react';

const StaffPage = () => {
  return (
    <div className='space-y-6 p-4'>
      <h1 className='text-2xl font-semibold'>Staff Overview</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-base'>
              <Users className='h-5 w-5 text-primary' />
              Total Staff
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl font-bold'>35</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-base'>
              <UserPlus className='h-5 w-5 text-primary' />
              New Hires (This Term)
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl font-bold'>4</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-base'>
              <UserCheck className='h-5 w-5 text-primary' />
              Active Staff
            </CardTitle>
          </CardHeader>
          <CardContent className='text-3xl font-bold'>31</CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className='flex flex-col md:flex-row gap-4 items-center'>
        <Input
          placeholder='Search staff by name...'
          className='w-full md:w-1/2'
        />
        <Select>
          <SelectTrigger className='w-full md:w-1/3'>
            <SelectValue placeholder='Filter by department' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='teaching'>Teaching</SelectItem>
            <SelectItem value='non-teaching'>Non-Teaching</SelectItem>
            <SelectItem value='admin'>Admin</SelectItem>
          </SelectContent>
        </Select>
        <Button>Search</Button>
      </div>

      {/* Recent Staff Table Placeholder */}
      <div className='mt-6'>
        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Recent Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-muted-foreground text-sm'>
              Table coming soon...
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffPage;
