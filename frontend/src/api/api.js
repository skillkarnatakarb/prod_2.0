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
      error.response?.data || error.message
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
export const fetchProjects = async () =>
  retryRequest(() => API.get('/projects').then((res) => validateResponse(res.data)));

// Upload a new project
export const uploadProject = async (projectData) =>
  retryRequest(() =>
    API.post('/projects', projectData, {
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => validateResponse(res.data))
  );

// Delete a project by ID
export const deleteProject = async (projectId) =>
  retryRequest(() => API.delete(`/projects/${projectId}`).then((res) => validateResponse(res.data)));

// =========== STUDENT LIST FUNCTIONALITY =========== //

// Fetch all student lists
export const fetchLists = () =>
  retryRequest(() =>
    API.get('/lists').then((res) => validateResponse(res.data, { lists: 'array' }))
  );

// Download the CSV template
export const downloadStudentTemplate = async () => {
  try {
    const response = await API.get('/lists/template', {
      responseType: 'blob', // Ensures the file is treated as a blob
    });

    // Create a URL for the downloaded file and trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Student_Template.csv'); // File name for download
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error('Error downloading template:', error.message);
    throw error;
  }
};

// Create a new student list
export const createList = (formData) =>
  retryRequest(() =>
    API.post('/lists/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => validateResponse(res.data))
  );

// Delete a student list by ID
export const deleteList = (id) => {
  if (!id) throw new Error('List ID is required');
  return API.delete(`/lists/${id}`);
};



// =========== NEW FUNCTIONALITY =========== //

// Fetch project by ID
export const fetchProjectById = async (projectId) => {
  try {
    const response = await API.get(`/projects/${projectId}`);
    console.log(`Project with ID ${projectId} fetched successfully.`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${projectId}:`, error.message);
    throw error;
  }
};

// Bulk delete projects
export const bulkDeleteProjects = async (projectIds) => {
  try {
    const response = await API.post('/projects/bulk-delete', { projectIds });
    console.log(`Projects with IDs ${projectIds.join(', ')} deleted successfully.`);
    return response.data;
  } catch (error) {
    console.error('Error bulk-deleting projects:', error.message);
    throw error;
  }
};

// Search projects by keyword
export const searchProjects = async (keyword) => {
  try {
    const response = await API.get(`/projects/search`, { params: { q: keyword } });
    console.log(`Projects matching keyword "${keyword}" fetched successfully.`);
    return response.data;
  } catch (error) {
    console.error(`Error searching projects with keyword "${keyword}":`, error.message);
    throw error;
  }
};

// =========== GENERIC UTILITY FUNCTIONS =========== //

// Fetch user data
export const fetchUserData = async () =>
  retryRequest(() => API.get('/users/me').then((res) => validateResponse(res.data)));

// Update user profile
export const updateUserProfile = async (userData) =>
  retryRequest(() =>
    API.put('/users/me', userData).then((res) => validateResponse(res.data))
  );

// Fetch activity logs
export const fetchActivityLogs = async () =>
  retryRequest(() => API.get('/logs/activity').then((res) => validateResponse(res.data)));


// Register a user
export const registerUser = async (formData) => {
  try {
    const response = await API.post('/registrations/register', {
      name: formData.Name,                  // Match schema
      college: formData.College,
      degree: formData.Degree,
      branch: formData.Branch,
      phoneNumber: formData.PhoneNumber,
      email: formData.Email,
      address: formData.Address,
      dob: formData.DOB,                    // Ensure ISO format
      usn: formData.USN,
      role: formData.Role,
    });
    return response.data;
  } catch (error) {
    console.error('Error Registering User:', error.message);
    throw error;
  }
};


// Fetch all registrations
export const getRegistrations = async () => {
  try {
    const response = await API.get('/registrations/registrations');
    return response.data;
  } catch (error) {
    console.error('Error Fetching Registrations:', error.message);
    throw error;
  }
};

// Fetch students by List ID
export const fetchStudentsByList = (listId) => {
  return API.get(`/lists/${listId}/students`)
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching students:', error.message);
      throw error;
    });
};


export const fetchStuProfile = async () => {
  try {
    const response = await API.get("/stuprofile/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);
    throw error;
  }
};


export const updateStuProfile = async (token, profileData) => {
  try {
    const response = await API.put("/stuprofile/profile", profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};

