import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import EventModal from './EventModal';
import EditEventModal from './EditEventModal';

const EventCard = ({
  event,
  onEdit,
  onDelete,
  canModify = false,
  showParticipants = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const participantsDisplay = () => {
    if (event.participants.length > 3) {
      return `${event.participants.slice(0, 3).join(', ')}...`;
    }
    return event.participants.join(', ');
  };

  // Function to truncate description to words
  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 17
      ? words.slice(0, 17).join(' ') + '...'
      : description;
  };
  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSave = (updatedEvent) => {
    onEdit(updatedEvent); // Pass updated event data to parent
    handleCloseEditModal();
  };

  const handlePrevImage = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? event.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    setCurrentImageIndex((prevIndex) =>
      prevIndex === event.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full h-120 flex flex-col justify-between relative hover:shadow-lg transition-shadow duration-300"
      >
        {/* Event Image Carousel or Placeholder */}
        {event.images && event.images.length > 0 ? (
          <div className="relative">
            <img
              src={event.images[currentImageIndex]} // Display the current image
              alt="Event"
              className="w-full h-full max-h-50 object-cover rounded-lg"
            />
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-gray-800 rounded-full p-2"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-gray-800 rounded-full p-2"
            >
              <FaChevronRight />
            </button>
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}

        {/* Event Details */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="flex items-center text-gray-600">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <span>{event.location}</span>
            </div>
            {event.charge && (
              <div className="flex items-center text-gray-600">
                <span>Charge: {event.charge}</span>
              </div>
            )}
          </div>
        </div>

        {/* Participants */}
        <div className="mt-4">
          {showParticipants && (
            <div className="flex items-center text-gray-600">
              <FaUsers className="text-gray-500 mr-2" />
              <span>Participants: {participantsDisplay()}</span>
            </div>
          )}
        </div>

        {/* Event Description */}
        <p className="text-gray-600 mb-4 overflow-hidden">
          {truncateDescription(event.description)}
        </p>

        {/* Edit/Delete Buttons */}
        <div className="mt-7">
          {canModify && (
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card click
                  handleOpenEditModal();
                }}
                className="bg-blue hover:bg-blue-dark text-white px-3 py-1 rounded-lg flex items-center"
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card click
                  onDelete(event.id || event._id);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center"
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Event Details Modal */}
      {showModal && (
        <EventModal
          event={event}
          onClose={handleCloseModal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}

      {/* Edit Event Modal */}
      {showEditModal && (
        <EditEventModal
          event={event}
          onClose={handleCloseEditModal}
          onSave={handleSave}
        />
      )}
    </>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    participants: PropTypes.arrayOf(PropTypes.string),
    charge: PropTypes.string,
  }).isRequired,
  canModify: PropTypes.bool,
  showParticipants: PropTypes.bool,
};

export default EventCard;
