'use client';

import { useState } from 'react';
import { useGetTasks } from '@/api/task';
import { TaskForm } from '@/components/task/task-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function TasksPage() {
  const { data: tasksData, isLoading: isLoadingTasks } = useGetTasks();
  const [isOpen, setIsOpen] = useState(false);
  const tasks = tasksData?.tasks ?? [];

  const getPriorityTag = (priority: number) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';

    if (priority >= 4) {
      return (
        <span className={cn(baseClasses, 'bg-red-100 text-red-700')}>
          {priority}
        </span>
      );
    }

    if (priority >= 2) {
      return (
        <span className={cn(baseClasses, 'bg-yellow-100 text-yellow-700')}>
          {priority}
        </span>
      );
    }

    return (
      <span className={cn(baseClasses, 'bg-green-100 text-green-700')}>
        {priority}
      </span>
    );
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const handleSuccess = () => {
    setIsOpen(false);
  };

  if (isLoadingTasks) {
    return <div>Loading...</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <ClipboardList className='text-primary h-8 w-8' />
          <div>
            <h1 className='text-3xl font-bold'>Tasks</h1>
            <p className='text-muted-foreground'>
              View and manage task assignments
            </p>
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-green-600 hover:bg-green-700'>
              <Plus className='mr-2 h-4 w-4' />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <TaskForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className='font-medium'>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{formatDateTime(task.startTime)}</TableCell>
                  <TableCell>{formatDateTime(task.endTime)}</TableCell>
                  <TableCell>
                    <span className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10'>
                      {task.statusId}
                    </span>
                  </TableCell>
                  <TableCell>{getPriorityTag(task.priority)}</TableCell>
                </TableRow>
              ))}
              {tasks.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className='text-muted-foreground py-6 text-center'
                  >
                    No tasks found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
