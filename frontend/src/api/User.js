import { API } from './api';

export const UserAPI = {
  GetUserById: async (token) => {
    const response = await fetch(API.GetUserById, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  GetAllUsers: async (token) => {
    const response = await fetch(API.GetAllUsers, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  },

  ChangePassword: async (password, token) => {
    const response = await fetch(API.ChangePassword, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(password),
    });
    return {
      status: response.status,
      data: await response.json(),
    };
  },

  UpdateMyProfile: async (data, token) => {
    const response = await fetch(API.UpdateMyProfile, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
};
