import React from 'react';
import { Input } from '@chakra-ui/react';

const LoginForm = ({ username, setUsername }) => (
  <Input
    placeholder="Nombre de usuario"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    mb="4"
  />
);

export default LoginForm;
