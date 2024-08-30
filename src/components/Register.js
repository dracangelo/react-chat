import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, useToast, Container, Image } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, password);
      navigate('/chat');
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: 'Registration Failed',
        description: error.message || 'An error occurred during registration.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="lg" py={12}>
      <VStack spacing={8} align="stretch">
        <Image src="/logo.png" alt="Chat App Logo" maxH="100px" mx="auto" />
        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          border="1px"
          borderColor="gray.200"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Heading size="lg" textAlign="center">Create an Account</Heading>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  bg="gray.50"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  bg="gray.50"
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" width="100%" mt={4}>
                Register
              </Button>
            </VStack>
          </form>
        </Box>
        <Text textAlign="center">
          Already have an account?{' '}
          <Link as={RouterLink} to="/" color="blue.500" fontWeight="medium">
            Login here
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};


export default Register;