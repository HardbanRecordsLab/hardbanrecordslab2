// src/contexts/AuthContext.tsx

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../lib/axiosClient'; // Zakładamy, że masz skonfigurowanego klienta axios
import { jwtDecode } from 'jwt-decode'; // NOWY IMPORT

// Definicja typów dla zdekodowanego tokenu i użytkownika
interface DecodedToken {
  sub: string; // ID użytkownika
  role: string; // Rola użytkownika
  exp: number; // Czas wygaśnięcia
}

interface User {
  id: string;
  role: string;
}

// Definicja typu dla wartości kontekstu
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Utworzenie kontekstu z wartością domyślną
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props dla dostawcy kontekstu
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Przy pierwszym ładowaniu aplikacji, sprawdzamy czy token istnieje i jest ważny
    const currentToken = localStorage.getItem('authToken');
    if (currentToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(currentToken);
        // Sprawdzamy, czy token nie wygasł
        if (decoded.exp * 1000 > Date.now()) {
          setToken(currentToken);
          setUser({ id: decoded.sub, role: decoded.role });
        } else {
          // Token wygasł, czyścimy localStorage
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: any) => {
    try {
      // Zamieniamy dane na format FormData, zgodnie z wymaganiami endpointu FastAPI
      const formData = new FormData();
      formData.append('username', credentials.email);
      formData.append('password', credentials.password);
      
      const response = await axiosClient.post('/auth/login', formData);
      const { access_token } = response.data;
      
      if (access_token) {
        localStorage.setItem('authToken', access_token);
        setToken(access_token);
        
        // ZDEKODOWANIE TOKENU I PRZEKIEROWANIE - KLUCZOWA ZMIANA
        const decoded = jwtDecode<DecodedToken>(access_token);
        const userRole = decoded.role.replace('_creator', '').replace('_instructor', ''); // Upraszczamy role, np. 'music_creator' -> 'artist'
        setUser({ id: decoded.sub, role: userRole });

        // Dynamiczne przekierowanie na podstawie roli
        switch (userRole) {
            case 'music':
                navigate('/artist/dashboard');
                break;
            case 'book':
                navigate('/author/dashboard');
                break;
            case 'elearning':
                navigate('/instructor/dashboard');
                break;
            case 'admin':
                navigate('/admin/dashboard');
                break;
            default:
                navigate('/'); // Domyślne przekierowanie, jeśli rola jest nieznana
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Rzucamy błąd dalej, aby komponent formularza mógł go obsłużyć
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    navigate('/auth');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook do łatwego użycia kontekstu w komponentach
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};