import { API } from './api';

export const EventAPI = {
  AddEvent: async (event, token) => {
    const response = await fetch(API.AddEvent, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });
    const data = await response.json(); // parse the response body as JSON
    return {
      status: response.status, // include the status code
      data: data, // include the parsed JSON data
    };
  },
  UpdateEvent: async (id, event, token) => {
    const response = await fetch(API.UpdateEvent + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });
    const data = await response.json(); // parse the response body as JSON
    return {
      status: response.status, // include the status code
      data: data, // include the parsed JSON data
    };
  },
  GetEvents: async (filter = '', token) => {
    const response = await fetch(API.GetEvents + `?${filter}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  GetEventById: async (id, token) => {
    const response = await fetch(API.GetEvent + `/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },
  GetMyEvent: async (token, userId) => {
    try {
      const response = await fetch(API.GetMyEvents + `/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json(); // Assuming the response is directly an array
    } catch (error) {
      console.error('Error fetching events from API:', error);
      return []; // Return an empty array in case of error
    }
  },
  GetMyPastEvent: async (token, userId) => {
    try {
      const response = await fetch(API.GetMyPastEvents + `/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json(); // Assuming the response is directly an array
    } catch (error) {
      console.error('Error fetching events from API:', error);
      return []; // Return an empty array in case of error
    }
  },
  GetUpcomingEvents: async (token) => {
    try {
      const response = await fetch(API.GetUpcomingEvents, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json(); // Assuming the response is directly an array
    } catch (error) {
      console.error('Error fetching events from API:', error);
      return []; // Return an empty array in case of error
    }
  },
  DeleteEvent: async (eventId, token) => {
    const response = await fetch(API.DeleteEvent + `/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is not empty before parsing
    if (response.ok) {
      const text = await response.text(); // Get response text
      return text ? JSON.parse(text) : {}; // Parse only if there is a response body
    } else {
      throw new Error('Failed to delete event');
    }
  },
};
