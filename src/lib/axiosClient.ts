// src/lib/axiosClient.ts

import axios from 'axios';

// Tworzymy instancję axios z predefiniowaną konfiguracją.
const axiosClient = axios.create({
  // Ustawiamy bazowy URL na adres naszego działającego backendu.
  // Wszystkie żądania (np. post('/auth/login')) będą automatycznie
  // kierowane na 'http://localhost:8000/auth/login'.
  baseURL: 'http://localhost:8000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Używamy interceptora, aby dynamicznie dołączać token JWT do każdego żądania.
// To centralizuje logikę autoryzacji i upraszcza kod w komponentach.
axiosClient.interceptors.request.use(
  (config) => {
    // Pobieramy token z localStorage.
    const token = localStorage.getItem('authToken');
    
    // Jeśli token istnieje, dodajemy go do nagłówka Authorization.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Zwracamy zmodyfikowaną konfigurację.
    return config;
  },
  (error) => {
    // Obsługujemy ewentualne błędy.
    return Promise.reject(error);
  }
);

export default axiosClient;