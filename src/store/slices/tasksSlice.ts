import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'cancelled';
type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

interface TasksState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      // Simulated API call
      return await new Promise<Task[]>((resolve) => {
        setTimeout(() => {
          resolve([
            // Mock tasks data
          ]);
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue('Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      // Simulated API call
      return await new Promise<Task>((resolve) => {
        setTimeout(() => {
          resolve({
            ...task,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue('Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<Task> }, { rejectWithValue }) => {
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { id, updates };
    } catch (error) {
      return rejectWithValue('Failed to update task');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearCurrentTask: (state) => {
      state.currentTask = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const taskIndex = state.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = {
            ...state.tasks[taskIndex],
            ...updates,
            updatedAt: new Date().toISOString(),
          };
        }
        if (state.currentTask?.id === id) {
          state.currentTask = {
            ...state.currentTask,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
        }
      });
  },
});

export const { clearCurrentTask } = tasksSlice.actions;
export default tasksSlice.reducer;