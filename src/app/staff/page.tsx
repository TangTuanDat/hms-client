'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetStaff, useCreateStaff, useDeleteStaff } from '@/api/staff';
import { CreateStaffRequest } from '@/api/types';
import { useToast } from '@/components/ui/use-toast';
import { StaffList } from '@/components/staff/staff-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export default function StaffPage() {
  const router = useRouter();
  const { data: staff, isLoading } = useGetStaff();
  const createStaff = useCreateStaff();
  const deleteStaff = useDeleteStaff();
  const { toast } = useToast();

  useEffect(() => {
    router.push('/staff/list');
  }, [router]);

  const handleCreateStaff = async (data: CreateStaffRequest) => {
    try {
      await createStaff.mutateAsync(data);
      toast({
        title: 'Success',
        description: 'Staff member created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create staff member',
        variant: 'destructive',
      });
    }
  };

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
