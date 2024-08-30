import React, { useState, useEffect, useRef } from 'react';
import { Box, VStack, HStack, Input, Button, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../hooks/useSocket';
import Message from './Message';
import ImageUpload from './ImageUpload';

const ChatRoom = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = useSocket();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.emit('join_room', roomId);
      socket.on('receive_message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        playNotificationSound();
      });
    }
    return () => {
      if (socket) {
        socket.off('receive_message');
        socket.emit('leave_room', roomId);
      }
    };
  }, [socket, roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() && socket) {
      const messageData = {
        room: roomId,
        author: user.username,
        message: inputMessage,
        time: new Date().getTime(),
      };
      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setInputMessage('');
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();
  };

  const handleImageUpload = (imageUrl) => {
    if (socket) {
      const messageData = {
        room: roomId,
        author: user.username,
        message: imageUrl,
        time: new Date().getTime(),
        type: 'image',
      };
      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    }
  };

  return (
    <Box flex={1} p={4}>
      <VStack spacing={4} height="100%" justify="space-between">
        <VStack spacing={2} align="stretch" overflowY="auto" flex={1}>
          {messages.map((msg, index) => (
            <Message key={index} message={msg} currentUser={user.username} />
          ))}
          <div ref={messagesEndRef} />
        </VStack>
        <HStack>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
          <ImageUpload onUpload={handleImageUpload} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default ChatRoom;