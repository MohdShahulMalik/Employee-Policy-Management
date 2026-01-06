import type { FormFieldConfig } from "../types";

export const employeeFormConfig: FormFieldConfig[] = [
  { name: "first_name", label: "First Name", type: "text" },
  { name: "last_name", label: "Last Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: ["Admin", "User", "Viewer"],
  },
];

export const policyFormConfig: FormFieldConfig[] = [
  { name: "name", label: "Employee Name", type: "text" },
  { name: "policy_name", label: "Policy Name", type: "text"},
  {
    name: "plan",
    label: "Plan",
    type: "select",
    options: ["Premium", "Standard", "Gold", "Platinum", "Basic"],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["Active", "Pending", "Expired"],
  },
  { name: "effective_date", label: "Effective Date", type: "date" },
];
