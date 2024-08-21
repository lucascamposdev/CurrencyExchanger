import axios from 'axios';

const API_URL = '/api'; 

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const register = async (email: string, name: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { email, name, password });
  return response.data;
};

export const fetchCurrentUser = async (token: string) => {
  const response = await axios.get(`${API_URL}/validate`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};
