import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic types for API responses
interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Generic hook for GET requests
export function useGetQuery<T>(
  endpoint: string,
  queryKey: string[],
  enabled = true,
) {
  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      const response = await api.get<ApiResponse<T>>(endpoint);
      return response.data.data;
    },
    enabled,
  });
}

// Generic hook for POST requests
export function usePostMutation<T, R = void>(
  endpoint: string,
  queryKey: string[],
) {
  const queryClient = useQueryClient();

  return useMutation<T, Error, R>({
    mutationFn: async (data: R) => {
      const response = await api.post<ApiResponse<T>>(endpoint, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

// Generic hook for PUT requests
export function usePutMutation<T, R = void>(
  endpoint: string,
  queryKey: string[],
) {
  const queryClient = useQueryClient();

  return useMutation<T, Error, R>({
    mutationFn: async (data: R) => {
      const response = await api.put<ApiResponse<T>>(endpoint, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

// Generic hook for DELETE requests
export function useDeleteMutation<T = void>(
  endpoint: string,
  queryKey: string[],
) {
  const queryClient = useQueryClient();

  return useMutation<T, Error>({
    mutationFn: async () => {
      const response = await api.delete<ApiResponse<T>>(endpoint);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

// Example usage:
/*
// GET example
const { data, isLoading } = useGetQuery<User[]>('/users', ['users']);

// POST example
const { mutate: createUser } = usePostMutation<User, CreateUserDto>('/users', ['users']);
createUser({ name: 'John', email: 'john@example.com' });

// PUT example
const { mutate: updateUser } = usePutMutation<User, UpdateUserDto>('/users/1', ['users']);
updateUser({ name: 'John Updated' });

// DELETE example
const { mutate: deleteUser } = useDeleteMutation('/users/1', ['users']);
deleteUser();
*/
