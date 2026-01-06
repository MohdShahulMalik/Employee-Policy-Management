import type { RecordId, PersonName } from "./common";

export interface Employee {
  id: RecordId;
  name: PersonName;
  email: string;
  role: string;
}

export interface CreateEmployeeData {
  name: PersonName;
  email: string;
  role: string;
}

export interface UpdateEmployeeData {
  name: PersonName;
  email: string;
  role: string;
}

export interface CreateEmployeeResponse {
  id: RecordId;
}
