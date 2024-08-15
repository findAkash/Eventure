import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a Context for the authentication state
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data here
      const fetchedUserData = JSON.parse(localStorage.getItem('user'));
      setUser(fetchedUserData);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const loginSetup = (token, refreshToken, user) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', token); // Save token to local storage
    localStorage.setItem('refreshToken', refreshToken); // Save refresh token to local storage
    localStorage.setItem('user', JSON.stringify(user)); // Save user data to local storage
    setUser(user);
    console.log(user.role);
    // Redirect based on user role
    if (user.role === 'Admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/home');
    }
  };

  const logoutSetup = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token'); // Remove token from storage
    localStorage.removeItem('refreshToken'); // Remove refresh token from storage
    localStorage.removeItem('user'); // Remove user data
    navigate('/login'); // Use navigate instead of history.push
  };
  const value = {
    isAuthenticated,
    user,
    loginSetup,
    logoutSetup,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
