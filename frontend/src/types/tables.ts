export interface RecordId {
  tb: string;
  id: {
    String: string;
  };
}

export interface Name {
  first_name: string;
  last_name: string;
}

export interface Employees {
  id: RecordId;
  name: Name;
  email: string;
  role: string;
}

export interface Policies {
  id: RecordId;
  name: Name;
  employee_id: RecordId;
  plan: string;
  status: string;
  effective_date: string;
}
