// TicketItem.js
import React from 'react';
import { Box, Text, Button, Tag, Image } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';

const TicketItem = ({ ticket, onDelete, onEdit }) => {
  const { id, name, status, difficulty, createdAt, gif } = ticket;

  const getColor = (type, value) => {
    const colors = {
      difficulty: { Baja: 'green', Media: 'yellow', Alta: 'red' },
      status: { Nuevo: 'blue', Iniciado: 'orange', Cerrado: 'green' },
    };
    return colors[type][value] || 'gray';
  };

  return (
    <Box
      display="flex" 
      justifyContent="space-between" 
      p="16px" 
      borderWidth="1px" 
      borderRadius="lg" 
      mb="16px"
      alignItems="center"
      bg="white"
      boxShadow="md"
    >
      <Text fontSize="lg" fontWeight="bold" color="gray.700">{id}</Text>

      <Box height="40px" width="1px" bg="gray.300" mx={2} />

      <Text fontSize="lg" fontWeight="medium" isTruncated maxW="200px" color="gray.700">
        {name}
      </Text>

      <Box height="40px" width="1px" bg="gray.300" mx={2} />

      <Tag colorScheme={getColor('status', status)} px="20px" borderRadius="full">
        {status}
      </Tag>

      <Tag colorScheme={getColor('difficulty', difficulty)} px="20px" borderRadius="full" ml={2}>
        {difficulty}
      </Tag>

      {gif && <Image src={gif} alt="Ticket GIF" boxSize="50px" ml={2} />}

      <Box height="40px" width="1px" bg="gray.300" mx={2} />

      <Text fontSize="lg" color="gray.500">{new Date(createdAt).toLocaleDateString()}</Text>

      {onEdit && (
        <Button onClick={() => onEdit(ticket)} variant="outline" leftIcon={<FiEdit />} size="sm">
          Editar
        </Button>
      )}

      {onDelete && (
        <Button onClick={() => onDelete(ticket.id)} colorScheme="red" size="sm" ml={2}>
          Eliminar
        </Button>
      )}
    </Box>
  );
};

export default TicketItem;
