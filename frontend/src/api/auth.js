import axios from 'axios';
import { API } from './api';
import { removeToken } from '../utils/RemoveToken';
import { toast, ToastContainer } from 'react-toastify';

export const Auth = {
  Login: async (email, password) => {
    console.log(API.LoginAPI);
    const response = await fetch(API.LoginAPI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Login failed: ${response.statusText}`);
    }
  },

  Signup: async (data) => {
    const response = await fetch(API.SignupAPI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  Logout: async (token) => {
    const response = await fetch(API.LogoutAPI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      removeToken();
      return await response.json();
    } else {
      throw new Error(`Logout failed: ${response.statusText}`);
    }
  },
};
