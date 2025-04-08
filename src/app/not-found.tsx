import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex h-[calc(100vh-4rem)] flex-col items-center justify-center'>
      <h2 className='text-4xl font-bold'>404</h2>
      <p className='text-muted-foreground mt-2 text-lg'>Page not found</p>
      <Link
        href='/'
        className='bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-4 py-2 text-sm'
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
