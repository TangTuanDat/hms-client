import { create } from 'zustand';

interface StaffState {
  staffId: string | null;
  setStaffId: (id: string | null) => void;
}

export const useStaffStore = create<StaffState>((set) => ({
  staffId: null,
  setStaffId: (id) => set({ staffId: id }),
}));
