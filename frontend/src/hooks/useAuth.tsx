import React, { createContext, useContext, useState} from 'react';
import Cookies from 'js-cookie';
import { login as loginService, register as registerService, fetchCurrentUser as fetchCurrentUserService } from '@/service/authService';
import TOKEN_COOKIE_NAME from '@/utils/TOKEN_COOKIE_NAME';
import getCookieData from '@/utils/getCookieData';

interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  validateToken: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginService(email, password);
      
      Cookies.set(TOKEN_COOKIE_NAME, JSON.stringify(data), { expires: 7, secure: true, sameSite: 'Strict' });
      
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, name: string, password: string) => {
    try {
      const data = await registerService(email, name, password);
      
      Cookies.set(TOKEN_COOKIE_NAME, JSON.stringify(data), { expires: 7, secure: true, sameSite: 'Strict' });
      
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove(TOKEN_COOKIE_NAME);
  };

  const validateToken = async () => {
    const cookieObject = getCookieData();
    setIsLoading(true);

    if (cookieObject) {
      try {
        await fetchCurrentUserService(cookieObject.token);
      } catch (error) {
        console.error('Failed to fetch current user', error);
        Cookies.remove(TOKEN_COOKIE_NAME);
      }
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, validateToken, isLoading }}>
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
