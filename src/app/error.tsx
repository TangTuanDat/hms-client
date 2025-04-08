'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex h-[calc(100vh-4rem)] flex-col items-center justify-center'>
      <h2 className='text-4xl font-bold'>Something went wrong!</h2>
      <p className='text-muted-foreground mt-2 text-lg'>
        An error occurred while loading this page.
      </p>
      <button
        onClick={reset}
        className='bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-4 py-2 text-sm'
      >
        Try again
      </button>
    </div>
  );
}
