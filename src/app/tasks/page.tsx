'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useGetTasks, useCreateAndAssignTask, useGetStaff } from '@/api';
import type { Staff, CreateAndAssignTaskRequest } from '@/api';
import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { formatToTimestampz } from '@/lib/utils';

// Zod schema for the new task form
const taskFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  staffId: z.string().min(1, 'Please select a staff member'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  priority: z.coerce.number().int().min(1).max(5).optional(), // Example: 1-5 priority scale
  statusId: z.string().min(1, 'Please select a status'),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export default function TasksPage() {
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks();
  const { data: staffList, isLoading: isLoadingStaff } = useGetStaff();
  const createAndAssignMutation = useCreateAndAssignTask();
  const toast = useCustomToast();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      staffId: '',
      startTime: '',
      endTime: '',
      priority: 3, // Default priority
      statusId: 'Pending', // Default status
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    const { staffId, ...taskDataInput } = data;

    // Prepare data for the API
    const taskDataPayload: CreateAndAssignTaskRequest = {
      ...taskDataInput,
      // Format dates (now required)
      startTime: formatToTimestampz(taskDataInput.startTime),
      endTime: formatToTimestampz(taskDataInput.endTime),
      // Ensure priority is number or null
      priority: taskDataInput.priority ?? null,
    };

    createAndAssignMutation.mutate(
      { staffId: staffId, taskData: taskDataPayload },
      {
        onSuccess: () => {
          toast.success(
            'Task Created & Assigned',
            `Task "${taskDataPayload.title}" created and assigned successfully.`,
          );
          form.reset();
        },
        onError: (error) => {
          toast.error(
            'Creation Failed',
            error.message || 'Could not create or assign the task.',
          );
        },
      },
    );
  };

  if (isLoadingStaff) {
    return <div>Loading staff...</div>;
  }

  return (
    <div className='container mx-auto space-y-6 p-4'>
      <h1 className='text-3xl font-bold'>Task Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create and Assign Task</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='staffId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign To Staff</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select staff member...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {staffList && staffList.length > 0 ? (
                          staffList.map((staff) => (
                            <SelectItem key={staff.id} value={staff.id}>
                              {staff.firstName} {staff.lastName} ({staff.roleId}
                              )
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value='none' disabled>
                            No staff available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter task title' {...field} />
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
                      <Textarea
                        placeholder='Enter task description'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='startTime'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type='datetime-local' required {...field} />
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
                      <Input type='datetime-local' required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='priority'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority (1-5, Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='1'
                        max='5'
                        placeholder='e.g., 3'
                        {...field}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value, 10))
                        }
                      />
                    </FormControl>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select status...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Pending'>Pending</SelectItem>
                        <SelectItem value='InProgress'>In Progress</SelectItem>
                        <SelectItem value='Completed'>Completed</SelectItem>
                        <SelectItem value='Cancelled'>Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                disabled={createAndAssignMutation.isPending || isLoadingStaff}
                className='w-full'
              >
                {createAndAssignMutation.isPending
                  ? 'Creating...'
                  : 'Create & Assign Task'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingTasks ? (
            <div>Loading tasks...</div>
          ) : (
            <p>
              Task list display coming soon... ({tasks?.length || 0} tasks
              loaded)
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
