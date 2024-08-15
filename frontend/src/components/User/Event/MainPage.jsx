import React, { useState } from 'react';
import EventCard from './EventCard';
import { FaCalendarAlt } from 'react-icons/fa'; // Importing a calendar icon from FontAwesome

const HomePage = ({ events }) => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    showPersonal: false,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };

  console.log('Events:', events);
  return (
    <div className="flex space-x-6">
      {/* Event Container */}
      <div className="flex-1 mx-auto max-w-7xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
