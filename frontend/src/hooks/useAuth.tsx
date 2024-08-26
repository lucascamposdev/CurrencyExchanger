import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import apiUrl from "@/utils/apiUrl";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Criando a instância do Axios
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: new (require('https').Agent)({  
    rejectUnauthorized: false 
  })
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token); 
      setUser(response.data.user); // Atualiza o usuário após login bem-sucedido
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/register", { name, email, password });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
