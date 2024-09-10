import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './useAuth';

interface Rate {
  Currency: string;
  Rate: number;
}

interface ApiResponse {
  BaseCurrency: string;
  Rates: Rate[];
  LastUpdate: string;
}

interface SocketContextProps {
  currencies: ApiResponse | null; // Armazena cotações atualizadas
  connectToWebSocket: () => void;
  disconnectFromWebSocket: () => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencies, setCurrencies] = useState<ApiResponse | null>(null);
  const userData = useAuth().userData;
  const socketRef = useRef<WebSocket | null>(null); 

  // Função para conectar ao WebSocket
  const connectToWebSocket = () => {
    const socket = new WebSocket('ws://localhost:5153/ws'); 
    socketRef.current = socket; 

    socket.onopen = () => {
      if (userData) {
        const currency = userData.currency ?? 'USD';
        const initialMessage = { currency }; 
        socket.send(JSON.stringify(initialMessage));

      } else {
        console.log('userData está null ou undefined. Mensagem inicial não enviada.');
      }
    };

    socket.onmessage = (event) => {
      const message: ApiResponse = JSON.parse(event.data);
      console.log('Mensagem recebida');
        setCurrencies(message);
    };

    socket.onclose = () => {
      console.log('Conexão WebSocket fechada');
    };

  };

  const disconnectFromWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      console.log('Conexão WebSocket encerrada');
    }
  };

  useEffect(() => {
    connectToWebSocket();

    return () => {
      disconnectFromWebSocket(); 
    };
  }, []);

  return (
    <SocketContext.Provider value={{ currencies, connectToWebSocket, disconnectFromWebSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook para usar o contexto do WebSocket
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
