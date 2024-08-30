import React from 'react';
import { Button, Input, useToast } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';

const ImageUpload = ({ onUpload }) => {
  const toast = useToast();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);

        // Replace this with your actual image upload API endpoint
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const { imageUrl } = await response.json();
          onUpload(imageUrl);
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: 'Image upload failed',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Button as="label" leftIcon={<AttachmentIcon />} cursor="pointer">
      Upload Image
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        display="none"
      />
    </Button>
  );
};


export default ImageUpload;