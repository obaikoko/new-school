'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import Spinner from '@/components/shared/spinner';
import ResetPasswordForm from './reset-password-form';
import { useSearchParams } from 'next/navigation';



const ResetPasswordFormWrapper = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className='text-center text-red-500 p-10'>
        <Card>
          <CardContent>Invalid or expired reset link</CardContent>
        </Card>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
};

const ResetPasswordPage = () => {
  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href='/' className='flex justify-center'>
            <Image
              src='/images/logo.jpg'
              width={100}
              height={100}
              alt='new school'
              priority={true}
            />
          </Link>
          <CardTitle className='text-center'>Forgot Password</CardTitle>
          <CardDescription className='text-center'>
            Enter your new password
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Suspense fallback={<Spinner />}>
            <ResetPasswordFormWrapper />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;

