import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Admin/Nav/Sidebar'; // Import the Sidebar component

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <Outlet /> {/* This will render the nested routes */}
      </main>
    </div>
  );
};

export default AdminLayout;
