import React, { useState } from 'react';

const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilter(startDate, endDate);
  };

  return (
    <div className="flex items-center space-x-4">
      <div>
        <label htmlFor="start-date" className="text-gray-700">
          Start Date:
        </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-lg shadow-sm text-black ml-2"
        />
      </div>
      <div>
        <label htmlFor="end-date" className="text-gray-700">
          End Date:
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-lg shadow-sm text-black ml-2"
        />
      </div>
      <button
        onClick={handleFilter}
        className="bg-blue hover:bg-blue-dark text-white px-4 py-2 rounded-lg"
      >
        Filter
      </button>
    </div>
  );
};

export default DateFilter;
