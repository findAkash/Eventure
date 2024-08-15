import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EventAPI } from '../../../api/event';

const EditEventModal = ({ event, onClose, onSave }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [dateTime, setDateTime] = useState(event.dateTime);
  const [location, setLocation] = useState(event.location);
  const [participants, setParticipants] = useState([...event.participants]);
  const [newParticipant, setNewParticipant] = useState('');
  const [images, setImages] = useState([...event.images]);
  const [newImage, setNewImage] = useState('');

  const handleSave = async () => {
    const updatedEvent = {
      ...event,
      title,
      description,
      dateTime,
      location,
      participants,
      images,
    };
    const token = localStorage.getItem('token');

    try {
      const response = await EventAPI.UpdateEvent(
        event.id,
        updatedEvent,
        token
      );
      if (response.status === 200) {
        toast.success('Event updated successfully');

        setTimeout(() => {
          onSave(updatedEvent); // Close the modal
        }, 700); // 500ms delay before closing the modal      } else {
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const handleAddParticipant = () => {
    if (newParticipant.trim() !== '') {
      setParticipants([...participants, newParticipant.trim()]);
      setNewParticipant('');
    }
  };

  const handleRemoveParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  const handleAddImage = () => {
    if (newImage.trim() !== '') {
      setImages([...images, newImage.trim()]);
      setNewImage('');
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Event</h2>

        {/* Event Title */}
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Event Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>

        {/* Event Date and Time */}
        <div className="mb-4">
          <label className="block text-gray-700">Date & Time:</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Event Location */}
        <div className="mb-4">
          <label className="block text-gray-700">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Event Participants */}
        <div className="mb-4">
          <label className="block text-gray-700">Participants:</label>
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              placeholder="Add participant"
              className="w-full p-2 border border-gray-300 rounded mr-2"
            />
            <button
              onClick={handleAddParticipant}
              className="bg-blue hover:bg-blue-dark text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          <ul className="list-disc pl-5">
            {participants.map((participant, index) => (
              <li key={index} className="flex justify-between items-center">
                {participant}
                <button
                  onClick={() => handleRemoveParticipant(index)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Event Images */}
        <div className="mb-4">
          <label className="block text-gray-700">Images:</label>
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Add image URL"
              className="w-full p-2 border border-gray-300 rounded mr-2"
            />
            <button
              onClick={handleAddImage}
              className="bg-blue hover:bg-blue-dark text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          <ul className="list-disc pl-5">
            {images.map((image, index) => (
              <li key={index} className="flex justify-between items-center">
                <img
                  src={image}
                  alt={`Event Image ${index + 1}`}
                  className="w-24 h-16 object-cover rounded"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue hover:bg-blue-dark text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

EditEventModal.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditEventModal;
