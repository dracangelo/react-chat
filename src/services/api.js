import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.100.7:5000/api';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    console.error('API Error:', error.response || error);
    let errorMessage = 'An error occurred during login.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    throw new Error(errorMessage);
  }
};

export const register = async (username, password) => {
  try {
    const response = await api.post('/auth/register', { username, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    console.error('API Error:', error.response || error);
    let errorMessage = 'An error occurred during registration.';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getChatRooms = async () => {
  const response = await api.get('/chat-rooms');
  return response.data;
};

export const createChatRoom = async (name) => {
  const response = await api.post('/chat-rooms', { name });
  return response.data;
};

export const getMessages = async (roomId) => {
  const response = await api.get(`/messages/${roomId}`);
  return response.data;
};

export const sendMessage = async (roomId, message) => {
  const response = await api.post(`/messages/${roomId}`, { message });
  return response.data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post('/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;