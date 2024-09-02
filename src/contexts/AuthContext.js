import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, register, logout } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // const loginUser = async (username, password) => {
  //   try {
  //     const response = await login(username, password);
  //     setUser(response.user);
  //     localStorage.setItem('user', JSON.stringify(response.user));
  //     return response.user;
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     throw error;
  //   }
  // };

  const loginUser = async (username, password) => {
    // Instead of calling the API, return a mock user
    const mockUser = {
      id: 'test-user-id',
      username: 'testuser',
      password: 'testuser.com',
    };
  
    // Set the user in the context and localStorage
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  };
  

  const registerUser = async (username, password) => {
    try {
      const response = await register(username, password);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};