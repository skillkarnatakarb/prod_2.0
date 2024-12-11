import axios from 'axios';
import { API_BASE_URL } from '../config'; // Import the base URL from config.js

const API = axios.create({
  baseURL: API_BASE_URL, // Use the hosted backend URL
});

// Add a request interceptor to include the token in headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
