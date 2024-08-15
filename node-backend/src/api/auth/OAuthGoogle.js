import express from 'express';
import {
  handleAsyncRequest,
  APIError,
} from '../../helpers/handle-async-request.js';
import { User } from '../../models/User.js';
import UserSession from '../../models/Session.js';

export class OAuthGoogleAPI {
  static instance() {
    const router = express.Router();
    router.post('/google', googleAuth);
    return router;
  }
}

const googleAuth = handleAsyncRequest(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.data.email });
    console.log(user);
    if (!user) {
      const user = new User({
        firstName: req.body.data.given_name,
        lastName: req.body.data.family_name,
        email: req.body.data.email,
      });
      await user.save();
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
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Error logging in',
    };
  }
});
