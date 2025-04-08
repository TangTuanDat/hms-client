export interface StaffRole {
  id: number;
  name: string;
}

export interface StaffStatus {
  name: string;
  desc: string;
}

export interface Staff {
  id: number;
  name: string;
  age: number;
  phoneNumber: string;
  role: StaffRole;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Schedule {
  staffId: number;
  taskId: number;
}

export interface Task {
  id: number;
  title: string;
  desc: string;
  priority: number;
  status: string;
  timeSlot: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskStatus {
  name: string;
  desc: string;
}
