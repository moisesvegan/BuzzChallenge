import React from 'react';
import { Input } from '@chakra-ui/react';

const LoginForm = ({ username, setUsername }) => {
  return (
    <Input 
      placeholder="Nombre de usuario" 
      value={username} 
      onChange={(e) => setUsername(e.target.value)} 
      marginBottom="4" 
    />
  );
};

export default LoginForm;
