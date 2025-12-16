const StatusFilter = ({ statusFilter, setStatusFilter, onFilterChange }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    onFilterChange(value);
  };

  return (
    <select
      value={statusFilter}
      onChange={handleChange}
      className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
    >
      <option value="">All Statuses</option>
      <option value="OPEN">Open</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="DONE">Done</option>
    </select>
  );
};

export default StatusFilter;
