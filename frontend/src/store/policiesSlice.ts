import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Policy, CreatePolicyData, UpdatePolicyData } from "../types";
import { policyApi } from "../services/api";

interface PoliciesState {
  data: Policy[];
  loading: boolean;
  error: string | null;
}

const initialState: PoliciesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPolicies = createAsyncThunk(
  "policies/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await policyApi.getAll();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch policies");
    }
  }
);

export const createPolicy = createAsyncThunk(
  "policies/create",
  async (policyData: CreatePolicyData, { rejectWithValue, dispatch }) => {
    try {
      await policyApi.create(policyData);
      dispatch(fetchPolicies());
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create policy");
    }
  }
);

export const updatePolicyAsync = createAsyncThunk(
  async (
    { id, data }: { id: string; data: UpdatePolicyData },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await policyApi.update(id, data);
      dispatch(fetchPolicies());
      return { id, data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update policy");
    }
  }
);

export const deletePolicyAsync = createAsyncThunk(
  "policies/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await policyApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete policy");
    }
  }
);

const policiesSlice = createSlice({
  name: "policies",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPolicy.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePolicyAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePolicyAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePolicyAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePolicyAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePolicyAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (p) => p.id.id.String !== action.payload
        );
      })
      .addCase(deletePolicyAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = policiesSlice.actions;
export default policiesSlice.reducer;
