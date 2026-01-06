import clsx from "clsx";
import "../styles/dashboard.css";
import styles from "../styles/card.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import type { CountResponse } from "../types";
import "@flaticon/flaticon-uicons/css/all/all.css";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const [totalPolicies, setTotalPolicies] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const employeeCountPromise = axios.get<CountResponse>(
      "http://localhost:3100/employees/count",
    );
    const policyCountPromise = axios.get<CountResponse>(
      "http://localhost:3100/policies/count",
    );

    Promise.all([employeeCountPromise, policyCountPromise])
      .then(([employeeResponse, policyResponse]) => {
        setTotalEmployees(employeeResponse.data.count);
        setTotalPolicies(policyResponse.data.count);
      })
      .catch((error) => {
        console.log("Error fetching counts:", error);
        setError("Failed to fetch data. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={clsx(
        "grid h-[60svh] w-[80svw] content-center justify-center gap-8 rounded-4xl bg-surface-800",
      )}
    >
      <div className={clsx("flex gap-4")}>
        <div
          className={clsx(
            "flex h-[30svh] w-[35svw] content-center items-center justify-center gap-4 rounded-4xl border-t-4 border-surface-700 border-t-accent bg-surface-700 text-2xl",
            styles["cool-shadow"],
            styles["gradient"],
          )}
        >
          <i
            className={clsx(
              "fi fi-rr-user-trust text-5xl text-foreground-muted",
            )}
          ></i>
          <div className={clsx("font-bold text-foreground")}>
            <p>Total Employees</p>
            <p>{totalEmployees}</p>
          </div>
        </div>

        <div
          className={clsx(
            "flex h-[30svh] w-[35svw] items-center justify-center gap-4 rounded-4xl border-t-4 border-t-accent bg-surface-700 text-2xl",
            styles["cool-shadow"],
            styles["gradient"],
          )}
        >
          <i
            className={clsx(
              "fi fi-rs-memo-circle-check text-5xl text-foreground-muted",
            )}
          ></i>
          <div className={clsx("font-bold text-foreground")}>
            <p>Total Policies</p>
            <p>{totalPolicies}</p>
          </div>
        </div>
      </div>

      <div className={clsx("mt-2 flex justify-start gap-4")}>
        <NavLink to="/employees">
          <Button text="Employees" size="medium" className="font-bold" />
        </NavLink>
        <NavLink to="/policies">
          <Button text="Policies" size="medium" className="font-bold" />
        </NavLink>
      </div>
    </div>
  );
}
