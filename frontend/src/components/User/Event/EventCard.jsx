import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

  const descriptionPreview = () => {
    const words = event.description.split(' ');
    return words.length > 100
      ? `${words.slice(0, 100).join(' ')}...`
      : event.description;
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

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
      >
        {/* Event Image Carousel or Placeholder */}
        {event.images && event.images.length > 0 ? (
          <div className="relative">
            <img
              src={event.images[0]} // Display the first image
              alt="Event"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}

        {/* Event Details */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-gray-600">{formattedDate}</p>
              <p className="text-gray-600">{formattedTime}</p>
            </div>
            <div>
              <p className="text-gray-600">{event.location}</p>
              {event.charge && (
                <p className="text-gray-600">Charge: {event.charge}</p>
              )}
            </div>
            {showParticipants && (
              <div>
                <p className="text-gray-600">
                  Participants: {participantsDisplay()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Event Description */}
        <div className="mt-4">
          <p className="text-gray-600">{descriptionPreview()}</p>
        </div>

        {/* Edit/Delete Buttons */}
        {canModify && (
          <div className="mt-4 flex space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                handleOpenEditModal();
              }}
              className="bg-blue-dark text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                onDelete();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
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
    description: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    postedBy: PropTypes.string,
    charge: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  canModify: PropTypes.bool,
  showParticipants: PropTypes.bool,
};

export default EventCard;
