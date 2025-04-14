'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetPatients } from '@/api';
import type { Patient } from '@/api';
import { PatientForm } from './patient-form';
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

export function PatientList() {
  const router = useRouter();
  const { data: patients, isLoading } = useGetPatients();
  const toast = useCustomToast();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsOpen(true);
  };

  const handleViewDetails = (patient: Patient) => {
    router.push(`/patients/detail/${patient.id}`);
  };

  const handleSuccess = () => {
    setIsOpen(false);
    setSelectedPatient(null);
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
              New Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedPatient ? 'Edit Patient' : 'New Patient'}
              </DialogTitle>
            </DialogHeader>
            <PatientForm
              initialData={selectedPatient || undefined}
              onSuccess={handleSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients?.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{`${patient.firstName} ${patient.lastName}`}</TableCell>
              <TableCell>
                {new Date(patient.dateOfBirth).toLocaleDateString()}
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.phoneNumber}</TableCell>
              <TableCell>{patient.address}</TableCell>
              <TableCell>
                <div className='flex space-x-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleEdit(patient)}
                  >
                    <Pencil className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleViewDetails(patient)}
                  >
                    <Eye className='h-4 w-4' />
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
