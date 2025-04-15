'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetStaff } from '@/api/staff';
import type { Staff } from '@/api';
import { StaffForm } from './staff-form';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Eye } from 'lucide-react';
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
  const router = useRouter();
  const { data: staffList, isLoading } = useGetStaff();
  const toast = useCustomToast();
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsOpen(true);
  };

  const handleViewDetails = (staff: Staff) => {
    router.push(`/staff/detail/${staff.id}`);
  };

  const handleSuccess = () => {
    setIsOpen(false);
    setSelectedStaff(null);
  };

  if (isLoading) {
    return <div>Loading staff records...</div>;
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-end'>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className='bg-green-600 hover:bg-green-700'
              onClick={() => {
                setSelectedStaff(null);
                setIsOpen(true);
              }}
            >
              <Plus className='mr-2 h-4 w-4' />
              New Staff
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>
                {selectedStaff ? 'Edit Staff' : 'New Staff'}
              </DialogTitle>
            </DialogHeader>
            <div className='max-h-[70vh] overflow-y-auto p-1 pr-2'>
              <StaffForm
                initialData={selectedStaff || undefined}
                onSuccess={handleSuccess}
              />
            </div>
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
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffList && staffList.length > 0 ? (
            staffList.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{`${staff.firstName} ${staff.lastName}`}</TableCell>
                <TableCell>
                  {staff.dateOfBirth
                    ? new Date(staff.dateOfBirth).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell>{staff.roleId}</TableCell>
                <TableCell>{staff.specialization}</TableCell>
                <TableCell>{staff.statusId}</TableCell>
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button
                      size='icon'
                      onClick={() => handleViewDetails(staff)}
                      className='bg-cyan-600 hover:bg-cyan-700'
                    >
                      <Eye className='h-4 w-4 text-white' />
                    </Button>
                    <Button
                      size='icon'
                      onClick={() => handleEdit(staff)}
                      className='bg-blue-600 hover:bg-blue-700'
                    >
                      <Pencil className='h-4 w-4 text-white' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className='h-24 text-center'>
                No staff records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
