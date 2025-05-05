'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/src/features/auth/usersApiSlice';
import { setCredentials } from '@/src/features/auth/authSlice';
import { useRouter } from 'next/navigation';

const CrendentialsSignInForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const [login, { isLoading }] = useLoginMutation();

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));

      toast.success(`Welcome ${res.firstName} ${res.lastName}`);
      if (res.isAdmin) {
        router.push('/dashboard');
      } else {
        router.push('/results');
      }
    } catch (err) {
      toast.error(`${err.data.message}`);
    }
  };

  const SignInButton = () => {
    // const { pending } = useFormStatus();
    return (
      <Button disabled={isLoading} className='w-full' variant='default'>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-6'>
        <div>
          <div>
            <Label htmlFor='email' className='my-2'>
              Email
            </Label>
            <Input
              id='email'
              name='email'
              type='email'
              required
              autoComplete='email'
              onChange={handleInputChange}
            ></Input>
          </div>

          <div className='mb-6 w-full relative'>
            <Label htmlFor='password' className='my-3'>
              Password
            </Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              required
              autoComplete='password'
              onChange={handleInputChange}
            ></Input>
            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-4 top-10 cursor-pointer text-gray-600'
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>
        <div>
          <SignInButton />
        </div>

        <div className='text-center text-sm text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up' target='_self' className='link'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CrendentialsSignInForm;
