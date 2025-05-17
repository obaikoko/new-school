'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useRegisterMutation } from '@/src/features/auth/usersApiSlice';
import { toast } from 'sonner';

const RegisterUsersForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [register, { isLoading }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;

    try {
      const res = await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      if (res) {
        toast.success(res.message);
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    } catch (err) {
      if (err?.data?.errors && typeof err.data.errors === 'object') {
        Object.entries(err.data.errors).forEach(([field, message]) => {
          toast.error(`${field}: ${message}`);
        });
      } else {
        toast.error(err?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='firstName'>First Name</Label>
          <Input
            id='firstName'
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder='John'
          />
        </div>
        <div>
          <Label htmlFor='lastName'>Last Name</Label>
          <Input
            id='lastName'
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder='Doe'
          />
        </div>
        <div className='md:col-span-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder='user@example.com'
          />
        </div>
        <div className='md:col-span-2 relative'>
          <Label htmlFor='password'>Password</Label>
          <Input
            type={showPassword ? 'text' : 'password'}
            id='password'
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder='********'
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-4 top-[38px] text-gray-600 cursor-pointer'
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Register User'}
      </Button>
    </form>
  );
};

export default RegisterUsersForm;
