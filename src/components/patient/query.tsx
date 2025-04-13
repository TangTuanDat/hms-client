import {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
} from '@/lib/query';

// Types
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phoneNumber: string;
  address: string;
  medicalHistory?: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientDto {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phoneNumber: string;
  address: string;
  medicalHistory?: string;
  status: 'Active' | 'Inactive';
}

export interface UpdatePatientDto extends Partial<CreatePatientDto> {}

// Hooks
export function useGetPatients() {
  return useGetQuery<Patient[]>('/patients', ['patients']);
}

export function useGetPatientById(id: string) {
  return useGetQuery<Patient>(`/patients/${id}`, ['patients', id]);
}

export function useCreatePatient() {
  return usePostMutation<Patient, CreatePatientDto>('/patients', ['patients']);
}

export function useUpdatePatient(id: string) {
  return usePutMutation<Patient, UpdatePatientDto>(`/patients/${id}`, [
    'patients',
  ]);
}

export function useDeletePatient() {
  return useDeleteMutation('/patients', ['patients']);
}

// Example usage:
/*
// Get all patients
const { data: patients, isLoading } = useGetPatients();

// Get single patient
const { data: patient } = useGetPatientById('123');

// Create patient
const { mutate: createPatient } = useCreatePatient();
createPatient({
  name: 'John Doe',
  age: 30,
  gender: 'Male',
  phoneNumber: '1234567890',
  address: '123 Main St',
  status: 'Active'
});

// Update patient
const { mutate: updatePatient } = useUpdatePatient('123');
updatePatient({
  name: 'John Updated'
});

// Delete patient
const { mutate: deletePatient } = useDeletePatient();
deletePatient();
*/
