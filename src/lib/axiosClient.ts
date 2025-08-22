// Poprawiona zawartość pliku axiosClient.ts
import axios from 'axios';
import { getToken } from './auth'; // Poprawiona ścieżka importu

const axiosClient = axios.create({
  baseURL: 'https://hardbanrecords-lab-backend.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;