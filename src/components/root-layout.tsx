'use client';

import { useState } from 'react';
import { MainNav } from '@/components/main-nav';
import { SideNav } from '@/components/side-nav';

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className='bg-primary-gradient'>
        <div className='mx-auto max-w-7xl'>
          <div className='text-primary-foreground flex h-16 items-center px-4'>
            <MainNav onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
          </div>
        </div>
      </div>
      <div className='flex min-h-screen bg-background'>
        <aside
          className={`transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-0'
          } bg-sidebar-background overflow-hidden border-r`}
        >
          <SideNav />
        </aside>
        <main className='flex-1 p-8'>{children}</main>
      </div>
    </>
  );
}
