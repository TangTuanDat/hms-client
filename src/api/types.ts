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
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  nurseType: string;
  roleId: string;
  specialization: string;
  statusId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaffRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  nurseType: string;
  roleId: string;
  specialization: string;
  statusId: string;
}

export interface UpdateStaffRequest extends Partial<CreateStaffRequest> {}

// Task Types
export interface Task {
  id: string;
  title: string;
  description: string;
  statusId: string;
  assignedStaffId?: string | null;
  createdAt: string;
  updatedAt: string;
  startTime?: string | null;
  endTime?: string | null;
  priority?: number | null;
}

export interface CreateAndAssignTaskRequest {
  title: string;
  description: string;
  startTime?: string | null;
  endTime?: string | null;
  priority?: number | null;
  statusId: string;
}

// Assuming the AssignTask endpoint returns the updated Task
export type AssignTaskResponse = Task;

// Assuming a GET /api/v1/tasks endpoint exists
export type GetTasksResponse = Task[];
