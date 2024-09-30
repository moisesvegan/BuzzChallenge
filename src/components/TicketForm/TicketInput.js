// TicketInput.js
import { Input } from '@chakra-ui/react';

const TicketInput = ({ name, placeholder, value, onChange, type = 'text', required = false, isReadOnly }) => (
  <Input
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    type={type}
    isRequired={required}
    isReadOnly={isReadOnly}
    mb="2"
  />
);

export default TicketInput;
