'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGetPatient } from '@/api';
import { useGetDoctors } from '@/api/staff';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Phone, MapPin, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { AddMedicalRecordForm } from '@/components/patient/add-medical-record-form';

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.uuid as string;

  const { data, isLoading: isLoadingPatient } = useGetPatient(patientId);
  const { data: doctors, isLoading: isLoadingDoctors } = useGetDoctors();
  const toast = useCustomToast();
  const [isOpen, setIsOpen] = useState(false);

  const patient = data?.patient;
  const medicalHistory = patient?.medicalHistory || [];

  if (isLoadingPatient || isLoadingDoctors) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    router.push('/patients/list');
    return null;
  }

  return (
    <div className='space-y-6'>
      <div className='mb-8 flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.push('/patients/list')}
        >
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <div>
          <h1 className='text-3xl font-bold'>Patient Details</h1>
          <p className='text-muted-foreground'>
            View and manage patient information
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {patient.firstName} {patient.lastName}
          </CardTitle>
          <CardDescription>Patient ID: {patient.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Calendar className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Date of Birth</p>
                  <p className='text-muted-foreground text-sm'>
                    {new Date(patient.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <User className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Gender</p>
                  <p className='text-muted-foreground text-sm'>
                    {patient.gender}
                  </p>
                </div>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Phone className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Phone Number</p>
                  <p className='text-muted-foreground text-sm'>
                    {patient.phoneNumber}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Address</p>
                  <p className='text-muted-foreground text-sm'>
                    {patient.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='mt-8'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-semibold'>Medical Records</h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>Add Medical Record</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Medical Record</DialogTitle>
              </DialogHeader>
              <AddMedicalRecordForm
                patientId={patientId}
                onSuccess={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className='grid gap-4'>
          {medicalHistory.length === 0 ? (
            <Card>
              <CardContent className='py-6 text-center'>
                <p className='text-muted-foreground'>
                  No medical records found for this patient
                </p>
              </CardContent>
            </Card>
          ) : (
            medicalHistory.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <CardTitle>
                    {new Date(record.date).toLocaleDateString()} -{' '}
                    {record.diagnosis}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div>
                    <strong>Treatment:</strong> {record.treatment}
                  </div>
                  <div>
                    <strong>Notes:</strong> {record.notes}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
