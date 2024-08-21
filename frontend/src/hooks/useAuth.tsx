import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { login as loginService, register as registerService, fetchCurrentUser as fetchCurrentUserService } from '@/service/authService';

interface User {
  id: string;
  email: string;
  name: string;
}

const TOKEN_COOKIE_NAME = 'auth_token';

const useAuth = () => {
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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = Cookies.get(TOKEN_COOKIE_NAME);

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

    fetchCurrentUser();
  }, []);

  return { user, login, register, logout, isLoading };
};

export default useAuth;
