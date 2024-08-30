import React, { useState, useEffect } from 'react';
import { Box, VStack, Button, Text, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getChatRooms, createChatRoom } from '../services/api';

const ChatSidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    const fetchRooms = async () => {
      const fetchedRooms = await getChatRooms();
      setRooms(fetchedRooms);
    };
    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (newRoomName.trim()) {
      const newRoom = await createChatRoom(newRoomName);
      setRooms([...rooms, newRoom]);
      setNewRoomName('');
    }
  };

  return (
    <Box width="250px" bg="gray.100" p={4}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold">Welcome, {user.username}</Text>
        <Input
          placeholder="New room name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <Button onClick={handleCreateRoom}>Create Room</Button>
        {rooms.map((room) => (
          <Link key={room.id} to={`/chat/${room.id}`}>
            <Button width="100%">{room.name}</Button>
          </Link>
        ))}
        <Button onClick={logoutUser} colorScheme="red">Logout</Button>
      </VStack>
    </Box>
  );
};

export default ChatSidebar;
