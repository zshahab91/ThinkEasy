import axios, { AxiosInstance, AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Access the variables
const apiUrl = process.env.API_URL || "https://frontend-test-be.stage.thinkeasy.cz";
// Define a base type for API responses if needed
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Create an axios instance
const apiService: AxiosInstance = axios.create({
  baseURL: apiUrl, // Set your base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (e.g., to add auth tokens)
apiService.interceptors.request.use(

  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiService.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle response errors globally
    if (error.response) {
      console.error('API error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiService;
