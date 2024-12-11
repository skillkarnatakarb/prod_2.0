import axios from 'axios';

// Create an axios instance with a dynamic base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Use environment variable or fallback to localhost
});

// Add a request interceptor to include the token in headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach the token to Authorization header
  }
  return config;
});

// API calls
export const fetchProjects = async () => {
  try {
    const response = await API.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const uploadProject = async (data) => {
  try {
    const response = await API.post('/projects', data);
    return response.data;
  } catch (error) {
    console.error('Error uploading project:', error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await API.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export default API;
