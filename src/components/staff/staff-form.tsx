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
import { useCreateStaff, useUpdateStaff } from '@/api';
import type { Staff } from '@/api';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { formatToTimestampz } from '@/lib/utils';

const staffFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string(),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  nurseType: z.string(),
  roleId: z.string(),
  specialization: z.string(),
  statusId: z.string(),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

interface StaffFormProps {
  initialData?: Staff;
  onSuccess?: () => void;
}

export function StaffForm({ initialData, onSuccess }: StaffFormProps) {
  const toast = useCustomToast();
  const createStaff = useCreateStaff();
  const updateStaff = useUpdateStaff(initialData?.id || '');

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      dateOfBirth: initialData?.dateOfBirth
        ? new Date(initialData.dateOfBirth).toISOString().split('T')[0]
        : '',
      address: initialData?.address || '',
      phoneNumber: initialData?.phoneNumber || '',
      nurseType: initialData?.nurseType || '',
      roleId: initialData?.roleId || 'Nurse',
      specialization: initialData?.specialization || '',
      statusId: initialData?.statusId || 'Active',
    },
  });

  const onSubmit = (data: StaffFormValues) => {
    // Format the date to timestamptz before sending to the API
    const formattedData = {
      ...data,
      dateOfBirth: formatToTimestampz(data.dateOfBirth),
    };

    if (initialData) {
      updateStaff.mutate(formattedData, {
        onSuccess: () => {
          toast.success('Success', 'Staff member updated successfully');
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(
            'Error',
            error.message || 'Failed to update staff member',
          );
        },
      });
    } else {
      createStaff.mutate(formattedData, {
        onSuccess: () => {
          toast.success('Success', 'Staff member created successfully');
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(
            'Error',
            error.message || 'Failed to create staff member',
          );
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
          name='nurseType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nurse Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select nurse type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='LPN'>LPN</SelectItem>
                  <SelectItem value='RN'>RN</SelectItem>
                  <SelectItem value='NP'>NP</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='roleId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select role' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Nurse'>Nurse</SelectItem>
                  <SelectItem value='Doctor'>Doctor</SelectItem>
                  <SelectItem value='Admin'>Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='specialization'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select specialization' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Pediatrics'>Pediatrics</SelectItem>
                  <SelectItem value='Surgery'>Surgery</SelectItem>
                  <SelectItem value='Emergency'>Emergency</SelectItem>
                  <SelectItem value='General'>General</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='statusId'
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

        <Button
          type='submit'
          className={`w-full ${initialData ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {initialData ? 'Update Staff' : 'Create Staff'}
        </Button>
      </form>
    </Form>
  );
}
