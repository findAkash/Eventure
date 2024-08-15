import { API } from './api';

export const TaskAPI = {
  AddTask: async (task, token) => {
    const response = await fetch(API.AddTask, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    const data = await response.json(); // parse the response body as JSON
    return {
      status: response.status, // include the status code
      data: data, // include the parsed JSON data
    };
  },
  UpdateTask: async (id, task, token) => {
    const response = await fetch(API.UpdateTask + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    const data = await response.json(); // parse the response body as JSON
    return {
      status: response.status, // include the status code
      data: data, // include the parsed JSON data
    };
  },
  GetTasks: async (filter = '', token) => {
    const response = await fetch(API.GetTasks + `?${filter}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },
  GetTask: async (id, token) => {
    const response = await fetch(API.GetTask + `/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },
  GetMyTasks: async (token, userId) => {
    try {
      const response = await fetch(API.GetAsignedTasks + `/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  GetMyPastTasks: async (token, userId) => {
    try {
      const response = await fetch(API.GetPersonalPastTasks + `/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  DeleteTask: async (id, token) => {
    const response = await fetch(API.DeleteTask + `/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      status: response.status, // include the status code
    };
  },
  GetPersonalTasks: async (userId, token) => {
    const response = await fetch(API.GetPersonalTasks + `/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json(); // parse the response body as JSON
    return {
      status: response.status, // include the status code
      data: data, // include the parsed JSON data
    };
  },
};
