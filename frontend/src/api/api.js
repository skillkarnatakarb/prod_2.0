import axios from 'axios';
import { API_BASE_URL } from '../config'; // Import the base URL from config.js

// Create an Axios instance with the base URL
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    console.log(`[Request] ${config.method.toUpperCase()} - ${config.url}`); // Log request details
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor to log successful and failed responses
API.interceptors.response.use(
  (response) => {
    console.log(`[Response] ${response.config.method.toUpperCase()} - ${response.config.url}`, response.data); // Log response details
    return response;
  },
  (error) => {
    console.error(
      `[Error Response] ${error.config?.method?.toUpperCase() || ''} - ${error.config?.url || ''}:`,
      error.message
    );
    return Promise.reject(error);
  }
);

// Retry logic for failed API requests with exponential backoff
const retryRequest = async (fn, retries = 3, delay = 1000) => {
  while (retries > 0) {
    try {
      return await fn();
    } catch (error) {
      retries -= 1;
      if (retries === 0) {
        console.error('All retries failed:', error.message);
        throw error;
      }
      console.warn(`Retrying API request... ${retries} retries left`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
};

// Helper function to validate API responses
const validateResponse = (response, expectedSchema) => {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid response format');
  }
  // Add schema validation logic here if needed (e.g., using `Joi` or a similar library)
  return response;
};

// =========== PROJECT FUNCTIONALITY =========== //

// Fetch all projects
export const fetchProjects = () =>
  retryRequest(() =>
    API.get('/projects').then((res) => validateResponse(res.data, { projects: 'array' }))
  );

// Upload a project
export const uploadProject = (projectData) =>
  retryRequest(() =>
    API.post('/projects', projectData).then((res) => validateResponse(res.data))
  );

// Delete a project
export const deleteProject = (projectId) =>
  retryRequest(() =>
    API.delete(`/projects/${projectId}`).then((res) => validateResponse(res.data))
  );

// =========== STUDENT LIST FUNCTIONALITY =========== //

// Fetch all student lists
export const fetchLists = () =>
  retryRequest(() =>
    API.get('/lists/get-lists').then((res) => validateResponse(res.data, { lists: 'array' }))
  );

// Fetch details of a specific student list
export const fetchListDetails = (listId) =>
  retryRequest(() =>
    API.get(`/lists/get-list/${listId}`).then((res) => validateResponse(res.data))
  );

// Create a new student list
export const createList = (formData) =>
  retryRequest(() =>
    API.post('/lists/save-list', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => validateResponse(res.data))
  );

// Delete a student list
export const deleteList = (listId) =>
  retryRequest(() =>
    API.delete(`/lists/delete-list/${listId}`).then((res) => validateResponse(res.data))
  );

// Add a student to a specific list
export const addStudentToList = (listId, studentData) =>
  retryRequest(() =>
    API.post('/lists/add-student', { ...studentData, listId }).then((res) => validateResponse(res.data))
  );

// Bulk upload students to a list
export const bulkUploadStudents = (listId, students) =>
  retryRequest(() =>
    API.post(`/lists/bulk-upload/${listId}`, students).then((res) => validateResponse(res.data))
  );

// Download a CSV template for students
export const downloadStudentTemplate = async () =>
  retryRequest(async () => {
    const response = await API.get('/lists/download-template', { responseType: 'blob' });

    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'student-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

// =========== NEW FUNCTIONALITY =========== //

// Update an existing student list
export const updateList = (listId, updatedData) =>
  retryRequest(() =>
    API.put(`/lists/update-list/${listId}`, updatedData).then((res) => validateResponse(res.data))
  );

// Fetch all students in a specific list
export const fetchStudentsInList = (listId) =>
  retryRequest(() =>
    API.get(`/lists/get-students/${listId}`).then((res) => validateResponse(res.data, { students: 'array' }))
  );

// Handle general API errors
export const handleApiError = (error) => {
  if (error.response && error.response.data) {
    console.error('API Error Response:', error.response.data);
    return error.response.data.message || 'An error occurred. Please try again.';
  }
  console.error('API Error:', error.message);
  return 'An error occurred. Please check your connection.';
};
