'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStaffStore } from '@/store/staff-store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const staffId = useStaffStore((state) => state.staffId);

  useEffect(() => {
    // If not signed in and not on the sign-in page, redirect to sign-in
    if (!staffId && pathname !== '/') {
      router.push('/');
    }
    // If signed in and on the sign-in page, redirect to patients
    else if (staffId && pathname === '/') {
      router.push('/patients');
    }
  }, [staffId, pathname, router]);

  return <>{children}</>;
}
