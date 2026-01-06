import type { RecordId, PersonName } from "./common";

export interface Policy {
  id: RecordId;
  name: PersonName;
  employee_id: RecordId;
  plan: string;
  status: string;
  effective_date: string;
}

export interface CreatePolicyData {
  name: PersonName;
  employee_id: RecordId;
  plan: string;
  status: string;
  effective_date: string;
}

export interface UpdatePolicyData {
  name: PersonName;
  plan: string;
  status: string;
  effective_date: string;
}

export interface CreatePolicyResponse {
  id: RecordId;
}
