import React from 'react';

const FilterBar = ({ onSort }) => {
  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="sort" className="text-gray-700">
        Sort by Date:
      </label>
      <select
        id="sort"
        onChange={handleSortChange}
        className="p-2 border rounded-lg shadow-sm text-black"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default FilterBar;
