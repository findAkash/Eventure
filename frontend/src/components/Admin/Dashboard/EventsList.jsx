// src/components/Admin/Dashboard/EventsList.js
import React from 'react';
import { FaMapMarkerAlt, FaCalendarDay } from 'react-icons/fa';

export default function EventsList({ events, title }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-medium text-gray-600 mb-4 flex items-center">
        <FaCalendarDay size={24} className="text-blue-500 mr-2" />
        {title}
      </h2>
      <ul className="divide-y divide-gray-200">
        {events.map((event) => (
          <li key={event._id} className="py-4 flex flex-col space-y-2">
            <div className="text-lg font-medium">{event.title}</div>
            <div className="text-sm text-gray-500">
              <FaCalendarDay size={16} className="inline text-gray-400 mr-1" />
              {new Date(event.dateTime).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-500">
              <FaMapMarkerAlt size={16} className="inline text-gray-400 mr-1" />
              {event.location}
            </div>
            <div className="flex space-x-2 mt-2">
              {event.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={event.title}
                  className="w-24 h-16 object-cover rounded-md shadow-sm"
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
