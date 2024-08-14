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
      // setUser(fetchedUserData);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const loginSetup = (token, refreshToken) => {
    setIsAuthenticated(true);
    console.log('Login Setup', token, refreshToken);
    localStorage.setItem('token', token); // Save token to local storage or cookies
    localStorage.setItem('refreshToken', refreshToken); // Save refresh token to local storage or cookies
    console.log('Login Setup done', token, refreshToken);
    navigate('/Home');
  };

  const logoutSetup = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token'); // Remove token from storage
    navigate('/login'); // Use navigate instead of history.push
  };
  console.log('isAuthenticated:', isAuthenticated);
  const value = {
    isAuthenticated,
    user,
    loginSetup,
    logoutSetup,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
