import express from 'express';
import { User } from '../../models/User.js';
import { handleAsyncRequest } from '../../helpers/handle-async-request.js';

export class UserAPI {
  static instance() {
    const router = express.Router();
    router.get('/', getAllUsers);
    router.put('/reset-password/:id', resetPassword);
    router.put('/:id', updateUser);
    router.delete('/:id', deleteUser);
    return router;
  }
}

const deleteUser = handleAsyncRequest(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return { success: true, message: 'User deleted successfully' };
});

const updateUser = handleAsyncRequest(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new APIError(404, 'User not found');
  }
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedUser) {
    throw new APIError(500, 'Failed to update user');
  }
  return {
    success: true,
    data: updatedUser,
  };
});

const resetPassword = handleAsyncRequest(async (req, res) => {
  const { userId } = req.paras.id;
  const { newPassword } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new APIError(404, 'User not found');
  }
  user.password = newPassword;
  await user.save();
  return { success: true, message: 'Password reset successfully' };
});

const getAllUsers = handleAsyncRequest(async (req, res) => {
  const users = await User.find();
  // remove yourself from the list
  const filteredUsers = users.filter((user) => user._id !== req.user._id);
  return {
    success: true,
    data: filteredUsers,
  };
});
