import React from 'react';
import { Disclosure } from '@headlessui/react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import NavigationItems from './NavigationItems';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import { ToastContainer } from 'react-toastify';
import { Logo } from './Logo';
import { BellIcon, ChatIcon } from '@heroicons/react/outline';
import SearchBar from '../SearchBar';

const Navbar = ({ onSearch }) => {
  const location = useLocation();

  // Determine the current route
  const currentPath = location.pathname;

  const navigation = [
    { name: 'Home', href: '/home', current: currentPath === '/home' },
    {
      name: 'Events',
      href: '/my-events',
      current: currentPath === '/my-events',
    },
    { name: 'Tasks', href: '/task', current: currentPath === '/task' },
    { name: 'Reports', href: '/reports', current: currentPath === '/reports' },
    // Add more items as needed
  ];

  return (
    <Disclosure
      as="nav"
      className="bg-white bg-opacity-100 shadow-md fixed top-0 w-full z-50 p-2"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="relative flex h-16 items-center justify-between">
              <MobileMenu navigation={navigation} open={open} />
              <div className="flex flex-1 items-center justify-start space-x-4">
                <Logo /> {/* Custom logo component */}
                <NavigationItems navigation={navigation} />
                <SearchBar onSearch={onSearch} />
              </div>
              <div className="flex items-center space-x-4">
                {/* Notification Icon */}
                <button className="relative p-1 text-gray-600 hover:text-blue-600 focus:outline-none">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* Message Icon */}
                <button className="relative p-1 text-gray-600 hover:text-blue-600 focus:outline-none">
                  <ChatIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                <UserMenu />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
