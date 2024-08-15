import mongoose from 'mongoose';

// Define the Task schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
    },
    description: {
      type: String,
      default: '',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Assigned user is required'],
    },
    status: {
      type: String,
      required: [true, 'Task status is required'],
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    deadline: {
      type: Date,
      required: [true, 'Task deadline is required'],
    },
    createdBy: {
      type: String,
      required: [true, 'Creator information is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);
export default Task;
