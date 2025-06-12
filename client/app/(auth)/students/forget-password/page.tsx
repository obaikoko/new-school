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
import ForgetStudentPasswordForm from './forget-password-form';

const ForgetPasswordPage = () => {
  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href='/' className='flex-center'>
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
            Enter Student ID
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ForgetStudentPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPasswordPage;
