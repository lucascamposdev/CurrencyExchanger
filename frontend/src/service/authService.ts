import axios from 'axios';

import apiUrl  from '@/utils/apiUrl';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
  return response.data;
};

export const register = async (email: string, name: string, password: string) => {
  const response = await axios.post(`${apiUrl}/auth/register`, { email, name, password });
  return response.data;
};

export const fetchCurrentUser = async (token: string) => {
  const response = await axios.post(`${apiUrl}/auth/validate`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};
