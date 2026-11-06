
const EmployeeTable = ({
  employees,
  handleEditEmployee,
  handleDeleteEmployee,
  handleStatusChange
}) => {
  return (
    <div className="table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td className="employee-name">
                  {employee.name}
                </td>

                <td>{employee.email || "-"}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>

                <td>
                  <select
                    className={`status-select ${
                      employee.status === "Active"
                        ? "status-active"
                        : "status-leave"
                    }`}
                    value={employee.status}
                    onChange={(e) =>
                      handleStatusChange(employee.id, e.target.value)
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </td>

                <td>
                  <div className="table-actions">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleEditEmployee(employee)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
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
              <td colSpan="6" className="empty-message">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
