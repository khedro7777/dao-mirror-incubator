
import axios from 'axios';
import { payloadCmsUrl } from '@/services/config';

// Create an axios instance with default configuration
export const api = axios.create({
  baseURL: payloadCmsUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API response error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API request error (no response):', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

