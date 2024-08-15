import mongoose from 'mongoose';

// Define the Event schema
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event name is required'],
    },
    description: {
      type: String,
      default: '',
    },
    dateTime: {
      type: Date,
      required: [true, 'Event date and time are required'],
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
    },
    participants: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    postedBy: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Event model
const Event = mongoose.model('Event', eventSchema);
export default Event;
