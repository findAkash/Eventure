import React from 'react';
import PropTypes from 'prop-types';
import {
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaRegClock,
  FaClipboardList,
} from 'react-icons/fa';

const TaskModal = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-2xl" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">{task.title}</h2>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2 flex items-center">
            <FaClipboardList className="text-gray-400 mr-2" />
            <strong className="text-gray-700">Event:</strong> {task.eventTitle}
          </p>
          <p className="text-gray-600 mb-4">{task.description}</p>
        </div>

        <div className="mb-4">
          <p className="flex items-center mb-2">
            <FaUser className="text-gray-500 mr-2" />
            <strong>Assigned To:</strong> {task.assignedToFullName}
          </p>
          <p className="flex items-center mb-2">
            <FaRegClock className="text-gray-500 mr-2" />
            <strong>Status:</strong> {task.status}
          </p>
        </div>

        <p className="flex items-center mb-2">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <strong>Deadline:</strong>{' '}
          {new Date(task.deadline).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};

TaskModal.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    eventTitle: PropTypes.string,
    description: PropTypes.string.isRequired,
    assignedToFullName: PropTypes.string,
    status: PropTypes.string,
    deadline: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaskModal;
