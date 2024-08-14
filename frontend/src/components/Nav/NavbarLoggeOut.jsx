import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Logo } from './Logo';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleNavClick = (path, section) => {
    if (currentPath === path) {
      // Scroll within the same page
      ScrollLink.scrollTo(section, {
        duration: 500,
        smooth: true,
        offset: -70, // Adjust this to fit your navbar height
      });
    } else {
      // Navigate to the target page, then scroll
      navigate(path);
      setTimeout(() => {
        document.getElementById(section).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100); // Delay to ensure the page has loaded before scrolling
    }
  };

  const isActive = (section) => {
    // Check if the section is in view on the current page
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }
    return false;
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white bg-opacity-100 shadow-md fixed top-0 w-full z-50 p-2"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-start space-x-4">
                <Logo /> {/* Custom logo component */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-6">
                    <button
                      onClick={() => handleNavClick('/public/home', 'home')}
                      className={`${
                        isActive('home')
                          ? 'bg-blue-dark text-white'
                          : 'text-gray-900'
                      } hover:bg-blue-dark hover:text-white rounded-md px-4 py-2 text-sm font-medium transition`}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => handleNavClick('/public/home', 'about')}
                      className={`${
                        isActive('about')
                          ? 'bg-blue-dark text-white'
                          : 'text-gray-900'
                      } hover:bg-blue-dark hover:text-white rounded-md px-4 py-2 text-sm font-medium transition`}
                    >
                      About
                    </button>
                    {/* Add more buttons as needed */}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Login and Signup Buttons */}
                <Link
                  to="/login"
                  className="text-gray-900 hover:bg-blue-dark hover:text-white rounded-md px-4 py-2 text-sm font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-900 hover:bg-blue-dark hover:text-white rounded-md px-4 py-2 text-sm font-medium transition"
                >
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
