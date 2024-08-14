import React, { useEffect, useState } from 'react';
import EventCard from '../../components/User/Event/EventCard';
import Navbar from '../../components/Nav/Navbar';
import { Outlet } from 'react-router-dom';
import AddEventForm from '../../components/User/Event/AddEventForm';
import { EventAPI } from '../../api/event';

const MyEventPage = () => {
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getMyEvents = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await EventAPI.GetMyEvent(token);
      console.log('GetMyEvent response:', response);

      // If response is an array, use it directly
      if (Array.isArray(response)) {
        setEvents(response);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (eventId) => {
    console.log('Edit event', eventId);
    // Implement the logic to edit the event
  };

  const handleDelete = (eventId) => {
    console.log('Delete event', eventId);
    // Implement the logic to delete the event
  };

  useEffect(() => {
    getMyEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 flex space-x-6 pt-20">
        <div className="flex-1 mx-auto max-w-7xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">My Events</h1>
            <button
              onClick={() => setShowAddEventForm(!showAddEventForm)}
              className="mb-6 bg-blue text-white px-4 py-2 rounded"
            >
              {showAddEventForm ? 'Cancel' : 'Add New Event'}
            </button>
            {showAddEventForm && <AddEventForm onAdd={handleAddEvent} />}

            {/* Loading and Error States */}
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.length > 0 ? (
                  events.map((event) => (
                    <EventCard
                      key={event.id || event._id} // Use the correct identifier
                      event={event}
                      canModify={true}
                      showParticipants={true}
                      onEdit={() => handleEdit(event.id || event._id)}
                      onDelete={() => handleDelete(event.id || event._id)}
                    />
                  ))
                ) : (
                  <div>No events found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default MyEventPage;
