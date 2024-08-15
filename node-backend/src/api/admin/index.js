import { DashboardAPI } from './Dashboard.js';
import express from 'express';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { UserAPI } from './User.js';
import { EventAPI } from './Event.js';
import { TaskAPI } from './Task.js';

export class AdminAPI {
  static instance() {
    const router = express.Router();
    router.use(authMiddleware('admin')); // Middleware to check admin role
    router.use('/dashboard', DashboardAPI.instance());
    router.use('/users', UserAPI.instance());
    router.use('/events', EventAPI.instance());
    router.use('/tasks', TaskAPI.instance());
    return router;
  }
}
