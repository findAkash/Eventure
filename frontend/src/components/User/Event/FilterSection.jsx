import React, { useState } from 'react';

const FilterSection = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showPersonal, setShowPersonal] = useState(false);

  const handleFilterChange = () => {
    onFilterChange({
      startDate,
      endDate,
      showPersonal,
    });
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md py-1 px-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md py-1 px-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={showPersonal}
          onChange={(e) => setShowPersonal(e.target.checked)}
          className="mr-2 h-4 w-4 text-blue-600"
        />
        <label className="text-sm font-medium text-gray-600">
          Show Personal Events
        </label>
      </div>
      <button
        onClick={handleFilterChange}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterSection;
