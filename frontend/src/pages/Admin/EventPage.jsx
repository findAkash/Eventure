import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Nav/Navbar';
import HomePage from '../../components/User/Event/MainPage';
import DateFilter from '../../components/DateFilter';
import { AdminAPI } from '../../api/Admin';
import { toast } from 'react-toastify';
import { FaCalendarAlt } from 'react-icons/fa';
import SearchBar from '../../components/SearchBar';

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getEvents = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Authentication token is missing. Please log in.');
        return;
      }

      const response = await AdminAPI.GetAllEventsByAdmin(token);
      const data = response.data;
      console.log('this is from event page = ', data);
      setEvents(data);
      setFilteredEvents(data); // Initialize filtered events
    } catch (error) {
      toast.error('Failed to load events. Please try again later.');
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events); // Reset to original events if search term is cleared
    }
  };

  const handleFilterByDate = (startDate, endDate) => {
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.dateTime);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return eventDate >= start && eventDate <= end;
      } else if (start) {
        return eventDate >= start;
      } else if (end) {
        return eventDate <= end;
      }
      return true;
    });

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div className="ml-64 p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between mb-6">
            <h2 className="text-3xl font-bold text-blue-600 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-500" /> Events
            </h2>
            <SearchBar onSearch={handleSearch} />
            {/* You can add other controls like a "View All" button here if needed */}
            <DateFilter onFilter={handleFilterByDate} />{' '}
            {/* Add DateFilter here */}
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <HomePage events={filteredEvents} />
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
