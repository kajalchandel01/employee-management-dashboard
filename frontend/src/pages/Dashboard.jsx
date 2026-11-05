
import { useState } from "react";
import SummaryCard from "../components/SummaryCard";
import "./Dashboard.css";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
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

  const handleAddEmployee = () => {
    if (!name.trim() || !department.trim() || !designation.trim()) {
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
    setDepartment("");
    setDesignation("");
  };

  const handleEditEmployee = (employee) => {
    setEditId(employee.id);
    setName(employee.name);
    setDepartment(employee.department);
    setDesignation(employee.designation);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setName("");
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

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.department.toLowerCase().includes(search.toLowerCase())
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
      <section className="employee-form-section">
        <div className="section-heading">
          <h2>
            {editId !== null ? "Edit Employee" : "Add New Employee"}
          </h2>
          <p>Enter employee details below.</p>
        </div>

        <div className="employee-form">
          <div className="form-group">
            <label>Employee Name</label>
            <input
              type="text"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              placeholder="Enter designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button className="primary-btn" onClick={handleAddEmployee}>
              {editId !== null ? "Update Employee" : "+ Add Employee"}
            </button>

            {editId !== null && (
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Employee List */}
      <section className="employee-list-section">
        <div className="employee-list-heading">
          <div>
            <h2>Employee Directory</h2>
            <p>View and manage all employees.</p>
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search by name or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="employee-name">{employee.name}</td>
                    <td>{employee.department}</td>
                    <td>{employee.designation}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          employee.status === "Active" ? "status-active" : "status-leave"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEditEmployee(employee)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-message">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
