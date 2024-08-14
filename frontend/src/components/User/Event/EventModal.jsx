import React, { useState } from 'react';

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
        <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>

        {event.images && event.images.length > 0 && (
          <div className="relative">
            <img
              src={event.images[currentImageIndex]}
              alt="Event"
              className="w-full h-64 object-cover rounded-lg"
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

        <p className="mt-4 text-gray-600">Date: {formattedDate}</p>
        <p className="text-gray-600">Time: {formattedTime}</p>
        <p className="text-gray-600">Location: {event.location}</p>
        {event.charge && (
          <p className="text-gray-600">Charge: {event.charge}</p>
        )}
        <p className="mt-4 text-gray-600">{event.description}</p>

        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={() => {
              onEdit();
              onClose();
            }}
            className="bg-blue-dark text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
