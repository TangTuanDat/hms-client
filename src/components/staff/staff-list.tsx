'use client';

import { useState } from 'react';
import { useGetStaff, useDeleteStaff } from '@/api';
import type { Staff } from '@/api';
import { StaffForm } from './staff-form';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCustomToast } from '@/hooks/use-custom-toast';

export function StaffList() {
  const { data: staffList, isLoading } = useGetStaff();
  const deleteStaff = useDeleteStaff();
  const toast = useCustomToast();
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id: string) => {
    deleteStaff.mutate(id, {
      onSuccess: () => {
        toast.success('Success', 'Staff member deleted successfully');
      },
      onError: () => {
        toast.error('Error', 'Failed to delete staff member');
      },
    });
  };

  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsOpen(true);
  };

  const handleSuccess = () => {
    setIsOpen(false);
    setSelectedStaff(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-end'>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              New Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedStaff ? 'Edit Staff' : 'New Staff'}
              </DialogTitle>
            </DialogHeader>
            <StaffForm initialData={selectedStaff} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffList?.map((staff) => (
            <TableRow key={staff.id}>
              <TableCell>{`${staff.firstName} ${staff.lastName}`}</TableCell>
              <TableCell>
                {staff.dateOfBirth
                  ? new Date(staff.dateOfBirth).toLocaleDateString()
                  : 'N/A'}
              </TableCell>
              <TableCell>{staff.roleId}</TableCell>
              <TableCell>{staff.specialization}</TableCell>
              <TableCell>
                <div className='flex space-x-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleEdit(staff)}
                  >
                    <Pencil className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleDelete(staff.id)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
