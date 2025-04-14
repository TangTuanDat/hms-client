'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  useGetMedicalHistory,
  useCreateMedicalRecord,
} from '@/api/medical-records';
import { useGetDoctors } from '@/api/staff';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { formatToTimestampz } from '@/lib/utils';

const formSchema = z.object({
  date: z.string(),
  diagnosis: z.string().min(1, 'Diagnosis is required'),
  notes: z.string().min(1, 'Notes are required'),
  staffId: z.string().min(1, 'Doctor is required'),
  treatment: z.string().min(1, 'Treatment is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function MedicalRecordsPage() {
  const params = useParams();
  const patientId = params.id as string;
  const { data: medicalHistory, isLoading } = useGetMedicalHistory(patientId);
  const { data: doctors, isLoading: isLoadingDoctors } = useGetDoctors();
  const createMedicalRecord = useCreateMedicalRecord(patientId);
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

  if (isLoading || isLoadingDoctors) {
    return <div>Loading...</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Medical Records</h1>
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
        {medicalHistory?.map((record) => (
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
        ))}
      </div>
    </div>
  );
}
