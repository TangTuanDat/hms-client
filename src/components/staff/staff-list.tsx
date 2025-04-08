'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Staff } from '@/models/staff';

const initialStaffData: Staff[] = [
  {
    id: 1,
    name: 'Dr. John Doe',
    age: 35,
    phoneNumber: '123-456-7890',
    role: { id: 1, name: 'Doctor' },
    status: 'Active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  // Add more sample data as needed
];

export function StaffList() {
  const [staffData] = useState(initialStaffData);

  const handleEdit = (id: number) => {
    // TODO: Implement edit functionality
    console.log('Edit staff member:', id);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete functionality
    console.log('Delete staff member:', id);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Staff Management</h1>
        <button className='bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-white transition-colors'>
          Add New Staff
        </button>
      </div>

      <div className='rounded-md border'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='bg-muted/50 border-b'>
              <th className='p-2 text-left font-medium'>Name</th>
              <th className='p-2 text-left font-medium'>Age</th>
              <th className='p-2 text-left font-medium'>Phone</th>
              <th className='p-2 text-left font-medium'>Role</th>
              <th className='p-2 text-left font-medium'>Status</th>
              <th className='p-2 text-left font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff) => (
              <tr key={staff.id} className='border-b'>
                <td className='p-2'>{staff.name}</td>
                <td className='p-2'>{staff.age}</td>
                <td className='p-2'>{staff.phoneNumber}</td>
                <td className='p-2'>{staff.role.name}</td>
                <td className='p-2'>
                  <span
                    className={`inline-flex rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                      staff.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>
                <td className='p-2'>
                  <div className='flex items-center gap-1'>
                    <button
                      onClick={() => handleEdit(staff.id)}
                      className='inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-white transition-colors hover:bg-blue-600'
                      title='Edit staff member'
                    >
                      <Pencil className='h-3.5 w-3.5' />
                    </button>
                    <button
                      onClick={() => handleDelete(staff.id)}
                      className='inline-flex h-8 w-8 items-center justify-center rounded-md bg-red-500 text-white transition-colors hover:bg-red-600'
                      title='Delete staff member'
                    >
                      <Trash2 className='h-3.5 w-3.5' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
