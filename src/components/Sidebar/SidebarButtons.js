import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SidebarButtons = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Button onClick={() => navigate('/')} width="100%" marginBottom="2">Inicio</Button>
      <Button onClick={() => navigate('/tickets')} width="100%" marginBottom="2">Tickets</Button>
    </Box>
  );
};

export default SidebarButtons;
