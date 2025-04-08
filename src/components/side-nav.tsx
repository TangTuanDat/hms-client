'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Users,
  UserCog,
  ClipboardList,
  FileText,
  LayoutDashboard,
} from 'lucide-react';

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Staff Management',
    href: '/staff',
    icon: UserCog,
    subItems: [
      {
        title: 'Staff List',
        href: '/staff/list',
      },
      {
        title: 'Scheduling',
        href: '/staff/schedule',
      },
    ],
  },
  {
    title: 'Patient Management',
    href: '/patients',
    icon: Users,
    subItems: [
      {
        title: 'Patient List',
        href: '/patients/list',
      },
      {
        title: 'Medical Records',
        href: '/patients/records',
      },
    ],
  },
  {
    title: 'Appointments',
    href: '/appointments',
    icon: Calendar,
    subItems: [
      {
        title: 'View All',
        href: '/appointments/list',
      },
      {
        title: 'Schedule New',
        href: '/appointments/new',
      },
    ],
  },
  {
    title: 'Billing',
    href: '/billing',
    icon: FileText,
  },
  {
    title: 'Tasks',
    href: '/tasks',
    icon: ClipboardList,
  },
];

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SideNav({ className, ...props }: SideNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn('h-screen overflow-y-auto pb-12', className)} {...props}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='space-y-1'>
            {sidebarNavItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-600',
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-sidebar-foreground',
                  )}
                >
                  <item.icon className='mr-2 h-4 w-4 flex-shrink-0' />
                  <span>{item.title}</span>
                </Link>
                {item.subItems && (
                  <div className='ml-6 mt-1 space-y-1'>
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          'block whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-600',
                          pathname === subItem.href
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-sidebar-foreground/80',
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
