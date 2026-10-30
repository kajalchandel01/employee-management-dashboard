import SummaryCard from "../components/SummaryCard";
import { useState } from "react";
const Dashboard = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([
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
]);
  return (
    <div>
      <h1>Dashboard Overview</h1>

      <div className="dashboard-cards">
        <SummaryCard title="Total Employees" value={120}   color="#DCFCE7"/>
        <SummaryCard title="Active Employees" value={100}  color="#FEF3C7"/>
        <SummaryCard title="On Leave" value={10}   color="#EDE9FE"/>
        <SummaryCard title="Departments" value={5} />
      </div>
      <h2>Employee List</h2>
      <h2>Add New Employee</h2>

<input
  type="text"
  placeholder="Employee Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<input
  type="text"
  placeholder="Department"
   value={department}
  onChange={(e) => setDepartment(e.target.value)}
/>

<input
  type="text"
  placeholder="Designation"
   value={designation}
  onChange={(e) => setDesignation(e.target.value)}
/>

<button>Add Employee</button>
      <input
  type="text"
  placeholder="Search employee..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<ul>
    {employees
    .filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase())
    )
  .map((employee) => (
    <li key={employee.id}>
      <h3>{employee.name}</h3>
      <p>{employee.department}</p>
    </li>
  ))}
</ul>
    </div>
  );
};

export default Dashboard;