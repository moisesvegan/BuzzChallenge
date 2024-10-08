// TicketSelect.js
import { Select } from '@chakra-ui/react';

const TicketSelect = ({ name, placeholder, value, onChange, options, isReadOnly }) => (
  <Select
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    isDisabled={isReadOnly}
    mb="2"
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </Select>
);

export default TicketSelect;
