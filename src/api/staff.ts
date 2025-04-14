import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './config';
import { Staff, CreateStaffRequest, UpdateStaffRequest } from './types';
import {
  useGetQuery,
  usePostMutation,
  usePatchMutation,
  useDeleteMutation,
} from '@/lib/query';

const STAFF_BASE_URL = '/api/v1/staff';

// Get all staff
export const useGetStaff = () => {
  return useQuery<Staff[]>({
    queryKey: ['staff'],
    queryFn: async () => {
      const response = await api.get(STAFF_BASE_URL);
      return response.data.staffMembers;
    },
  });
};

// Get staff by ID
export const useGetStaffMember = (id: string) => {
  return useQuery<Staff>({
    queryKey: ['staff', id],
    queryFn: async () => {
      const response = await api.get(`${STAFF_BASE_URL}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create staff
export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation<Staff, Error, CreateStaffRequest>({
    mutationFn: async (data) => {
      const response = await api.post(STAFF_BASE_URL, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
  });
};
// Update staff
export const useUpdateStaff = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Staff, Error, UpdateStaffRequest>({
    mutationFn: async (data) => {
      const response = await api.patch(`${STAFF_BASE_URL}/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
  });
};

// Delete staff
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await api.delete(`${STAFF_BASE_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
  });
};

// Add this new hook to get only doctors
export const useGetDoctors = () => {
  return useQuery<Staff[]>({
    queryKey: ['staff', 'doctors'],
    queryFn: async () => {
      const response = await api.get(STAFF_BASE_URL);
      return response.data.staffMembers.filter(
        (staff: Staff) => staff.roleId === 'Doctor',
      );
    },
  });
};
