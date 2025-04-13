'use client';

import {
  useGetPatients,
  useCreatePatient,
  useDeletePatient,
} from '@/api/patient';
import { useToast } from '@/components/ui/use-toast';

export default function PatientsPage() {
  const { data: patients, isLoading } = useGetPatients();
  const createPatient = useCreatePatient();
  const deletePatient = useDeletePatient();
  const { toast } = useToast();

  const handleCreatePatient = async (data: CreatePatientRequest) => {
    try {
      await createPatient.mutateAsync(data);
      toast({
        title: 'Success',
        description: 'Patient created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create patient',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Patient Management</h1>
      <p>Patient management features coming soon...</p>
    </div>
  );
}
