'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/src/features/auth/usersApiSlice';
import { setCredentials } from '@/src/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import {
  authResponseSchema,
  authUserSchema,
} from '@/validators/userValidators';
import { showZodErrors } from '@/lib/utils';
import { AuthUserForm } from '@/schemas/userSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
const CrendentialsSignInForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUserForm>({
    resolver: zodResolver(authUserSchema),
  });

  const onSubmit = async (data: AuthUserForm) => {
    try {
      const result = authResponseSchema.safeParse(await login(data).unwrap());

      if (!result.success) {
        toast.error('Invalid response from server');
        console.error(result.error);
        return;
      }

      const res = result.data;
      dispatch(setCredentials(res));

      toast.success(`Welcome ${res.firstName} ${res.lastName}`);
      router.push(res.isAdmin ? '/admin/dashboard' : '/users/dashboard');
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

          <div className='mb-6 w-full relative mt-4'>
            <Label htmlFor='password' className='my-3'>
              Password
            </Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              placeholder='*********'
              {...register('password')}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-4 top-10 cursor-pointer text-gray-600'
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <Button disabled={isLoading} className='w-full' variant='default'>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        <div className='text-center text-sm text-muted-foreground'>
          Are you a student?{' '}
          <Link href='/student/sign-in' className='link'>
            Signin to your student account
          </Link>
        </div>
        <div className='text-center text-sm text-muted-foreground'>
          <Link href='/forget-password' className='link'>
            Forgot Password?{' '}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CrendentialsSignInForm;
