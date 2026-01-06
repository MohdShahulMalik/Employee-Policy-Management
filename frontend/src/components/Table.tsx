import clsx from "clsx";
import type { Employee, Policy } from "../types";
import Button from "./Button";

interface TableProps {
  className?: string;
  tableData: Employee[] | Policy[];
  tableName: "Employees" | "Policies";
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  onViewPoliciesClick?: (id: string) => void;
}

// Helper function to get nested property values
function getNestedValue(obj: Employee | Policy, path: string): string {
  const value = path.split(".").reduce((acc: any, part) => acc && acc[part], obj);
  return value !== undefined && value !== null ? String(value) : "";
}

interface HeaderConfig {
  display: string;
  dataKey?: string | string[];
  isAction?: boolean;
}

function getHeaders(tableName: "Employees" | "Policies"): HeaderConfig[] {
  if (tableName === "Employees") {
    return [
      { display: "Id", dataKey: "id.id.String" },
      { display: "Name", dataKey: ["name.first_name", "name.last_name"] },
      { display: "Email", dataKey: "email" },
      { display: "Role", dataKey: "role" },
      { display: "Action", isAction: true },
    ];
  }

  return [
    { display: "Id", dataKey: "id.id.String" },
    { display: "Name", dataKey: ["name.first_name", "name.last_name"] },
    { display: "Plan", dataKey: "plan" },
    { display: "Status", dataKey: "status" },
    { display: "Effective Date", dataKey: "effective_date" },
    { display: "Action", isAction: true },
  ];
}

export default function Table(props: TableProps) {
  const headers = getHeaders(props.tableName);

  if (props.tableData.length === 0) {
    return (
      <div className="p-8 text-center text-foreground-muted">
        No {props.tableName.toLowerCase()} found.
      </div>
    );
  }

  return (
    <table className={clsx(props.className, "w-[90svw] rounded-2xl text-foreground")}>
      <colgroup>
        {headers.map((header, index) => (
          <col
            className={`${header.display.toLowerCase().replace(/\s/g, "-")}-col`}
            key={index}
          />
        ))}
      </colgroup>

      <thead>
        <tr className="border-b bg-surface-800">
          {headers.map((header, index) => (
            <th key={index} className="text-left px-4 py-2">
              {header.display}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="text-foreground-muted">
        {props.tableData.map((row, rowIndex) => {
          const recordId = row.id?.id?.String || String(rowIndex);
          return (
            <tr className="border-b" key={recordId}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  {header.isAction ? (
                    <article className="flex gap-1">
                      <Button
                        text="Edit"
                        size="small"
                        onClick={() => props.onEditClick(recordId)}
                      />
                      {props.tableName === "Employees" && props.onViewPoliciesClick && (
                        <Button
                          text="View Policies"
                          size="small"
                          onClick={() => props.onViewPoliciesClick?.(recordId)}
                        />
                      )}
                      <Button
                        danger
                        text="Delete"
                        size="small"
                        onClick={() => props.onDeleteClick(recordId)}
                      />
                    </article>
                  ) : header.dataKey ? (
                    Array.isArray(header.dataKey) ? (
                      header.dataKey
                        .map((key) => getNestedValue(row, key))
                        .filter(Boolean)
                        .join(" ")
                    ) : (
                      getNestedValue(row, header.dataKey)
                    )
                  ) : (
                    ""
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
