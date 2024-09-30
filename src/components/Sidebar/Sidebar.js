import React from 'react';
import { Box } from '@chakra-ui/react';
import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';

const Sidebar = ({ username, onOpenModal, onLogout }) => (
  <Box
    as="aside"
    width="300px"
    height="100vh"
    p="6"
    borderRight="1px solid"
    borderColor="gray.200"
    bg="gray.800"
    color="white"
    position="fixed"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    boxShadow="lg"
  >
    <SidebarHeader username={username} />
    <SidebarFooter onOpenModal={onOpenModal} onLogout={onLogout} />
  </Box>
);

export default Sidebar;
