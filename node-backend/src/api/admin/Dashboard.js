import { Router } from 'express';
import { handleAsyncRequest } from '../../helpers/handle-async-request.js';
import Event from '../../models/Event.js';
import Task from '../../models/Task.js';
import { User } from '../../models/User.js';

export class DashboardAPI {
  static instance() {
    const router = Router();
    router.get('/', getDashboardData);
    return router;
  }
}

// Helper function to get the dashboard data
const getDashboardData = handleAsyncRequest(async (req, res) => {
  // Fetch total number of events
  const totalEvents = await Event.countDocuments();

  // Fetch total number of tasks
  const totalTasks = await Task.countDocuments();

  // Fetch upcoming events
  const upcomingEvents = await Event.find({
    dateTime: { $gte: new Date() },
  }).countDocuments();

  // Fetch past events
  const pastEvents = await Event.find({
    dateTime: { $lt: new Date() },
  }).countDocuments();

  // Fetch incomplete tasks
  const incompleteTasks = await Task.find({
    status: 'incomplete',
  }).countDocuments();

  // Fetch completed tasks
  const completedTasks = await Task.find({
    status: 'completed',
  }).countDocuments();

  // Fetch total number of users
  const totalUsers = await User.countDocuments();

  // Fetch total number of admins
  const totalAdmins = await User.countDocuments({ role: 'Admin' });

  // Fetch upcoming events details
  const upcomingEventsList = await Event.find({
    dateTime: { $gte: new Date() },
  });

  // Fetch incomplete tasks details
  const incompleteTasksList = await Task.find({ status: 'incomplete' });

  return {
    success: true,
    data: {
      totalEvents,
      totalTasks,
      upcomingEvents,
      pastEvents,
      incompleteTasks,
      completedTasks,
      totalUsers,
      totalAdmins,
      upcomingEventsList,
      incompleteTasksList,
    },
  };
});
