import React from 'react';
import { VStack, Button } from '@chakra-ui/react';
import { FiHome, FiClipboard } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Inicio', icon: FiHome, path: '/' },
  { label: 'Tickets', icon: FiClipboard, path: '/tickets' },
];

const SidebarButtons = () => {
  const navigate = useNavigate();

  return (
    <VStack spacing="4" align="stretch">
      {navItems.map(({ label, icon: Icon, path }) => (
        <Button
          key={label}
          onClick={() => navigate(path)}
          leftIcon={<Icon size="24px" />}
          width="100%"
          justifyContent="flex-start"
          fontWeight="bold"
          color="whiteAlpha.900"
          bg="gray.600"
          _hover={{ bg: "gray.700" }}
          p="6"
          borderRadius="md"
        >
          {label}
        </Button>
      ))}
    </VStack>
  );
};

export default SidebarButtons;
