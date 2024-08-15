import React, { useState } from 'react';
import {
  FaUser,
  FaCalendarAlt,
  FaRegClock,
  FaClipboardList,
  FaPen,
  FaTrash,
  FaEye,
} from 'react-icons/fa';
import EditTaskModal from './EditTaskModal'; // Import the EditTaskModal component
import TaskModal from './TaskModal'; // Import the TaskModal component
import { toast } from 'react-toastify';
import { TaskAPI } from '../../api/task';

const TaskCard = ({ task, onEdit, onDelete, canModify = true }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const _ = localStorage.getItem('user');
  const user = _ ? JSON.parse(_) : null;
  const currentUserId = user ? user._id : null;

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const response = await TaskAPI.DeleteTask(task.id, token);
    if (response.status === 204) {
      toast.success('Task deleted successfully');
      setTimeout(() => {
        onDelete(task.id);
      }, 700);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const handleSave = (updatedTask) => {
    if (onEdit) {
      onEdit(updatedTask);
    } else {
      console.error('onEdit is not a function');
    }
    setShowEditModal(false);
  };

  // Function to truncate description to words
  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 17
      ? words.slice(0, 17).join(' ') + '...'
      : description;
  };

  return (
    <>
      <div
        onClick={() => setShowDetailModal(true)}
        className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-full h-64 flex flex-col justify-between relative cursor-pointer"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {task.title}
          </h2>

          <p className="text-sm text-gray-500 mb-2 flex items-center">
            <FaClipboardList className="text-gray-400 mr-2" />
            <strong className="text-gray-700">Event:</strong> {task.eventTitle}
          </p>

          <p className="text-gray-600 mb-4 overflow-hidden">
            {truncateDescription(task.description)}
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="flex items-center">
              <FaUser className="text-gray-500 mr-2" />
              <strong>Assigned To:</strong> {task.assignedToFullName}
            </p>
            <p className="flex items-center">
              <FaRegClock className="text-gray-500 mr-2" />
              <strong>Status:</strong>{' '}
              <span className="uppercase">{task.status}</span>
            </p>
          </div>

          <p className="flex items-center">
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
        {canModify && (
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                handleEdit();
              }}
              className="bg-blue text-white px-3 py-1 rounded hover:bg-blue-dark flex items-center"
            >
              <FaPen className="mr-1" /> Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                handleDelete();
              }}
              disabled={task.createdBy !== currentUserId}
              className={`px-3 py-1 rounded flex items-center ${
                task.createdBy !== currentUserId
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              <FaTrash className="mr-1" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditTaskModal
          task={task}
          onSave={handleSave}
          onClose={handleCloseEditModal}
        />
      )}

      {/* Task Detail Modal */}
      {showDetailModal && (
        <TaskModal task={task} onClose={handleCloseDetailModal} />
      )}
    </>
  );
};

export default TaskCard;
