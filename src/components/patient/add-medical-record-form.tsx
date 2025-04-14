'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useGetDoctors } from '@/api/staff';
import { Button } from '@/components/ui/button';
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
import { useCustomToast } from '@/hooks/use-custom-toast';
import { api } from '@/api/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatToTimestampz } from '@/lib/utils';

const formSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  diagnosis: z.string().min(1, 'Diagnosis is required'),
  notes: z.string().min(1, 'Notes are required'),
  staffId: z.string().min(1, 'Doctor is required'),
  treatment: z.string().min(1, 'Treatment is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface AddMedicalRecordFormProps {
  patientId: string;
  onSuccess: () => void;
}

export function AddMedicalRecordForm({
  patientId,
  onSuccess,
}: AddMedicalRecordFormProps) {
  const { data: doctors, isLoading: isLoadingDoctors } = useGetDoctors();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].slice(0, 5), // Current time in HH:mm format
      diagnosis: '',
      notes: '',
      staffId: '',
      treatment: '',
    },
  });

  const createMedicalRecord = useMutation({
    mutationFn: async (data: FormValues) => {
      // Combine date and time into a timestampz
      const combinedDateTime = `${data.date}T${data.time}:00Z`;
      const payload = {
        date: formatToTimestampz(combinedDateTime),
        diagnosis: data.diagnosis,
        notes: data.notes,
        staffId: data.staffId,
        treatment: data.treatment,
      };

      await api.post(`/api/v1/patients/${patientId}/medical-records`, payload);
    },
    onSuccess: () => {
      toast.success('Success', 'Medical record created successfully');
      queryClient.invalidateQueries({ queryKey: ['patients', patientId] });
      form.reset();
      onSuccess();
    },
    onError: (error) => {
      toast.error('Error', 'Failed to create medical record');
    },
  });

  const onSubmit = (data: FormValues) => {
    createMedicalRecord.mutate(data);
  };

  if (isLoadingDoctors) {
    return <div>Loading doctors...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
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
            name='time'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type='time' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='staffId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doctor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <Button
          type='submit'
          className='w-full'
          disabled={createMedicalRecord.isPending}
        >
          {createMedicalRecord.isPending ? 'Creating...' : 'Create Record'}
        </Button>
      </form>
    </Form>
  );
}
