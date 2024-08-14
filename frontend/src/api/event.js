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
  GetEvent: async (id, token) => {
    const response = await fetch(API.GetEvent + `/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },
  GetMyEvent: async (token) => {
    try {
      const response = await fetch(API.GetMyEvents, {
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
  // GetMyEvents: async (token) => {
  //   const response = await fetch(API.GetMyEvents, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   return await response.json;
  // },
  DeleteEvent: async (id, token) => {
    const response = await fetch(API.DeleteEvent + `/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer' ${token}`,
      },
    });
    const data = await response.json(); // parse the response body as JSON
    return {
      status: response.status, // include the status code
      data: data, // include the parsed JSON data
    };
  },
};
