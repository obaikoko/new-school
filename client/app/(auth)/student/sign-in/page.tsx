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
import StudentCredentialsSignInForm from './student-credentials-signin-form';

const StudentSignInPage = () => {
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
          <CardTitle className='text-center'>Sign In</CardTitle>
          <CardDescription className='text-center'>
            Sign in to your student account
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <StudentCredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentSignInPage;
