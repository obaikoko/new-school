'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetResultsForStudentQuery } from '@/src/features/results/resultApiSlice';
import Spinner from '../spinner';
import Link from 'next/link';
import GenerateResultButton from '../results/generate-result-button';
import { useAppSelector } from '@/src/app/hooks';
// import { User } from '@/schemas/userSchema';

const StudentResults = ({ studentId }: { studentId: string }) => {
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: results,
    isLoading,
    isError,
  } = useGetResultsForStudentQuery(studentId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className='flex items-center gap-2'>
          <Spinner />
          <CardDescription>Loading...</CardDescription>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent>
          <CardDescription>Unable to fetch results...</CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>Click to view term results</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Generate Button aligned to left */}
        <div className='mb-4'>
          <GenerateResultButton studentId={studentId} />
        </div>

        {/* Result list */}
        <div className='flex flex-wrap gap-3'>
          {results &&
            results.map((result, index) => (
              <Link
                href={
                  user.isAdmin
                    ? `/admin/results/${result.id}`
                    : `/user/results/${result.id}`
                }
                key={index}
                className='w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-3 border rounded-lg hover:bg-muted transition text-sm'
              >
                <p className='font-medium'>{result.level}</p>
                <p className='font-medium'>{result.term}</p>
                <p className='text-xs text-muted-foreground'>
                  {result.session}
                </p>
              </Link>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentResults;
