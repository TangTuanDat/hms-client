export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
}

export interface MedicalRecord {
  staffId: number;
  patientId: number;
  diagnosis: string;
  treatment: string;
  date: Date;
  notes: string;
}
