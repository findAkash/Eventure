// src/components/Admin/Dashboard/TasksList.js
import React from 'react';
import { FaTasks, FaClock } from 'react-icons/fa';

export default function TasksList({ tasks, title }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-medium text-gray-600 mb-4 flex items-center">
        <FaTasks size={24} className="text-yellow-500 mr-2" />
        {title}
      </h2>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task._id} className="py-4 flex flex-col space-y-2">
            <div className="text-lg font-medium">{task.title}</div>
            <div className="text-sm text-gray-500">{task.description}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <FaClock size={16} className="text-gray-400 mr-1" />
              {new Date(task.deadline).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
