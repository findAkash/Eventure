import React from 'react';
import EventCard from '../User/Event/EventCard'; // Assuming you have an EventCard component

const MyPastEvents = ({ pastEvents }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">My Past Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => (
            <EventCard key={event.id} event={event} canModify={false} />
          ))
        ) : (
          <p className="text-gray-600">No past events to display.</p>
        )}
      </div>
    </div>
  );
};

export default MyPastEvents;
