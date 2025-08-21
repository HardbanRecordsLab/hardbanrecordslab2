// Pełny kod pliku konfiguracyjnego aplikację
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Stworzenie instancji klienta React Query.
// Można tutaj dodać globalną konfigurację, np. czas przestarzałości danych (staleTime).
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* "Owinęliśmy" całą aplikację (komponent <App />) w dostawcę QueryClientProvider. */}
    {/* Dzięki temu każdy komponent wewnątrz <App /> będzie mógł używać haków z React Query. */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);