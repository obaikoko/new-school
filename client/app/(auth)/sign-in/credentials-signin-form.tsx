'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';

const CrendentialsSignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Signing in...' : 'Sign In'}
      </Button>
    );
  };
  return (
    <form>
      <div className='space-y-6'>
        <div>
          <Input
            id='callbackUrl'
            name='callbackUrl'
            type='hidden'
            value={`${callbackUrl}` || '/'}
          ></Input>
          <Label htmlFor='email' className='my-2'>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
          ></Input>
          <Label htmlFor='password' className='my-3'>
            Password
          </Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
          ></Input>
        </div>
        <div>
          <SignInButton />
        </div>
        {/* {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )} */}
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
