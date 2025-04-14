'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePatientStore } from '@/stores';
import { useGetPatient, useGetPatientById } from '@/api';
import {
  useGetMedicalHistory,
  useCreateMedicalRecord,
} from '@/api/medical-records';
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { formatToTimestampz } from '@/lib/utils';

const formSchema = z.object({
  date: z.string(),
  diagnosis: z.string().min(1, 'Diagnosis is required'),
  notes: z.string().min(1, 'Notes are required'),
  staffId: z.string().min(1, 'Doctor is required'),
  treatment: z.string().min(1, 'Treatment is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function PatientDetailPage({
  params,
}: {
  params: { uuid: string };
}) {
  const router = useRouter();
  const selectedPatientId = usePatientStore((state) => state.selectedPatientId);
  const { data: patient, isLoading: isLoadingPatient } = useGetPatient(
    selectedPatientId || '',
  );
  const { data: medicalHistory, isLoading: isLoadingHistory } =
    useGetMedicalHistory(selectedPatientId || '');
  const { data: doctors, isLoading: isLoadingDoctors } = useGetDoctors();
  const createMedicalRecord = useCreateMedicalRecord(selectedPatientId || '');
  const toast = useCustomToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      diagnosis: '',
      notes: '',
      staffId: '',
      treatment: '',
    },
  });

  const { data, isLoading } = useGetPatientById(params.uuid);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Safely access the patient data from the response
  const patientData = data?.patient;

  if (!patientData) {
    return <div>Patient not found</div>;
  }

  const onSubmit = (data: FormValues) => {
    createMedicalRecord.mutate(
      {
        ...data,
        date: formatToTimestampz(data.date),
      },
      {
        onSuccess: () => {
          toast.success('Success', 'Medical record created successfully');
          setIsOpen(false);
          form.reset();
        },
        onError: (error) => {
          toast.error(
            'Error',
            error.message || 'Failed to create medical record',
          );
        },
      },
    );
  };

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
            {patientData.firstName} {patientData.lastName}
          </CardTitle>
          <CardDescription>Patient ID: {patientData.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Calendar className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Date of Birth</p>
                  <p className='text-muted-foreground text-sm'>
                    {new Date(
                      patientData.dateOfBirth || '',
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <User className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Gender</p>
                  <p className='text-muted-foreground text-sm'>
                    {patientData.gender}
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
                    {patientData.phoneNumber}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Address</p>
                  <p className='text-muted-foreground text-sm'>
                    {patientData.address}
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={form.control}
                    name='date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='staffId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select doctor' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {doctors?.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                {`Dr. ${doctor.firstName} ${doctor.lastName}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='diagnosis'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosis</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter diagnosis' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='treatment'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Treatment</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter treatment' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='notes'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder='Enter notes' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type='submit' className='w-full'>
                    Create Record
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className='grid gap-4'>
          {medicalHistory?.length === 0 ? (
            <Card>
              <CardContent className='py-6 text-center'>
                <p className='text-muted-foreground'>
                  No medical records found for this patient
                </p>
              </CardContent>
            </Card>
          ) : (
            medicalHistory?.map((record) => (
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
