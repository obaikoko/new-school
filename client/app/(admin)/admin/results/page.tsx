'use client';
import {
  useGetResultsDataQuery,
  useGetResultsQuery,
} from '@/src/features/results/resultApiSlice';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ResultList from '@/components/shared/results/results-list';
import Spinner from '@/components/shared/spinner';
import Pagination from '@/components/shared/pagination';
import { useState } from 'react';
import DownloadResults from '@/components/shared/results/download-results-button';

const AdminResultsPage = () => {
  const [page, setPage] = useState<number>(1);

  const { data: resultsData, isLoading, isError } = useGetResultsDataQuery({});
  const {
    data: results,
    isLoading: loadingResults,
    isError: resultsError,
  } = useGetResultsQuery(page);
  const totalPages = results?.totalPages ?? 1;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Spinner /> Loading...
        </CardHeader>
      </Card>
    );
  }

  if (isError || !results) {
    return (
      <Card>
        <CardHeader>Error fetching data</CardHeader>
      </Card>
    );
  }

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
          <CardContent className='text-3xl font-bold'>
            {resultsData.totalResults}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published</CardTitle>
            <CardDescription>Visible to students</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-green-600'>
            {resultsData.publishedResults}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unpublished</CardTitle>
            <CardDescription>Pending publication</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-red-600'>
            {resultsData.unpublishedResults}
          </CardContent>
        </Card>
      </div>

      <DownloadResults />

      {/* Table */}
      <ResultList
        results={results.results}
        loading={loadingResults}
        error={resultsError}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default AdminResultsPage;
