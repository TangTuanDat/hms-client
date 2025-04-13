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
import { useCreatePatient, useUpdatePatient } from './query';
import { useToast } from '@/components/ui/use-toast';
import { Patient } from './query';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(0, 'Age must be a positive number'),
  gender: z.enum(['Male', 'Female', 'Other']),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  medicalHistory: z.string().optional(),
  status: z.enum(['Active', 'Inactive']),
});

type FormValues = z.infer<typeof formSchema>;

interface PatientFormProps {
  initialData?: Patient;
  onSuccess?: () => void;
}

export function PatientForm({ initialData, onSuccess }: PatientFormProps) {
  const { toast } = useToast();
  const { mutate: createPatient } = useCreatePatient();
  const { mutate: updatePatient } = useUpdatePatient(initialData?.id || '');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      age: initialData?.age || 0,
      gender: initialData?.gender || 'Male',
      phoneNumber: initialData?.phoneNumber || '',
      address: initialData?.address || '',
      medicalHistory: initialData?.medicalHistory || '',
      status: initialData?.status || 'Active',
    },
  });

  const onSubmit = (data: FormValues) => {
    if (initialData) {
      updatePatient(data, {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Patient updated successfully',
          });
          onSuccess?.();
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Failed to update patient',
            variant: 'destructive',
          });
        },
      });
    } else {
      createPatient(data, {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Patient created successfully',
          });
          onSuccess?.();
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Failed to create patient',
            variant: 'destructive',
          });
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter patient name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='age'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Enter patient age'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
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

        <FormField
          control={form.control}
          name='medicalHistory'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical History</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter medical history'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Active'>Active</SelectItem>
                  <SelectItem value='Inactive'>Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          {initialData ? 'Update Patient' : 'Create Patient'}
        </Button>
      </form>
    </Form>
  );
}
