import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Nav/Navbar';
import HomePage from '../../components/User/Event/MainPage';
import DateFilter from '../../components/DateFilter';
import { EventAPI } from '../../api/event';
import { toast } from 'react-toastify';
import { FaCalendarAlt } from 'react-icons/fa';

export default function Home() {
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

      const response = await EventAPI.GetUpcomingEvents(token);
      setEvents(response);
      setFilteredEvents(response); // Initialize filtered events
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
      <Navbar onSearch={handleSearch} /> {/* Pass handleSearch to Navbar */}
      <div className="p-4 flex flex-col space-y-6 max-w-7xl mx-auto pt-20">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between mb-6">
            <h2 className="text-3xl font-bold text-blue-600 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-500" /> Upcoming Events
            </h2>
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
