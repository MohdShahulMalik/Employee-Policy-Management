import { useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect, type ChangeEvent } from "react";
import Modal, {
  type ModalHandle,
  ConfirmModal,
  type ConfirmModalHandle,
} from "../components/Modal";
import Button from "../components/Button";
import { policyFormConfig } from "../utils/formConfig";
import Header from "../components/Header";
import Table from "../components/Table";
import type { Employee } from "../types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchPolicies,
  createPolicy,
  updatePolicyAsync,
  deletePolicyAsync,
} from "../store/policiesSlice";
import { fetchEmployees } from "../store/employeesSlice";

export default function Policies() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const dispatch = useAppDispatch();
  const { data: policiesData, loading, error } = useAppSelector(
    (state) => state.policies
  );
  const employeesData = useAppSelector((state) => state.employees.data);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const addPolicyModalRef = useRef<ModalHandle>(null);
  const editPolicyModalRef = useRef<ModalHandle>(null);
  const deletingPolicyModalRef = useRef<ConfirmModalHandle>(null);

  useEffect(() => {
    dispatch(fetchPolicies());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAddingPolicies = (formData: Record<string, string>) => {
    const emp_first_name = formData["0"].split(" ")[0];
    const emp_last_name = formData["0"].split(" ")[1] || "";
    const employee = employeesData.find((e: Employee) => {
      const name = e.name.first_name + e.name.last_name;
      return name === emp_first_name + emp_last_name;
    });

    if (!employee) {
      console.log("Error, no employee found");
      return;
    }

    const first_name = formData["1"].split(" ")[0];
    const last_name = formData["1"].split(" ")[1] || "";
    

    const policyData = {
      name: {
        first_name,
        last_name,
      },
      employee_id: employee.id,
      plan: formData["2"],
      status: formData["3"],
      effective_date: formData["4"],
    };
    dispatch(createPolicy(policyData));
  };

  const handleEditingPolicy = (formData: Record<string, string>) => {
    if (editingId === null) return;

    const data = {
      name: {
        first_name: formData["1"].split(" ")[0],
        last_name: formData["1"].split(" ")[1] || "",
      },
      plan: formData["2"],
      status: formData["3"],
      effective_date: formData["4"],
    };
    dispatch(updatePolicyAsync({ id: editingId, data }));
  };

  const handleOpenAddPolicyModal = () => {
    addPolicyModalRef.current?.open();
  };

  const handleOpenEditPolicyModal = (id: string) => {
    setEditingId(id);
    const policy = policiesData.find((p) => p.id.id.String === id);
    if (!policy) return;

    const initialData = {
      "0": policy.name.first_name + " " + policy.name.last_name,
      "1": policy.plan,
      "2": policy.status,
      "3": policy.effective_date,
    };
    editPolicyModalRef.current?.open(initialData);
  };

  const handleOpenDeletionModal = (id: string) => {
    setDeletingId(id);
    deletingPolicyModalRef.current?.open();
  };

  const handleDeletion = () => {
    if (deletingId !== null) {
      dispatch(deletePolicyAsync(deletingId));
    }
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onStatusFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const filteredPoliciesData = policiesData.filter((policy) => {
    const searchMatch =
      searchTerm === "" ||
      `${policy.name.first_name} ${policy.name.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      policy.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.status.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter === "" || policy.status === statusFilter;

    const userMatch = !userId || policy.employee_id.id.String === userId;

    return searchMatch && statusMatch && userMatch;
  });

  if (loading && policiesData.length === 0) {
    return <div className="p-8 text-center text-foreground">Loading policies...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section className="overflow-hidden rounded-4xl border-4 border-border-default bg-surface-700">
      <article>
        <Header
          subject="Policy"
          onChange={onSearchInputChange}
          button={
            <Button
              size="medium"
              text="Add"
              onClick={handleOpenAddPolicyModal}
              className="h-[70%] w-[25%]"
            />
          }
          dropdownOptions={["Active", "Pending", "Expired"]}
          dropdownValue={statusFilter}
          onDropdownChange={onStatusFilterChange}
          dropdownPlaceholder="Filter by Status"
        >
          Policies
        </Header>
      </article>
      <hr />
      <article>
        <Table
          tableName="Policies"
          tableData={filteredPoliciesData}
          onEditClick={handleOpenEditPolicyModal}
          onDeleteClick={handleOpenDeletionModal}
        />
      </article>
      <Modal
        heading="Add Policies"
        ref={addPolicyModalRef}
        config={policyFormConfig}
        onClick={handleAddingPolicies}
        employees={employeesData}
      />
      <Modal
        heading="Edit Policies"
        config={policyFormConfig}
        ref={editPolicyModalRef}
        onClick={handleEditingPolicy}
      />
      <ConfirmModal
        ref={deletingPolicyModalRef}
        onConfirm={handleDeletion}
        heading="Policy"
      />
    </section>
  );
}
