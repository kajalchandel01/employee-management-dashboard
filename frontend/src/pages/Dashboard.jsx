
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import SearchFilter from "../components/SearchFilter";
import { useState, useEffect } from "react";
import SummaryCard from "../components/SummaryCard";
import "./Dashboard.css";

const Dashboard = () => {
  const [name, setName] = useState(""); 
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  const [editId, setEditId] = useState(null);
  const [email, setEmail] = useState("");
  const [employees, setEmployees] = useState(() => {
  const savedEmployees = localStorage.getItem("employees");

  return savedEmployees
    ? JSON.parse(savedEmployees)
    : [
        {
          id: 1,
          name: "Rahul Sharma",
          department: "IT",
          designation: "Frontend Developer",
          status: "Active"
        },
        {
          id: 2,
          name: "Priya Verma",
          department: "HR",
          designation: "HR Manager",
          status: "Active"
        },
        {
          id: 3,
          name: "Aman Gupta",
          department: "Finance",
          designation: "Accountant",
          status: "On Leave"
        }
      ];
});
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);
  
  useEffect(() => {
  setCurrentPage(1);  
  }, [search, selectedDepartment]);

  const handleAddEmployee = () => {
    if (!name.trim() || !email.trim()|| !department.trim() || !designation.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (editId !== null) {
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === editId
            ? {
                ...employee,
                name: name.trim(),
                email: email.trim(),
                department: department.trim(),
                designation: designation.trim()
              }
            : employee
        )
      );

      setEditId(null);
    } else {
      const newEmployee = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        department: department.trim(),
        designation: designation.trim(),
        status: "Active"
      };

      setEmployees((prevEmployees) => [
        ...prevEmployees,
        newEmployee
      ]);
    }

    setName("");
    setEmail("");
    setDepartment("");
    setDesignation("");
  };

  const handleEditEmployee = (employee) => {
    setEditId(employee.id);
    setName(employee.name);
      setEmail(employee.email || "");
    setDepartment(employee.department);
    setDesignation(employee.designation);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setName("");
     setEmail("");
    setDepartment("");
    setDesignation("");
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );

    if (editId === id) {
      handleCancelEdit();
    }
  };
  const handleStatusChange = (id, newStatus) => {
   setEmployees((prevEmployees) =>
    prevEmployees.map((employee) =>
      employee.id === id
        ? {
            ...employee,
            status: newStatus
          }
        : employee
    )
  );
};

 const filteredEmployees = employees.filter((employee) => {
  const matchesSearch =
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.department.toLowerCase().includes(search.toLowerCase());

  const matchesDepartment =
    selectedDepartment === "All" ||
    employee.department === selectedDepartment;

  return matchesSearch && matchesDepartment;
});
  const totalPages = Math.ceil(
    filteredEmployees.length / employeesPerPage
  );

  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;

  const currentEmployees = filteredEmployees.slice(
    startIndex,
    endIndex
  );

  return (
    <div className="dashboard">

      {/* Dashboard Heading */}
      <div className="dashboard-heading">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Track and manage your employee information.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-cards">
        <SummaryCard
          title="Total Employees"
          value={employees.length}
          color="#DCFCE7"
        />

        <SummaryCard
          title="Active Employees"
          value={employees.filter((emp) => emp.status === "Active").length}
          color="#FEF3C7"
        />

        <SummaryCard
          title="On Leave"
          value={employees.filter((emp) => emp.status === "On Leave").length}
          color="#EDE9FE"
        />

        <SummaryCard
          title="Departments"
          value={new Set(employees.map((emp) => emp.department)).size}
        />
      </div>

      {/* Add / Edit Employee */}
    <EmployeeForm
  name={name}
  setName={setName}
  email={email}
  setEmail={setEmail}
  department={department}
  setDepartment={setDepartment}
  designation={designation}
  setDesignation={setDesignation}
  handleAddEmployee={handleAddEmployee}
  editId={editId}
  handleCancelEdit={handleCancelEdit}
/>

      {/* Employee List */}
      <section className="employee-list-section">
        <div className="employee-list-heading">
          <div>
            <h2>Employee Directory</h2>
            <p>View and manage all employees.</p>
          </div>
            <SearchFilter
              search={search}
              setSearch={setSearch}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              employees={employees}
              setCurrentPage={setCurrentPage}
            />
        </div>

        <EmployeeTable
          employees={currentEmployees}
          handleEditEmployee={handleEditEmployee}
          handleDeleteEmployee={handleDeleteEmployee}
          handleStatusChange={handleStatusChange}
        />
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
