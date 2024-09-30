import React from 'react';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import SidebarButtons from './SidebarButtons';

const SidebarHeader = ({ username }) => (
  <Box mb="6">
    <Flex alignItems="center" mb="6">
      <Avatar name={username} size="lg" mr="4" />
      <Text fontSize="lg" fontWeight="bold">
        Hola, {username}
      </Text>
    </Flex>
    <SidebarButtons />
  </Box>
);

export default SidebarHeader;
