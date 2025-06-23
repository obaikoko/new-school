'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Spinner from '../spinner';
import { useGetResultQuery } from '@/src/features/results/resultApiSlice';
import ResultTable from './result-table';
import { BookOpen } from 'lucide-react';
import ResultHeader from './result-header';
import DeleteResultButton from './delete-result-button';
import UpdateSubjectScore from './update-subject-score';
import UpdateAffectiveAssessment from './update-affective-assessment';
import AffectiveAssessment from './affective-assessment';
import Psychomotor from './psychomotor';
import UpdatePsychomotor from './update-psychomotor';
import NextTermDetails from './next-term-details';
import DownloadResult from './download-result-button';

const ResultDetails = ({ resultId }: { resultId: string }) => {
  const { data: result, isLoading, isError } = useGetResultQuery(resultId);

  if (isLoading) {
    return (
      <Card className='p-6'>
        <CardDescription className='flex items-center gap-2'>
          <Spinner /> Loading...
        </CardDescription>
      </Card>
    );
  }

  if (isError || !result) {
    return (
      <Card className='p-6'>
        <CardDescription>Error fetching result</CardDescription>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Page Title */}
      <div className='flex items-center gap-2'>
        <BookOpen className='text-purple-600' />
        <h2 className='text-2xl font-semibold'>Student Results</h2>
      </div>

      {/* Header Info */}
      <Card>
        <CardHeader>
          <CardTitle>Student Info</CardTitle>
        </CardHeader>
        <CardContent>
          <ResultHeader result={result} />
        </CardContent>
      </Card>

      {/* Subject Scores Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subjects & Scores</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col lg:flex-row gap-6'>
          {/* Left: Result Table (2/3 width) */}
          <div className='lg:w-2/3 w-full'>
            <ResultTable results={result.subjectResults} />
            <NextTermDetails
              session={result.session}
              term={result.term}
              level={result.level}
            />
          </div>

          {/* Right: Assessments (1/3 width) */}
          <div className='lg:w-1/3 w-full flex flex-col gap-4'>
            <AffectiveAssessment data={result.affectiveAssessment} />
            <Psychomotor data={result.psychomotor} />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
          <UpdateAffectiveAssessment resultId={resultId} />
          <UpdatePsychomotor resultId={resultId} />
        </CardContent>
        <CardContent className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
          <DownloadResult resultId={resultId} />

          <UpdateSubjectScore resultId={resultId} />
          <DeleteResultButton
            resultId={resultId}
            studentId={result.studentId}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultDetails;
