'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { useForgetPasswordMutation } from '@/src/features/auth/usersApiSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgetPasswordSchema } from '@/validators/userValidators';
import { showZodErrors } from '@/lib/utils';
import { ForgetPasswordForm as ForgetPaswordFormType } from '@/schemas/userSchema';

const ForgetPasswordForm = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPaswordFormType>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: ForgetPaswordFormType) => {
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
          <Label htmlFor='email' className='my-2'>
            Email
          </Label>
          <Input
            id='email'
            type='email'
            autoComplete='email'
            placeholder='john@gmail.com'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
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

export default ForgetPasswordForm;
