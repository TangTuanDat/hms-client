import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './config';
import {
  Task,
  GetTasksResponse,
  /* AssignTaskResponse, */ CreateAndAssignTaskRequest,
} from './types';

const TASKS_BASE_URL = '/api/v1/tasks';
const STAFF_BASE_URL = '/api/v1/staff';

interface Task {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  statusId: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface TasksResponse {
  tasks: Task[];
}

// Get all tasks (assuming endpoint exists)
export const useGetTasks = () => {
  return useQuery<TasksResponse>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/api/v1/tasks');
      return response.data;
    },
  });
};

// Assign existing task to staff (Keep if still needed)
// export const useAssignTask = () => { ... };

// Create a new task and assign it to a staff member
export const useCreateAndAssignTask = () => {
  const queryClient = useQueryClient();

  // The mutation returns void (empty object {}) on success
  return useMutation<
    void,
    Error,
    { staffId: string; taskData: CreateAndAssignTaskRequest }
  >({
    mutationFn: async ({ staffId, taskData }) => {
      // POST to /api/v1/staff/{staffId}/tasks with task data in the body
      await api.post(`${STAFF_BASE_URL}/${staffId}/tasks`, taskData);
      // No response data to return according to the spec ({})
    },
    onSuccess: (_, variables) => {
      // Invalidate tasks query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      // Optionally invalidate the specific staff member's data if relevant
      // queryClient.invalidateQueries({ queryKey: ['staff', variables.staffId] });
    },
  });
};

interface CreateTaskPayload {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  priority: number;
  statusId: string;
  staffId: string; // This will be used for the URL, not in the payload
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ staffId, ...data }: CreateTaskPayload) => {
      const response = await api.post(`/api/v1/staff/${staffId}/tasks`, {
        ...data,
        statusId: 'Pending', // Default status for new tasks
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

// Add other task-related API calls here if needed (e.g., createTask, updateTaskStatus)
