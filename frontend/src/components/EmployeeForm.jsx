const EmployeeForm = ({
  name,
  setName,
  email,
  setEmail,
  department,
  setDepartment,
  designation,
  setDesignation,
  handleAddEmployee,
  editId,
  handleCancelEdit
}) => {
  return (
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
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
  );
};

export default EmployeeForm;