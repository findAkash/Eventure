import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaTasks,
  FaUsers,
  FaSignOutAlt,
} from 'react-icons/fa';
import classNames from 'classnames';
import Logout from '../../auth/Logout';

const AdminSidebar = () => {
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: <FaTachometerAlt />,
      current: location.pathname === '/admin/dashboard',
    },
    {
      name: 'Events',
      href: '/admin/events',
      icon: <FaCalendarAlt />,
      current: location.pathname === '/admin/events',
    },
    {
      name: 'Tasks',
      href: '/admin/tasks',
      icon: <FaTasks />,
      current: location.pathname === '/admin/tasks',
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: <FaUsers />,
      current: location.pathname === '/admin/users',
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 flex flex-col">
      <div className="flex items-center justify-center py-6">
        <div className="text-2xl font-bold">Admin Panel</div>
      </div>
      <nav className="mt-8 flex-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              item.current ? 'bg-gray-700' : 'hover:bg-gray-600',
              'flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200'
            )}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="px-4 py-3 border-t border-gray-700">
        <Logout />
      </div>
    </div>
  );
};

export default AdminSidebar;
