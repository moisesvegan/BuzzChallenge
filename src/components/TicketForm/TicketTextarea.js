import { Textarea } from '@chakra-ui/react';

const TicketTextarea = ({ name, placeholder, value, onChange, required = false }) => (
  <Textarea
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    marginBottom="2"
    required={required}
  />
);

export default TicketTextarea;
