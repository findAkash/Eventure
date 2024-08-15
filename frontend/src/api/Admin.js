import { API } from './api';

export const AdminAPI = {
  GetAdminDashboardData: async (token) => {
    const response = await fetch(API.GetAdminDashboard, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },
  GetAllUsers: async (token) => {
    const response = await fetch(API.GetAllUsersByAdmin, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },
  ResetUserPassword: async (id, newPassword, token) => {
    const response = await fetch(API.ResetUserPassword + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPassword),
    });
    return await response.json();
  },

  UpdateUserDataByAdmin: async (id, data, token) => {
    const response = await fetch(API.UpdateUserDataByAdmin + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  DeleteUserByAdmin: async (id, token) => {
    const response = await fetch(API.DeleteUserByAdmin + `/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  GetAllEventsByAdmin: async (token) => {
    const response = await fetch(API.GetAllEventsByAdmin, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  GetAllTaskByAdmin: async (token) => {
    const response = await fetch(API.GetAllTaskByAdmin, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },
};
