'use client';

import { useState } from 'react';
import { useGetStaff, useDeleteStaff } from './query.tsx';
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
import { useToast } from '@/components/ui/use-toast';

export function StaffList() {
  const { data: staffList, isLoading } = useGetStaff();
  const { mutate: deleteStaff } = useDeleteStaff();
  const { toast } = useToast();
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id: string) => {
    deleteStaff(id, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Staff member deleted successfully',
        });
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to delete staff member',
          variant: 'destructive',
        });
      },
    });
  };

  const handleEdit = (staff: any) => {
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
            <TableHead>Age</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffList?.map((staff: any) => (
            <TableRow key={staff.id}>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.age}</TableCell>
              <TableCell>{staff.phone}</TableCell>
              <TableCell>{staff.role}</TableCell>
              <TableCell>{staff.status}</TableCell>
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
