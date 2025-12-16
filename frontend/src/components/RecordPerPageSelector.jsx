const RecordsPerPageSelector = ({ limit, setLimit, onLimitChange }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setLimit(value);
    onLimitChange(value);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-slate-600 whitespace-nowrap">Show:</label>
      <select
        value={limit}
        onChange={handleChange}
        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

export default RecordsPerPageSelector;
