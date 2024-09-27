import { Input } from '@chakra-ui/react';

const TicketInput = ({ name, placeholder, value, onChange, type = 'text', required = false }) => (
  <Input
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    type={type}
    marginBottom="2"
    required={required}
  />
);

export default TicketInput;
