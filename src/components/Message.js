import React from 'react';
import { Box, Text, Image, Icon } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { createIcon } from "@chakra-ui/icon"

const CheckAllIcon = createIcon({
  displayName: "CheckAllIcon",
  viewBox: "0 0 24 24",
  path: (
    <path
      fill="currentColor"
      d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"
    />
  ),
})

const Message = ({ message, currentUser }) => {
  const isOwnMessage = message.author === currentUser;

  return (
    <Box
      alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}
      backgroundColor={isOwnMessage ? 'blue.100' : 'gray.100'}
      borderRadius="lg"
      p={2}
      maxWidth="70%"
    >
      <Text fontWeight="bold" fontSize="sm">{message.author}</Text>
      {message.type === 'image' ? (
        <Image src={message.message} alt="Shared image" maxHeight="200px" />
      ) : (
        <Text>{message.message}</Text>
      )}
      <Box textAlign="right">
        <Text fontSize="xs" color="gray.500">
          {new Date(message.time).toLocaleTimeString()}
        </Text>
        {isOwnMessage && (
          <Icon
            as={message.read ? CheckAllIcon : CheckIcon}
            color={message.read ? 'blue.500' : 'gray.500'}
          />
        )}
      </Box>
    </Box>
  );
};

export default Message;