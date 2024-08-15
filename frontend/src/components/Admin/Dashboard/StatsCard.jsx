// src/components/Admin/Dashboard/StatsCard.js
import React from 'react';
import {
  FaCalendarAlt,
  FaTasks,
  FaUsers,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdEventAvailable, MdEventNote } from 'react-icons/md';

const iconMap = {
  'Total Events': <MdEventAvailable size={24} className="text-blue-500" />,
  'Upcoming Events': (
    <AiOutlineClockCircle size={24} className="text-green-500" />
  ),
  'Past Events': <MdEventNote size={24} className="text-red-500" />,
  'Incomplete Tasks': (
    <FaExclamationCircle size={24} className="text-yellow-500" />
  ),
  'Completed Tasks': <FaCheckCircle size={24} className="text-green-500" />,
  'Total Users': <FaUsers size={24} className="text-purple-500" />,
  'Total Admins': <FaUsers size={24} className="text-gray-500" />,
};

export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
      <div className="text-2xl">{iconMap[title]}</div>
      <div>
        <h2 className="text-xl font-medium text-gray-600">{title}</h2>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
