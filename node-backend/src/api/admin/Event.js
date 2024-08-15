import express from 'express';
import { handleAsyncRequest } from '../../helpers/handle-async-request.js';
import Event from '../../models/Event.js';

export class EventAPI {
  static instance() {
    const router = express.Router();
    router.get('/', this.getAllEvents);
    // router.get('/:id', this.getEventById);
    // router.post('/', this.createEvent);
    // router.put('/:id', this.updateEvent);
    // router.delete('/:id', this.deleteEvent);
    return router;
  }
}

EventAPI.getAllEvents = handleAsyncRequest(async (req, res) => {
  // get all the events order by datetime
  const events = await Event.find().sort({ datetime: 1 });
  return { success: true, data: events };
});
