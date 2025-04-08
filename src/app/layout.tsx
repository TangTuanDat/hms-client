'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { RootLayoutContent } from '@/components/root-layout';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <title>Hospital Management System</title>
      </head>
      <body className={inter.className}>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
