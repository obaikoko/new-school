'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen flex items-center justify-center bg-muted px-4'>
      <div className='bg-white shadow-lg rounded-xl p-8 text-center space-y-6 max-w-md w-full'>
        <div className='flex justify-center'>
          <AlertTriangle className='w-12 h-12 text-yellow-500' />
        </div>
        <h1 className='text-2xl font-bold text-foreground'>Access Denied</h1>
        <p className='text-sm text-muted-foreground'>
          You do not have permission to view this page.
        </p>
        <Button onClick={() => router.back()} className='hover:cursor-pointer'>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
