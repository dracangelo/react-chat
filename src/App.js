import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ChatSidebar from './components/ChatSidebar';
import ChatRoom from './components/ChatRoom';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <Box minHeight="100vh" bg="gray.50">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={
                  <Box display="flex" height="100vh">
                    <ChatSidebar />
                    <Routes>
                      <Route path=":roomId" element={<ChatRoom />} />
                    </Routes>
                  </Box>
                } />
              </Routes>
            </Box>
          </Router>
        </SocketProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;