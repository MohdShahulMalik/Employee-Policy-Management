import axios from "axios";
import type {
  Employee,
  Policy,
  CreateEmployeeData,
  UpdateEmployeeData,
  CreateEmployeeResponse,
  CreatePolicyData,
  UpdatePolicyData,
  CreatePolicyResponse,
  CountResponse,
} from "../types";

const API_BASE_URL = "http://localhost:3100";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Employee API
export const employeeApi = {
  getAll: () => api.get<Employee[]>("/employees"),
  getCount: () => api.get<CountResponse>("/employees/count"),
  create: (data: CreateEmployeeData) =>
    api.post<CreateEmployeeResponse>("/employees", data),
  update: (id: string, data: UpdateEmployeeData) =>
    api.put(`/employees/${id}`, data),
  delete: (id: string) => api.delete(`/employees/${id}`),
};

// Policy API
export const policyApi = {
  getAll: () => api.get<Policy[]>("/policies"),
  getCount: () => api.get<CountResponse>("/policies/count"),
  create: (data: CreatePolicyData) =>
    api.post<CreatePolicyResponse>("/policies", data),
  update: (id: string, data: UpdatePolicyData) =>
    api.patch(`/policies/${id}`, data),
  delete: (id: string) => api.delete(`/policies/${id}`),
};

export default api;
