import React from 'react';
import { Link } from 'react-router-dom';
import AboutSection from './AboutUs';

const PublicHomePage = () => {
  return (
    <div className="font-sans antialiased min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        id="home"
        name="home"
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1437243964124-5379b751d09a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-40">
          <div className="text-center text-white px-6 py-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Our Platform
            </h1>
            <p className="text-lg mb-8">
              Discover the best events, manage your tasks, and generate
              insightful reports.
            </p>
            <a
              href="/signup"
              className="bg-blue-dark text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="home" name="home" className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1664910272814-985e03655616?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature 1"
                className="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Manage Events</h3>
              <p className="text-gray-700">
                Description of the first feature highlighting its benefits and
                how it stands out.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <img
                src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature 2"
                className="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Manage Task</h3>
              <p className="text-gray-700">
                Description of the second feature explaining its advantages and
                unique aspects.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <img
                src="https://images.unsplash.com/photo-1495594059084-33752639b9c3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature 3"
                className="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-700">
                Description of the third feature detailing its key
                functionalities and benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
          <div className="mt-4">
            <Link
              to="/public/about"
              className="text-gray-400 hover:text-white mx-2"
            >
              About
            </Link>
            <Link
              to="/public/contact"
              className="text-gray-400 hover:text-white mx-2"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHomePage;
