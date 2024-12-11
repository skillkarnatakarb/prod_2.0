import axios from 'axios';
import { API_BASE_URL } from '../config'; // Import the base URL from config.js

// Create an Axios instance with the base URL
const API = axios.create({
  baseURL: API_BASE_URL, // Use the hosted backend URL
});

// Add a request interceptor to include the token in headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach the token to Authorization header
  }
  return config;
});

// Function to fetch projects
export const fetchProjects = async () => {
  try {
    const response = await API.get('/projects'); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch projects');
  }
};

// Function to upload a project
export const uploadProject = async (projectData) => {
  try {
    const response = await API.post('/projects', projectData); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload project');
  }
};

// Function to delete a project
export const deleteProject = async (projectId) => {
  try {
    const response = await API.delete(`/projects/${projectId}`); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete project');
  }
};

export default API;
