import express from 'express';
import { handleAsyncRequest } from '../../helpers/handle-async-request.js';
import Task from '../../models/Task.js';
export class TaskAPI {
  static instance() {
    const router = express.Router();
    router.get('/', getAllTasks);
    // router.get('/:id', this.getTaskById);
    // router.post('/', this.createTask);
    // router.put('/:id', this.updateTask);
    // router.delete('/:id', this.deleteTask);
    return router;
  }
}

const getAllTasks = handleAsyncRequest(async (req, res) => {
  // Get all the tasks ordered by datetime
  const tasks = await Task.find()
    .sort({ datetime: 1 }) // 1 for ascending order
    .populate('assignedTo', 'firstName lastName')
    .populate('eventId', 'title');

  // Transform the tasks
  const newTasks = tasks.map((task) => ({
    title: task.title,
    description: task.description,
    deadline: task.deadline,
    assignedTo: task.assignedTo,
    status: task.status,
    eventId: task.eventId,
    createdBy: task.createdBy,
    assignedToFullName: `${task.assignedTo.firstName} ${task.assignedTo.lastName}`,
    eventTitle: task.eventId.title,
  }));

  // Return the transformed data
  return { success: true, data: newTasks };
});
