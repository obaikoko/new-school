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

const StudentResults = ({ studentId }: { studentId: string }) => {
  const {
    data: results,
    isLoading,
    isError,
  } = useGetResultsForStudentQuery(studentId);
  if (isLoading) {
    return (
      <Card>
        <Spinner /> <CardDescription>Loading...</CardDescription>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardDescription>Unable to fetch results...</CardDescription>
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
        <div className='flex flex-wrap gap-3'>
          {results &&
            results.map((result, index) => (
              <Link
                href={`/admin/results/${result.id}`}
                key={index}
                className='w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-3 border rounded-lg hover:bg-muted transition text-sm'
              >
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
