// Pełny kod klienta API
import axios from 'axios';
import { getToken } from '../utils/auth'; // Założenie, że masz funkcję do pobierania tokenu JWT

/**
 * Centralna instancja Axios.
 *
 * - `baseURL`: Wskazuje na główny adres Twojego API na Render.com.
 * Pamiętaj, aby przenieść go do zmiennych środowiskowych (.env).
 * - `headers`: Domyślne nagłówki dla każdego zapytania.
 * - `transformRequest`: Interceptor, który dodaje token autoryzacyjny do każdego
 * wychodzącego zapytania, jeśli token jest dostępny.
 */
const axiosClient = axios.create({
  baseURL: 'https://hardbanrecords-lab-backend.onrender.com/api/v1', // Zastąp adresem swojego API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor do automatycznego dodawania tokenu autoryzacyjnego
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken(); // Pobierz token (np. z localStorage)
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