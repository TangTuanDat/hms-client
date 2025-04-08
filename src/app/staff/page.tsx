'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/staff/list');
  }, [router]);

  return null;
}
