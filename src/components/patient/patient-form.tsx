'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreatePatient, useUpdatePatient } from '@/api';
import { useCustomToast } from '@/hooks/use-custom-toast';
import type { Patient } from '@/api';
import { formatToTimestampz } from '@/lib/utils';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string(),
  gender: z.string(),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

type FormValues = z.infer<typeof formSchema>;

interface PatientFormProps {
  initialData?: Patient;
  onSuccess?: () => void;
  submitButtonColor?: 'blue' | 'green';
}

export function PatientForm({
  initialData,
  onSuccess,
  submitButtonColor = 'green',
}: PatientFormProps) {
  const toast = useCustomToast();
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient(initialData?.id || '');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      dateOfBirth: initialData?.dateOfBirth
        ? new Date(initialData.dateOfBirth).toISOString().split('T')[0]
        : '',
      gender: initialData?.gender || 'Male',
      phoneNumber: initialData?.phoneNumber || '',
      address: initialData?.address || '',
    },
  });

  const onSubmit = (data: FormValues) => {
    const formattedData = {
      ...data,
      dateOfBirth: formatToTimestampz(data.dateOfBirth),
    };

    if (initialData) {
      updatePatient.mutate(formattedData, {
        onSuccess: () => {
          toast.success('Success', 'Patient updated successfully');
          onSuccess?.();
        },
        onError: (error) => {
          toast.error('Error', error.message || 'Failed to update patient');
        },
      });
    } else {
      createPatient.mutate(formattedData, {
        onSuccess: () => {
          toast.success('Success', 'Patient created successfully');
          onSuccess?.();
        },
        onError: (error) => {
          toast.error('Error', error.message || 'Failed to create patient');
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter first name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter last name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='dateOfBirth'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type='date'
                  {...field}
                  value={field.value ? field.value.split('T')[0] : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select gender' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Male'>Male</SelectItem>
                  <SelectItem value='Female'>Female</SelectItem>
                  <SelectItem value='Other'>Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder='Enter phone number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder='Enter address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className={`w-full ${submitButtonColor === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {initialData ? 'Update Patient' : 'Create Patient'}
        </Button>
      </form>
    </Form>
  );
}
