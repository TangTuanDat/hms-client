import {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
} from '@/lib/query';

// Types
export interface Staff {
  id: string;
  name: string;
  age: number;
  phoneNumber: string;
  role: {
    id: string;
    name: string;
  };
  status: 'Active' | 'Inactive';
}

export interface CreateStaffDto {
  name: string;
  age: number;
  phoneNumber: string;
  roleId: string;
  status: 'Active' | 'Inactive';
}

export interface UpdateStaffDto extends Partial<CreateStaffDto> {}

// Hooks
export function useGetStaff() {
  return useGetQuery<Staff[]>('/staff', ['staff']);
}

export function useGetStaffById(id: string) {
  return useGetQuery<Staff>(`/staff/${id}`, ['staff', id]);
}

export function useCreateStaff() {
  return usePostMutation<Staff, CreateStaffDto>('/staff', ['staff']);
}

export function useUpdateStaff(id: string) {
  return usePutMutation<Staff, UpdateStaffDto>(`/staff/${id}`, ['staff']);
}

export function useDeleteStaff(id: string) {
  return useDeleteMutation(`/staff/${id}`, ['staff']);
}

// Example usage:
/*
// Get all staff
const { data: staffList, isLoading } = useGetStaff();

// Get single staff
const { data: staff } = useGetStaffById('123');

// Create staff
const { mutate: createStaff } = useCreateStaff();
createStaff({
  name: 'John Doe',
  age: 30,
  phoneNumber: '1234567890',
  roleId: '1',
  status: 'Active'
});

// Update staff
const { mutate: updateStaff } = useUpdateStaff('123');
updateStaff({
  name: 'John Updated'
});

// Delete staff
const { mutate: deleteStaff } = useDeleteStaff('123');
deleteStaff();
*/
