'use client';

import { Card, CardContent } from '@/components/ui/card';
import { StudentResult } from '@/schemas/resultSchema';
import {
  User,
  GraduationCap,
  CalendarDays,
  Star,
  Users,
  LineChart,
} from 'lucide-react';

const ResultHeader = ({ result }: { result: StudentResult }) => {
  

  return (
    <Card className='p-4 mb-6 shadow-md'>
      <CardContent className='grid md:grid-cols-4 gap-4 text-sm text-zinc-800 dark:text-zinc-100'>
        <div className='flex items-center gap-2'>
          <User className='w-4 h-4 text-purple-600' />
          <span>
            <strong>Name:</strong> {result.firstName} {result.lastName}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <GraduationCap className='w-4 h-4 text-purple-600' />
          <span>
            <strong>Level:</strong> {result.level}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <CalendarDays className='w-4 h-4 text-purple-600' />
          <span>
            <strong>Session:</strong> {result.session}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <CalendarDays className='w-4 h-4 text-purple-600' />
          <span>
            <strong>Term:</strong> {result.term}
          </span>
        </div>
      
        <div className='flex items-center gap-2'>
          <Star className='w-4 h-4 text-yellow-500' />
          <span>
            <strong>Position:</strong> {result.position}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <LineChart className='w-4 h-4 text-blue-600' />
          <span>
            <strong>Average:</strong> {result.averageScore.toString().slice(0, 5)}%
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='w-4 h-4 text-green-600' />
          <span>
            <strong>Class Size:</strong> {result.numberInClass}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultHeader;
