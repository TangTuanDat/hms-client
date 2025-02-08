import {
  AdminSidebar,
  AdminSidebarProvider,
  AdminSidebarTrigger,
  IMenuItem,
} from '@/components/admin-sidebar';
import { IAdminNavbar, AdminNavbar } from '@/components/admin-navbar';

const menuItems: IMenuItem[] = [
  {
    title: 'Patient',
    url: '/admin/patients',
  },
  {
    title: 'Doctor',
    url: '/admin/doctors',
  },
  {
    title: 'Appointment',
    url: '/admin/appointments',
  },
  {
    title: 'Billing',
    url: '/admin/billing',
  },
];

const navItems: IAdminNavbar[] = [
  {
    title: 'Nav1',
  },
  {
    title: 'Nav2',
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSidebarProvider>
      <AdminSidebar items={menuItems} />
      <div className='flex h-screen w-full flex-col'>
        <header className='h-12 w-full'>
          <AdminNavbar
            items={navItems}
            sidebarTrigger={<AdminSidebarTrigger />}
          />
        </header>
        <main className='flex-grow'>{children}</main>
      </div>
    </AdminSidebarProvider>
  );
}
