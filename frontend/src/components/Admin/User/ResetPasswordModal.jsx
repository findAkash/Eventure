// src/components/ResetPasswordModal.js
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AdminAPI } from '../../../api/Admin';

export default function ResetPasswordModal({ user, isOpen, onClose }) {
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AdminAPI.ResetUserPassword(user._id, { newPassword });
      toast.success('Password reset successfully');
      onClose(); // Close the modal
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded-lg w-full px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
