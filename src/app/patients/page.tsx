'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PatientsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/patients/list');
  }, [router]);

  return null; // No need to render anything since we're redirecting
}
