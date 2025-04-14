import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PatientState {
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
}

export const usePatientStore = create<PatientState>()(
  persist(
    (set) => ({
      selectedPatientId: null,
      setSelectedPatientId: (id) => set({ selectedPatientId: id }),
    }),
    {
      name: 'patient-storage', // unique name for localStorage
    },
  ),
);
