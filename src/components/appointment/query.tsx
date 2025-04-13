import {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
} from '@/lib/query';

// Types
export interface Appointment {
  id: string;
  patientId: string;
  staffId: string;
  date: string;
  time: string;
  type: 'Checkup' | 'Consultation' | 'Emergency' | 'Follow-up';
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-show';
  notes?: string;
  patient: {
    id: string;
    name: string;
  };
  staff: {
    id: string;
    name: string;
  };
}

export interface CreateAppointmentDto {
  patientId: string;
  staffId: string;
  date: string;
  time: string;
  type: 'Checkup' | 'Consultation' | 'Emergency' | 'Follow-up';
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-show';
  notes?: string;
}

export interface UpdateAppointmentDto extends Partial<CreateAppointmentDto> {}

// Hooks
export function useGetAppointments() {
  return useGetQuery<Appointment[]>('/appointments', ['appointments']);
}

export function useGetAppointmentById(id: string) {
  return useGetQuery<Appointment>(`/appointments/${id}`, ['appointments', id]);
}

export function useGetAppointmentsByDate(date: string) {
  return useGetQuery<Appointment[]>(`/appointments/date/${date}`, [
    'appointments',
    'date',
    date,
  ]);
}

export function useGetAppointmentsByStaff(staffId: string) {
  return useGetQuery<Appointment[]>(`/appointments/staff/${staffId}`, [
    'appointments',
    'staff',
    staffId,
  ]);
}

export function useGetAppointmentsByPatient(patientId: string) {
  return useGetQuery<Appointment[]>(`/appointments/patient/${patientId}`, [
    'appointments',
    'patient',
    patientId,
  ]);
}

export function useCreateAppointment() {
  return usePostMutation<Appointment, CreateAppointmentDto>('/appointments', [
    'appointments',
  ]);
}

export function useUpdateAppointment(id: string) {
  return usePutMutation<Appointment, UpdateAppointmentDto>(
    `/appointments/${id}`,
    ['appointments'],
  );
}

export function useDeleteAppointment(id: string) {
  return useDeleteMutation(`/appointments/${id}`, ['appointments']);
}

// Example usage:
/*
// Get all appointments
const { data: appointments, isLoading } = useGetAppointments();

// Get appointments by date
const { data: dailyAppointments } = useGetAppointmentsByDate('2024-04-08');

// Get appointments by staff
const { data: staffAppointments } = useGetAppointmentsByStaff('123');

// Get appointments by patient
const { data: patientAppointments } = useGetAppointmentsByPatient('123');

// Create appointment
const { mutate: createAppointment } = useCreateAppointment();
createAppointment({
  patientId: '123',
  staffId: '456',
  date: '2024-04-08',
  time: '14:00',
  type: 'Checkup',
  status: 'Scheduled'
});

// Update appointment
const { mutate: updateAppointment } = useUpdateAppointment('123');
updateAppointment({
  status: 'Completed',
  notes: 'Patient checkup completed successfully'
});

// Delete appointment
const { mutate: deleteAppointment } = useDeleteAppointment('123');
deleteAppointment();
*/
