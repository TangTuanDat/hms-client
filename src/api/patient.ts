import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './config';
import { Patient, CreatePatientRequest, UpdatePatientRequest } from './types';
import {
  useGetQuery,
  usePostMutation,
  usePatchMutation,
  useDeleteMutation,
} from '@/lib/query';

const PATIENTS_BASE_URL = '/api/v1/patients';

// Get all patients
export const useGetPatients = () => {
  return useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: async () => {
      const response = await api.get(PATIENTS_BASE_URL);
      return response.data.patients;
    },
  });
};

// Get patient by ID
export const useGetPatient = (id: string) => {
  return useQuery<Patient>({
    queryKey: ['patients', id],
    queryFn: async () => {
      const response = await api.get(`${PATIENTS_BASE_URL}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create patient
export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation<Patient, Error, CreatePatientRequest>({
    mutationFn: async (data) => {
      const response = await api.post(PATIENTS_BASE_URL, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

// Update patient (using PATCH)
export const useUpdatePatient = (id: string) => {
  return usePatchMutation<Patient, UpdatePatientRequest>(
    `${PATIENTS_BASE_URL}/${id}`,
    ['patients', id],
  );
};

// Delete patient
export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await api.delete(`${PATIENTS_BASE_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};
