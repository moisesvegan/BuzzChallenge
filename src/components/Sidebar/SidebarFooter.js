import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const SidebarFooter = ({ onOpenModal, onLogout }) => (
  <Box>
    <Button
      onClick={onOpenModal}
      width="100%"
      bg="teal.400"
      color="white"
      mb="4"
      _hover={{ bg: "teal.500" }}
      p="6"
    >
      Crear Ticket
    </Button>
    <Button onClick={onLogout} colorScheme="red" width="100%" p="6">
      Cerrar Sesión
    </Button>
  </Box>
);

export default SidebarFooter;
