// Patient Types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  address: string;
}

export interface UpdatePatientRequest {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  phoneNumber?: string;
  address?: string;
}

// Staff Types
export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  specialization: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaffRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  specialization: string;
}

export interface UpdateStaffRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  specialization?: string;
}
