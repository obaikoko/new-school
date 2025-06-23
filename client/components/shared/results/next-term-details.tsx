'use client';

import { useGetNextTermInfoQuery } from '@/src/features/nextTerm/nextTermApiSlcie';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

const NextTermDetails = ({
  session,
  term,
  level,
}: {
  session: string;
  term: string;
  level: string;
}) => {
  const { data, isLoading, error } = useGetNextTermInfoQuery({
    session,
    term,
    level,
  });

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-8 w-[250px] bg-background' />
        <Skeleton className='h-24 w-full bg-background' />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Alert variant='destructive' className='bg-background text-foreground'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Unable to fetch next term details. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className='bg-background text-foreground max-w-2xl mx-auto mt-6'>
      <CardHeader>
        <CardTitle className='text-xl'>Next Term Details</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <p>
          <strong>Session:</strong> {data.session}
        </p>
        <p>
          <strong>Term:</strong> {data.term}
        </p>
        <p>
          <strong>Level:</strong> {data.level}
        </p>
        <p>
          <strong>Re-opening Date:</strong> {formatDateTime(data.reOpeningDate)}
        </p>
        <p>
          <strong>Next Term Fee:</strong> ₦{data.nextTermFee.toLocaleString()}
        </p>
        {data.busFee !== null && (
          <p>
            <strong>Bus Fee:</strong> ₦{data.busFee?.toLocaleString()}
          </p>
        )}
        {data.otherCharges !== null && (
          <p>
            <strong>Other Charges:</strong> ₦
            {data.otherCharges?.toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default NextTermDetails;
