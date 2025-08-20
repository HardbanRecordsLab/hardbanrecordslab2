// src/contexts/AuthContext.tsx - NAPRAWIONY
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

// Definicja typów dla użytkownika i tokenu
interface DecodedToken {
  sub: string; // Email jest w polu 'sub'
  role: string;
  exp: number;
}

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Pobieramy adres URL naszego API ze zmiennych środowiskowych
const API_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        // Sprawdzamy, czy token nie wygasł
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ email: decoded.sub, role: decoded.role });
          setToken(storedToken);
        } else {
          localStorage.removeItem('access_token');
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('access_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    if (!API_URL) {
      throw new Error("VITE_API_BASE_URL is not defined in .env.local file");
    }
    
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    const decoded = jwtDecode<DecodedToken>(data.access_token);
    
    setUser({ email: decoded.sub, role: decoded.role });
    setToken(data.access_token);
    localStorage.setItem('access_token', data.access_token);
  };

  const register = async (email: string, password: string) => {
     if (!API_URL) {
      throw new Error("VITE_API_BASE_URL is not defined in .env.local file");
    }

    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
