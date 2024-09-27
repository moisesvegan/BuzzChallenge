import React from 'react';
import { Box } from '@chakra-ui/react';
import SidebarHeader from './SidebarHeader';
import SidebarButtons from './SidebarButtons';
import SidebarFooter from './SidebarFooter';

const Sidebar = ({ username, onOpenModal, onLogout }) => {
  return (
    <Box 
      as="aside" 
      width="300px" 
      height="100vh" 
      padding="4" 
      borderRight="1px" 
      borderColor="gray.200" 
      position="fixed"
      backgroundColor="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <SidebarHeader username={username} />
      <SidebarButtons />
      <SidebarFooter onOpenModal={onOpenModal} onLogout={onLogout} />
    </Box>
  );
};

export default Sidebar;
