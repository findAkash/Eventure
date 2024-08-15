import React, { useState } from 'react';
import {
  FaTimes,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
  FaPen,
  FaTrash,
} from 'react-icons/fa';

const EventModal = ({ event, onClose, onEdit, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract date and time from event.dateTime
  const dateTime = new Date(event.dateTime);
  const formattedDate = dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (event.images ? event.images.length - 1 : 0)
        ? 0
        : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0
        ? event.images
          ? event.images.length - 1
          : 0
        : prevIndex - 1
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: 1000 }} // Ensure high z-index to be on top
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full relative"
        style={{ zIndex: 1001 }} // Ensure high z-index to be on top of the overlay
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-2xl" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h2>

        {event.images && event.images.length > 0 && (
          <div className="relative mb-4">
            <img
              src={event.images[currentImageIndex]}
              alt="Event"
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-between text-white text-xl font-semibold bg-black bg-opacity-30 rounded-lg">
              <button
                onClick={prevImage}
                className="bg-blue-600 p-2 rounded-lg ml-2"
              >
                &lt;
              </button>
              <button
                onClick={nextImage}
                className="bg-blue-600 p-2 rounded-lg mr-2"
              >
                &gt;
              </button>
            </div>
          </div>
        )}

        <div className="mb-4">
          <p className="text-gray-600 mb-2 flex items-center">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <strong>Date:</strong> {formattedDate}
          </p>
          <p className="text-gray-600 mb-2 flex items-center">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <strong>Time:</strong> {formattedTime}
          </p>
          <p className="text-gray-600 mb-2 flex items-center">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <strong>Location:</strong> {event.location}
          </p>
          {event.charge && (
            <p className="text-gray-600 mb-2 flex items-center">
              <FaDollarSign className="text-gray-500 mr-2" />
              <strong>Charge:</strong> {event.charge}
            </p>
          )}
          <p className="text-gray-600">{event.description}</p>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={() => {
              onEdit();
              onClose();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPen className="mr-1" /> Edit
          </button>
          {/* <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
          > */}
          {/* <FaTrash className="mr-1" /> Delete
          </button> */}
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
