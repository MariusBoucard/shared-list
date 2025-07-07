import axios from 'axios';

// Create an Axios instance
/* eslint-disable-next-line */
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  timeout: 5000, // Set a timeout (optional)
  headers: {
    'Content-Type': 'application/json', // Default headers
  },
});
export default axiosInstance;