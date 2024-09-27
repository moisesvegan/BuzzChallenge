import React from 'react';
import { Text } from '@chakra-ui/react';

const SidebarHeader = ({ username }) => {
  return (
    <Text fontSize="2xl" fontWeight="bold" marginBottom="4">
      Bienvenido, {username}
    </Text>
  );
};

export default SidebarHeader;
