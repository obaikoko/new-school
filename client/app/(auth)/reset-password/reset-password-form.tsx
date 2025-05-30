'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/validators/userValidators';
import { ResetPasswordForm as ResetPasswordFormType } from '@/schemas/userSchema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { showZodErrors } from '@/lib/utils';
import { useResetPasswordMutation } from '@/src/features/auth/usersApiSlice';

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation({});

  const onSubmit = async (data: ResetPasswordFormType) => {
    try {
      const res = await resetPassword({
        password: data.password,
        token,
      }).unwrap();
      toast.success(res?.message || 'Password reset successful');
      router.push('/sign-in');
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 max-w-md mx-auto mt-10 p-6 rounded-xl border shadow'
    >
      <div>
        <Label htmlFor='password'>New Password</Label>
        <div className='relative'>
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter new password'
            {...register('password')}
          />
          <Button
            type='button'
            size='icon'
            variant='ghost'
            className='absolute right-2 top-1/2 -translate-y-1/2'
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff className='w-5 h-5' />
            ) : (
              <Eye className='w-5 h-5' />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className='text-sm text-red-500 mt-1'>{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor='confirmPassword'>Confirm Password</Label>
        <div className='relative'>
          <Input
            id='confirmPassword'
            type={showConfirm ? 'text' : 'password'}
            placeholder='Re-enter password'
            {...register('confirmPassword')}
          />
          <Button
            type='button'
            size='icon'
            variant='ghost'
            className='absolute right-2 top-1/2 -translate-y-1/2'
            onClick={() => setShowConfirm((prev) => !prev)}
          >
            {showConfirm ? (
              <EyeOff className='w-5 h-5' />
            ) : (
              <Eye className='w-5 h-5' />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className='text-sm text-red-500 mt-1'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
