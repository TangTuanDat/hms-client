'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGetStaffById } from '@/api/staff';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calendar,
  Phone,
  MapPin,
  User,
  Briefcase,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function StaffDetailPage() {
  const router = useRouter();
  const params = useParams();
  const uuid = params.uuid as string;

  const { data, isLoading } = useGetStaffById(uuid);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const staff = data?.staff;

  if (!staff) {
    router.push('/staff/list');
    return null;
  }

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

  return (
    <div className='space-y-6'>
      <div className='mb-8 flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.push('/staff/list')}
        >
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <div>
          <h1 className='text-3xl font-bold'>Staff Details</h1>
          <p className='text-muted-foreground'>
            View and manage staff information
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {staff.firstName} {staff.lastName}
          </CardTitle>
          <CardDescription>Staff ID: {staff.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Calendar className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Date of Birth</p>
                  <p className='text-muted-foreground text-sm'>
                    {new Date(staff.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Briefcase className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Role</p>
                  <p className='text-muted-foreground text-sm'>
                    {staff.roleId}
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
                    {staff.phoneNumber}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Address</p>
                  <p className='text-muted-foreground text-sm'>
                    {staff.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='mt-8'>
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold'>Schedule</h2>
        </div>

        <div className='grid gap-4'>
          {staff.schedule.length === 0 ? (
            <Card>
              <CardContent className='py-6 text-center'>
                <p className='text-muted-foreground'>
                  No tasks scheduled for this staff member
                </p>
              </CardContent>
            </Card>
          ) : (
            staff.schedule.map((scheduleItem) => (
              <Card key={scheduleItem.task.id}>
                <CardHeader>
                  <CardTitle>{scheduleItem.task.title}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div>
                    <strong>Description:</strong>{' '}
                    {scheduleItem.task.description}
                  </div>
                  <div>
                    <strong>Time:</strong>{' '}
                    {formatDateTime(scheduleItem.task.startTime)} -{' '}
                    {formatDateTime(scheduleItem.task.endTime)}
                  </div>
                  <div>
                    <strong>Status:</strong>{' '}
                    <span className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10'>
                      {scheduleItem.task.statusId}
                    </span>
                  </div>
                  <div>
                    <strong>Priority:</strong>{' '}
                    {getPriorityTag(scheduleItem.task.priority)}
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
