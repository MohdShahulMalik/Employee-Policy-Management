import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Employee, CreateEmployeeData, UpdateEmployeeData } from "../types";
import { employeeApi } from "../services/api";

interface EmployeesState {
  data: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await employeeApi.getAll();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch employees");
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (employeeData: CreateEmployeeData, { rejectWithValue }) => {
    try {
      const response = await employeeApi.create(employeeData);
      return {
        id: response.data.id,
        ...employeeData,
      } as Employee;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create employee");
    }
  }
);

export const updateEmployeeAsync = createAsyncThunk(
  "employees/update",
  async (
    { id, data }: { id: string; data: UpdateEmployeeData },
    { rejectWithValue }
  ) => {
    try {
      await employeeApi.update(id, data);
      return { id, data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update employee");
    }
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  "employees/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await employeeApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete employee");
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateEmployeeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (e) => e.id.id.String === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = {
            ...state.data[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(updateEmployeeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (e) => e.id.id.String !== action.payload
        );
      })
      .addCase(deleteEmployeeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = employeesSlice.actions;
export default employeesSlice.reducer;
