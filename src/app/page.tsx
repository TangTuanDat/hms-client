'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { useStaffStore } from '@/store/staff-store';

export default function SignInPage() {
  const router = useRouter();
  const toast = useCustomToast();
  const setStaffId = useStaffStore((state) => state.setStaffId);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded admin credentials
    if (email === 'a@b.com' && password === 'ab123') {
      setStaffId('admin-uuid'); // Set a hardcoded staff ID for the admin
      toast.success('Success', 'Signed in successfully');
      router.push('/patients');
    } else {
      toast.error('Error', 'Invalid email or password');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight'>Welcome back</h2>
          <p className='mt-2 text-sm text-gray-600'>
            Sign in to your account to continue
          </p>
        </div>
        <form onSubmit={handleSignIn} className='mt-8 space-y-6'>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                required
              />
            </div>
            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                required
              />
            </div>
          </div>
          <Button
            type='submit'
            className='w-full bg-green-600 hover:bg-green-700'
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
