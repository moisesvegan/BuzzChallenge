import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const SidebarFooter = ({ onOpenModal, onLogout }) => {
  return (
    <Box>
      <Button onClick={onOpenModal} width="100%" marginBottom="2">Crear Nuevo Ticket</Button>
      <Button onClick={onLogout} colorScheme='red' width="100%">Cerrar Sesión</Button>
    </Box>
  );
};

export default SidebarFooter;
