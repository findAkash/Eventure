import { Router } from 'express';
import {
  handleAsyncRequest,
  APIError,
} from '../helpers/handle-async-request.js';
import { User } from '../models/User.js';
import UserSession from '../models/Session.js';

export class UserAPI {
  static instance() {
    const router = Router();
    router.post('/', createUser);
    router.post('/login', loginUser);
    router.get('/logout', logoutUser);
    // router.get('/checkToken', checkToken);
    return router;
  }
}

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
  await Session.findOneAndDelete({ accessToken: token });

  return { success: true, message: 'Logged out successfully' };
});
