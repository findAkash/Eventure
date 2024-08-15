import React, { useEffect, useState } from 'react';
import EventCard from '../../components/User/Event/EventCard';
import Navbar from '../../components/Nav/Navbar';
import DateFilter from '../../components/DateFilter'; // Import DateFilter
import { Outlet } from 'react-router-dom';
import AddEventForm from '../../components/User/Event/AddEventForm';
import { EventAPI } from '../../api/event';
import { toast } from 'react-toastify';

const MyEventPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getMyEvents = async (callback) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const userId = user ? user._id : null;
      const response = await EventAPI.GetMyEvent(token, userId);
      console.log('GetMyEvent response:', response);

      if (Array.isArray(response)) {
        setEvents(response);
        setFilteredEvents(response); // Initialize filtered events
        if (callback) callback(); // Execute the callback after events are loaded
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setFilteredEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await EventAPI.DeleteEvent(eventId, token);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
      setFilteredEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
      toast.success('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
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
    getMyEvents();
  }, []);

  return (
    <>
      <Navbar onSearch={handleSearch} /> {/* Pass handleSearch to Navbar */}
      <div className="p-4 flex flex-col space-y-6 max-w-7xl mx-auto pt-20">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">My Events</h1>
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setShowAddEventForm(!showAddEventForm)}
              className="bg-blue hover:bg-blue-dark text-white px-4 py-2 rounded"
            >
              {showAddEventForm ? 'Cancel' : 'Add New Event'}
            </button>
            <DateFilter onFilter={handleFilterByDate} />{' '}
            {/* Add DateFilter here */}
          </div>
          {showAddEventForm && (
            <AddEventForm
              onAdd={() => getMyEvents(() => setShowAddEventForm(false))}
            />
          )}

          {/* Loading and Error States */}
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard
                    key={event.id || event._id} // Use the correct identifier
                    event={event}
                    canModify={true}
                    showParticipants={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <div>No events found.</div>
              )}
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default MyEventPage;
