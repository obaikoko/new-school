'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center min-h-screen bg-muted px-4'>
      <Card className='max-w-md w-full shadow-xl rounded-2xl border-0'>
        <CardContent className='text-center py-12 px-6 space-y-6'>
          <div className='flex justify-center'>
            <AlertTriangle className='h-12 w-12 text-yellow-500' />
          </div>
          <h1 className='text-2xl font-bold text-foreground'>Page Not Found</h1>
          <p className='text-sm text-muted-foreground'>
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <Button
            onClick={() => router.back()}
            className='hover:cursor-pointer'
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
