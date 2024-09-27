import React, { useState } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm/LoginForm'; // Importamos el formulario de login

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    localStorage.setItem('user', username);
    setIsLoggedIn(true);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Text fontSize="2xl" marginBottom="4">Iniciar Sesión</Text>
      <LoginForm username={username} setUsername={setUsername} />
      <Button colorScheme="teal" onClick={handleLogin}>Entrar</Button>
    </Box>
  );
};

export default Login;
