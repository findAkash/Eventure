import React, { useState } from 'react';
import { API } from '../../../api/api';
import { EventAPI } from '../../../api/event';
import { toast, ToastContainer } from 'react-toastify';

const AddEventForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState(['']);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState(['']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine date and time into a single LocalDateTime string
    const dateTime = `${date}T${time}:00`; // Adds seconds to the time

    const newEvent = {
      title,
      images,
      dateTime, // Send combined date and time
      location,
      description,
      participants,
    };
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const userId = user ? user._id : null;
    const token = localStorage.getItem('token');
    newEvent.postedBy = userId;

    try {
      const response = await EventAPI.AddEvent(newEvent, token);
      if (response.status === 200) {
        console.log('Event added successfully');
        toast.success('Event added successfully');
        onAdd(newEvent); // Call the onAdd function to refresh the event list
      } else {
        console.error(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 mb-10 w-full max-w-xl bg-white shadow-md rounded-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Add New Event</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Images (URLs)</label>
        {images.map((image, index) => (
          <input
            key={index}
            type="text"
            value={image}
            onChange={(e) => {
              const newImages = [...images];
              newImages[index] = e.target.value;
              setImages(newImages);
            }}
            className="w-full p-2 border rounded mb-2"
            placeholder={`Image URL ${index + 1}`}
          />
        ))}
        <button
          type="button"
          onClick={() => setImages([...images, ''])}
          className="text-blue hover:bg-blue-dark"
        >
          Add Another Image
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Participants</label>
        {participants.map((participant, index) => (
          <input
            key={index}
            type="text"
            value={participant}
            onChange={(e) => {
              const newParticipants = [...participants];
              newParticipants[index] = e.target.value;
              setParticipants(newParticipants);
            }}
            className="w-full p-2 border rounded mb-2"
            placeholder={`Participant ${index + 1}`}
          />
        ))}
        <button
          type="button"
          onClick={() => setParticipants([...participants, ''])}
          className="text-blue hover:bg-blue-dark"
        >
          Add Another Participant
        </button>
      </div>
      <button
        type="submit"
        className="bg-blue hover:bg-blue-dark text-white px-4 py-2 rounded"
      >
        Add Event
      </button>
      <ToastContainer />
    </form>
  );
};

export default AddEventForm;
