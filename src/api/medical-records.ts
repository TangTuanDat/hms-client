import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './config';

interface MedicalRecord {
  id: string;
  createdAt: string;
  date: string;
  diagnosis: string;
  notes: string;
  patientId: string;
  staffId: string;
  treatment: string;
  updatedAt: string;
}

interface CreateMedicalRecordRequest {
  date: string;
  diagnosis: string;
  notes: string;
  staffId: string;
  treatment: string;
}

// Get medical history for a patient
export const useGetMedicalHistory = (patientId: string) => {
  return useQuery<MedicalRecord[]>({
    queryKey: ['patients', patientId, 'medical-history'],
    queryFn: async () => {
      const response = await api.get(
        `/api/v1/patients/${patientId}/medical-history`,
      );
      return response.data.medicalHistory;
    },
    enabled: !!patientId,
  });
};

// Create a new medical record
export const useCreateMedicalRecord = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateMedicalRecordRequest>({
    mutationFn: async (data) => {
      await api.post(`/api/v1/patients/${patientId}/medical-records`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['patients', patientId, 'medical-history'],
      });
    },
  });
};
