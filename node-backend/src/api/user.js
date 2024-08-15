import { Router } from 'express';
import {
  handleAsyncRequest,
  APIError,
} from '../helpers/handle-async-request.js';
import { User } from '../models/User.js';
import UserSession from '../models/Session.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export class UserAPI {
  static instance() {
    const router = Router();
    router.post('/', createUser);
    router.post('/login', loginUser);
    router.get('/logout', logoutUser);
    router.use(authMiddleware('user'));
    router.get('/my-details', getMyDetails);
    router.get('/', getAllUsers);
    router.put('/password', changePassword);
    router.put('/update-myprofile', updateMyProfile);
    return router;
  }
}

const updateMyProfile = handleAsyncRequest(async (req, res) => {
  const response = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  console.log(response);
  return {
    success: true,
    data: response,
  };
});

const changePassword = handleAsyncRequest(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new APIError(404, 'User not found');
  }
  const { currentPassword, newPassword } = req.body;
  console.log(currentPassword, newPassword);
  const isMatch = await user.comparePassword(newPassword);
  if (isMatch) {
    throw new APIError(
      400,
      'New password cannot be the same as the old password'
    );
  }
  const currentPasswordMatch = await user.comparePassword(currentPassword);
  if (!currentPasswordMatch) {
    throw new APIError(400, 'Current password is incorrect');
  }
  user.password = newPassword;
  await user.save();
  return { success: true, message: 'Password changed successfully' };
});

const getAllUsers = handleAsyncRequest(async (req, res) => {
  const users = await User.find();
  console.log('users = ', users);
  return {
    success: true,
    data: users.map((user) => user.toJSON()),
  };
});

const getMyDetails = handleAsyncRequest(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new APIError(404, 'User not found');
  }
  return {
    success: true,
    data: user.toJSON(),
  };
});

const createUser = handleAsyncRequest(async (req, res) => {
  const isExist = await User.findOne({ email: req.body.email });
  if (isExist) {
    throw new APIError(400, 'User already exists');
  }
  const user = new User(req.body);
  await user.save();
  return { success: true, message: 'Sign-Up completed' };
});

const loginUser = handleAsyncRequest(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new APIError(400, 'Invalid email or password');
  }

  // Save session
  const session = new UserSession({
    userId: user._id,
    accessToken: user.generateAccessToken(user._id),
    refreshToken: user.generateRefreshToken(user._id),
    deviceInfo: {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      deviceType: req.device.type, // Use express-device or similar to get device type
    },
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiration
  });
  await session.save();
  return {
    success: true,
    message: 'Login successful',
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    user: user.toJSON(),
  };
});

const logoutUser = handleAsyncRequest(async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  // Delete the session associated with the access token
  await UserSession.findOneAndDelete({ accessToken: token });

  return { success: true, message: 'Logged out successfully' };
});
