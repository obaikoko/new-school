'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { useForgetStudentPasswordMutation } from '@/src/features/students/studentApiSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgetPasswordSchema } from '@/validators/studentValidation';
import { showZodErrors } from '@/lib/utils';
import { ForgetPassword } from '@/schemas/studentSchema';

const ForgetStudentPasswordForm = () => {
  const [forgetPassword, { isLoading }] = useForgetStudentPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPassword>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: ForgetPassword) => {
    try {
      const res = await forgetPassword(data).unwrap();

      toast.success(res);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-6'>
        <div>
          <Label htmlFor='studentId' className='my-2'>
            StudentID
          </Label>
          <Input
            id='studentId'
            type='text'
            autoComplete='studentId'
            placeholder='BDIS/2025/S3/001'
            {...register('studentId')}
          />
          {errors.studentId && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.studentId.message}
            </p>
          )}
        </div>

        <Button disabled={isLoading} className='w-full' variant='default'>
          {isLoading ? 'Sending link...' : 'Send Reset Link'}
        </Button>

        <div className='text-center text-sm text-muted-foreground'>
          Are you a student?{' '}
          <Link href='/student/sign-in' className='link'>
            Sign in to your student account
          </Link>
        </div>
        <div className='text-center text-sm text-muted-foreground'>
          <Link href='/sign-in' className='link'>
            Back to Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ForgetStudentPasswordForm;
