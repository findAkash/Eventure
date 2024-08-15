// src/pages/UserPage.js
import React, { useEffect, useState } from 'react';
import { FaEdit, FaLock, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AdminAPI } from '../../api/Admin';
import UserEditModal from '../../components/Admin/User/UserEditModal';
import ResetPasswordModal from '../../components/Admin/User/ResetPasswordModal';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await AdminAPI.GetAllUsers(token);
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setIsResetPasswordModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await AdminAPI.DeleteUserByAdmin(id, localStorage.getItem('token'));
      setUsers(users.filter((user) => user._id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start space-y-4"
          >
            <div className="flex-1">
              <h2 className="text-xl font-medium text-gray-700">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-500">Email: {user.email}</p>
              <p className="text-sm text-gray-500">Role: {user.role}</p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-blue hover:bg-blue-dark text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              <button
                onClick={() => handleResetPassword(user)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaLock className="mr-2" /> Reset Password
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaTrashAlt className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {selectedUser && (
        <>
          <UserEditModal
            user={selectedUser}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={fetchUsers} // Refresh user list
          />
          <ResetPasswordModal
            user={selectedUser}
            isOpen={isResetPasswordModalOpen}
            onClose={() => setIsResetPasswordModalOpen(false)}
          />
        </>
      )}
    </div>
  );
}
