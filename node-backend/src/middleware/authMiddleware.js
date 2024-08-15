import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { CONFIG } from '../../config/config.js';
import {
  handleAsyncRequest,
  APIError,
} from '../helpers/handle-async-request.js';

export const authMiddleware = (type) => async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    console.log('token = ', token);
    if (!token) {
      console.log('No token');
      throw new APIError(401, 'Please authenticate');
    }
    const cleanToken = token.replace('Bearer ', '');
    console.log('cleanToken = ', cleanToken);
    const decoded = jwt.verify(cleanToken, CONFIG.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      throw new APIError(401, 'Invalid token');
    }
    if (type === 'admin') {
      const admin = await User.findOne({
        _id: decoded.userId,
        role: 'Admin',
      });
      if (!admin) {
        throw new APIError(401, 'Admin not found');
      }
      req.user = admin;
    } else if (type === 'user') {
      const user = await User.findOne({
        _id: decoded.userId,
        role: 'User',
      });
      if (!user) {
        throw new APIError(401, 'User not found');
      }
      req.user = user;
    }
    next(); // Call next to pass control to the next middleware function
  } catch (error) {
    // Handle the error directly within the middleware
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
