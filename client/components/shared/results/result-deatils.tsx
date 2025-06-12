'use client';

import { Card, CardDescription } from '@/components/ui/card';
import Spinner from '../spinner';
import { useGetResultQuery } from '@/src/features/results/resultApiSlice';
import ResultTable from './result-table';
import { BookOpen } from 'lucide-react';
import ResultHeader from './result-header';

const ResultDetails = ({ resultId }: { resultId: string }) => {
  const { data: result, isLoading, isError } = useGetResultQuery(resultId);
  if (isLoading) {
    return (
      <>
        <Card>
          <CardDescription>
            <Spinner /> Loading...
          </CardDescription>
        </Card>
      </>
    );
  }
  if (isError || !result) {
    return (
      <>
        <Card>
          <CardDescription>Error fetching result</CardDescription>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className='flex items-center mb-4'>
        <BookOpen className='mr-2 text-purple-600' />
        <h2 className='text-xl font-semibold'>Student Results</h2>
      </div>
      <ResultHeader result={result} />

      <ResultTable results={result.subjectResults} />
    </>
  );
};

export default ResultDetails;
