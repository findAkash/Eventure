import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TaskAPI } from '../../api/task';

const EditTaskModal = ({ task, onSave, onClose }) => {
  const [editableTask, setEditableTask] = useState(task);

  useEffect(() => {
    setEditableTask(task);
  }, [task]);

  const formatDateForInput = (date) => {
    const d = new Date(date);
    return d.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
  };

  const parseDateFromInput = (inputValue) => {
    return new Date(inputValue).toISOString(); // Converts to ISO format
  };

  const handleChange = (e) => {
    setEditableTask({
      ...editableTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    editableTask.deadline = parseDateFromInput(editableTask.deadline);
    console.log('Updating task:', editableTask);
    try {
      const response = await TaskAPI.UpdateTask(task.id, editableTask, token);
      if (response.status === 200) {
        toast.success('Task updated successfully');
        setTimeout(() => {
          onSave(editableTask); // Pass updated task to parent
          onClose(); // Close the modal
        }, 700); // 700ms delay before closing the modal
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-xl font-bold mb-4">Edit Task</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={editableTask.title}
            onChange={handleChange}
            placeholder="Title"
            className="border rounded p-2 w-full"
          />
          <textarea
            name="description"
            value={editableTask.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            name="assignedTo"
            value={editableTask.assignedToFullName}
            onChange={handleChange}
            placeholder="Assigned To"
            className="border rounded p-2 w-full"
            disabled
          />
          <input
            type="text"
            name="eventId"
            value={editableTask.eventTitle}
            onChange={handleChange}
            placeholder="Event"
            className="border rounded p-2 w-full"
            disabled
          />
          <input
            type="text"
            name="status"
            value={editableTask.status}
            onChange={handleChange}
            placeholder="Status"
            className="border rounded p-2 w-full"
          />
          <input
            type="datetime-local"
            name="deadline"
            value={formatDateForInput(editableTask.deadline)}
            onChange={handleChange}
            placeholder="Deadline"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue hover:bg-blue-dark text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
