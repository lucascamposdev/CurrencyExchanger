import React, { createContext, useContext, useState} from 'react';
import Cookies from 'js-cookie';
import { login as loginService, register as registerService, fetchCurrentUser as fetchCurrentUserService } from '@/service/authService';
import TOKEN_COOKIE_NAME from '@/utils/TOKEN_COOKIE_NAME';
import Decimal from 'decimal.js';

type UserDataType = {
  name: string;
  email: string;
  currency: string;
  balance: Decimal;
}

interface AuthContextProps {
  userData: UserDataType | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  validateToken: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserDataType | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const { token, userData } = await loginService(email, password);
      setUserData(userData);
      Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 7, secure: true, sameSite: 'Strict' });
      
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, name: string, password: string) => {
    try {
      const { token, userData } = await registerService(email, name, password);

      setUserData(userData);
      Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 7, secure: true, sameSite: 'Strict' });
      
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove(TOKEN_COOKIE_NAME);
    setUserData(null);
  };

  const validateToken = async () => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    setIsLoading(true);

    if (token) {
      try {
        const { userData } = await fetchCurrentUserService(token);

        setUserData(userData);
        
      } catch (error) {
        console.error('Failed to fetch current user', error);
        Cookies.remove(TOKEN_COOKIE_NAME);
      }
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ userData, login, register, logout, validateToken, isLoading }}>
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
