import React, { useState, useEffect } from 'react';
import { TaskAPI } from '../../api/task';
import { UserAPI } from '../../api/User';
import { EventAPI } from '../../api/event';
import { toast, ToastContainer } from 'react-toastify';

const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedTo, setAssignedTo] = useState(''); // Store the selected user ID
  const [status, setStatus] = useState('incomplete'); // Default status is 'incomplete'
  const [event, setEvent] = useState(''); // Store the selected event ID
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchUsersAndEvents = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch users
        const userResponse = await UserAPI.GetAllUsers(token);
        const userData = userResponse.data;
        if (Array.isArray(userData)) {
          const sortedUsers = userData.sort((a, b) =>
            a.firstName.localeCompare(b.firstName)
          );
          setUsers(sortedUsers);
        }

        // Fetch events
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        const userId = user ? user._id : null;
        const eventResponse = await EventAPI.GetMyEvent(token, userId);
        if (Array.isArray(eventResponse)) {
          const sortedEvents = eventResponse.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error('Error fetching users or events:', error);
        toast.error('Failed to load users or events');
      }
    };

    fetchUsersAndEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const createdBy = user ? user._id : null;
    const newTask = {
      title,
      description,
      deadline,
      assignedTo, // This will be the selected user ID
      status,
      eventId: event, // This will be the selected event ID
      createdBy,
    };

    const token = localStorage.getItem('token');

    try {
      const response = await TaskAPI.AddTask(newTask, token);
      if (response.status === 200) {
        console.log('Task added successfully');
        toast.success('Task added successfully');
        onAdd(newTask); // Call the onAdd function to refresh the task list
      } else {
        console.error(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 mb-10 w-full max-w-xl bg-white shadow-md rounded-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Event
        </label>
        <select
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          required
        >
          <option value="" disabled>
            Select an event
          </option>
          {events.map((eventItem) => (
            <option key={eventItem._id} value={eventItem._id}>
              {eventItem.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          rows="4"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Deadline
        </label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Assign To
        </label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          required
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          required
        >
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue hover:bg-blue-dark text-white px-6 py-3 rounded-lg"
      >
        Add Task
      </button>
      <ToastContainer />
    </form>
  );
};

export default AddTaskForm;
