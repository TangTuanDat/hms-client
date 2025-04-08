export default function Loading() {
  return (
    <div className='flex h-[calc(100vh-4rem)] items-center justify-center'>
      <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent'></div>
    </div>
  );
}
