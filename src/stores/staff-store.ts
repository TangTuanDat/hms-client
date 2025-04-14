import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StaffState {
  selectedStaffId: string | null;
  setSelectedStaffId: (id: string | null) => void;
}

export const useStaffStore = create<StaffState>()(
  persist(
    (set) => ({
      selectedStaffId: null,
      setSelectedStaffId: (id) => set({ selectedStaffId: id }),
    }),
    {
      name: 'staff-storage', // unique name for localStorage
    },
  ),
);
