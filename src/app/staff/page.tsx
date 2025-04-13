'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetStaff, useCreateStaff, useDeleteStaff } from '@/api/staff';
import { useToast } from '@/components/ui/use-toast';

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

  return null;
}
