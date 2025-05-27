// API utility using Axios for all backend requests
import axios from 'axios';

// Create an Axios instance with base API URL
const api = axios.create({
  baseURL: '/api',
});

// Request interceptor: Attach JWT token to Authorization header if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Handle 401 errors globally
api.interceptors.response.use(
  response => response, // Pass successful responses through
  error => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, remove JWT and user info from storage
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user');
      // Redirect to login page if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    // Propagate error to caller
    return Promise.reject(error);
  }
);

export default api;