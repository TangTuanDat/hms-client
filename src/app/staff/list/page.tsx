'use client';

import { StaffList } from '@/components/staff/staff-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react'; // Using Briefcase icon for staff management

export default function StaffListPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Briefcase className='text-primary h-8 w-8' />
          <div>
            <h1 className='text-3xl font-bold'>Staff Management</h1>
            <p className='text-muted-foreground'>
              Manage staff records and information
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Records</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffList />
        </CardContent>
      </Card>
    </div>
  );
}
