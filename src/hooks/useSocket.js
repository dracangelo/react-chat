// hooks/useSocket.js
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

const SOCKET_SERVER_URL = 'http://localhost:3001'; // Replace with your actual socket server URL

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const newSocket = io(SOCKET_SERVER_URL, {
        query: { userId: user.id },
      });

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [user]);

  return socket;
};

