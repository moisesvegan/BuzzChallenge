// TicketTextarea.js
import { Textarea } from '@chakra-ui/react';

const TicketTextarea = ({ name, placeholder, value, onChange, required = false, isReadOnly }) => (
  <Textarea
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    isRequired={required}
    isReadOnly={isReadOnly}
    mb="2"
  />
);

export default TicketTextarea;
