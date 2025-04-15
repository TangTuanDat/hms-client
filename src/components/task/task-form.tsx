'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetStaff, useCreateTask } from '@/api';
import { useCustomToast } from '@/hooks/use-custom-toast';

const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  staffId: z.string().min(1, 'Staff assignment is required'),
  priority: z.string().min(1, 'Priority is required'),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  initialData?: TaskFormValues;
  onSuccess: () => void;
}

export function TaskForm({ initialData, onSuccess }: TaskFormProps) {
  const { data: staffData } = useGetStaff();
  const createTask = useCreateTask();
  const toast = useCustomToast();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      startTime: new Date().toISOString().slice(0, 16),
      endTime: new Date(Date.now() + 30 * 60000).toISOString().slice(0, 16),
      staffId: '',
      priority: '',
    },
  });

  const formatToTimestamptz = (dateString: string) => {
    // Create a date object in local time
    const date = new Date(dateString);
    // Convert to UTC ISO string and ensure it has the 'Z' suffix
    return date.toISOString(); // This will output format: "2024-03-14T10:30:00.000Z"
  };

  const onSubmit = async (data: TaskFormValues) => {
    try {
      await createTask.mutateAsync({
        title: data.title,
        description: data.description,
        startTime: formatToTimestamptz(data.startTime),
        endTime: formatToTimestamptz(data.endTime),
        priority: parseInt(data.priority),
        statusId: 'Pending',
        staffId: data.staffId,
      });

      toast.success('Success', 'Task assigned successfully');
      onSuccess();
    } catch (error: any) {
      toast.error('Error', error.message || 'Failed to assign task');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='startTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type='datetime-local' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='endTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type='datetime-local' {...field} />
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
              <FormLabel>Assign To</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select staff member' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {staffData?.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id}>
                      {`${staff.firstName} ${staff.lastName}`}
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
          name='priority'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select priority' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((priority) => (
                    <SelectItem key={priority} value={priority.toString()}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full bg-green-600 hover:bg-green-700'
          disabled={createTask.isPending}
        >
          {createTask.isPending ? 'Assigning...' : 'Assign Task'}
        </Button>
      </form>
    </Form>
  );
}
