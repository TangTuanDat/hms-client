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
import { useCreateStaff, useUpdateStaff } from './query';
import { useNotification } from '@/components/ui/notification';

const staffFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().min(18, 'Age must be at least 18'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  roleId: z.string().min(1, 'Please select a role'),
  status: z.enum(['Active', 'Inactive']),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

interface StaffFormProps {
  initialData?: {
    id: string;
    name: string;
    age: number;
    phoneNumber: string;
    role: {
      id: string;
      name: string;
    };
    status: 'Active' | 'Inactive';
  };
  onSuccess: () => void;
}

export function StaffForm({ initialData, onSuccess }: StaffFormProps) {
  const { success, error } = useNotification();
  const { mutate: createStaff } = useCreateStaff();
  const { mutate: updateStaff } = useUpdateStaff(initialData?.id || '');

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      age: initialData?.age || 18,
      phoneNumber: initialData?.phoneNumber || '',
      roleId: initialData?.role.id || '',
      status: initialData?.status || 'Active',
    },
  });

  const onSubmit = (data: StaffFormValues) => {
    if (initialData) {
      updateStaff(data, {
        onSuccess: () => {
          success({
            title: 'Success',
            description: 'Staff member updated successfully',
          });
          onSuccess();
        },
        onError: () => {
          error({
            title: 'Error',
            description: 'Failed to update staff member',
          });
        },
      });
    } else {
      createStaff(data, {
        onSuccess: () => {
          success({
            title: 'Success',
            description: 'Staff member created successfully',
          });
          onSuccess();
        },
        onError: () => {
          error({
            title: 'Error',
            description: 'Failed to create staff member',
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
                <Input placeholder='Enter name' {...field} />
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
                <Input type='number' placeholder='Enter age' {...field} />
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
          name='roleId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a role' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='1'>Doctor</SelectItem>
                  <SelectItem value='2'>Nurse</SelectItem>
                  <SelectItem value='3'>Administrator</SelectItem>
                </SelectContent>
              </Select>
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
          {initialData ? 'Update Staff' : 'Create Staff'}
        </Button>
      </form>
    </Form>
  );
}
