'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useRegisterMutation } from '@/src/features/auth/usersApiSlice';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUserResponse, registerUserSchema } from '@/validators/userValidators';
import { RegisterUserForm } from '@/schemas/userSchema';
import { showZodErrors } from '@/lib/utils';

const RegisterUsersForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserSchema),
  });

  const [registerUser, { isLoading }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterUserForm) => {
    try {
      const result = registerUserResponse.safeParse(
        await registerUser(data).unwrap()
      );

      if (!result.success) {
        toast.error('Invalid response from server');
        console.error(result.error);
        return;
      }

      const res = result.data;

      toast.success(`${res.firstName} registered successfully`);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='firstName'>First Name</Label>
          <Input
            id='firstName'
            type='text'
            autoComplete='firstName'
            placeholder='First Name'
            {...register('firstName')}
          />

          {errors.firstName && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor='lastName'>Last Name</Label>
          <Input
            id='lastName'
            type='text'
            autoComplete='lastName'
            placeholder='Last Name'
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className='md:col-span-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            autoComplete='email'
            placeholder='user@example.com'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
          )}
        </div>
        <div className='md:col-span-2 relative'>
          <Label htmlFor='password'>Password</Label>
          <Input
            type={showPassword ? 'text' : 'password'}
            id='password'
            autoComplete='current-password'
            placeholder='********'
            {...register('password')}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-4 top-[38px] text-gray-600 cursor-pointer'
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

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Register User'}
      </Button>
    </form>
  );
};

export default RegisterUsersForm;
