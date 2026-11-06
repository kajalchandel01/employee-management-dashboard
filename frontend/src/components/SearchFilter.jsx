
const SearchFilter = ({
  search,
  setSearch,
  selectedDepartment,
  setSelectedDepartment,
  employees,
  setCurrentPage
}) => {
  const departments = [
    ...new Set(employees.map((employee) => employee.department))
  ];

  const handleClearFilters = () => {
    setSearch("");
    setSelectedDepartment("All");
    setCurrentPage(1);
  };

  return (
    <div className="search-filter">

      {/* Search Input */}
      <input
        className="search-input"
        type="text"
        placeholder="Search by name or department..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Department Filter */}
      <select
        className="search-input department-filter"
        value={selectedDepartment}
        onChange={(e) => {
          setSelectedDepartment(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="All">All Departments</option>

        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      {/* Clear Filters */}
      <button
        type="button"
        className="cancel-btn clear-filter-btn"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>

    </div>
  );
};

export default SearchFilter;
