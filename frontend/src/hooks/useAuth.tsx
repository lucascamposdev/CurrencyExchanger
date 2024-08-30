import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { login as loginService, register as registerService, fetchCurrentUser as fetchCurrentUserService } from '@/service/authService';
import TOKEN_COOKIE_NAME from '@/utils/TOKEN_COOKIE_NAME';

interface User {
  email: string;
  name: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  validateToken: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const { token, userData } = await loginService(email, password);
      
      Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 7, secure: true, sameSite: 'Strict' });
      
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, name: string, password: string) => {
    try {
      const { token, userData } = await registerService(email, name, password);
      
      Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 7, secure: true, sameSite: 'Strict' });
      
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove(TOKEN_COOKIE_NAME);
  };

  const validateToken = async () => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    setIsLoading(true);

    if (token) {
      try {
        const userData = await fetchCurrentUserService(token);
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch current user', error);
        Cookies.remove(TOKEN_COOKIE_NAME);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, validateToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
