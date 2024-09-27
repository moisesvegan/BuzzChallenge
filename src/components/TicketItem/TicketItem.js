import React from 'react';
import { Box, Text, Button, Tag, Image } from '@chakra-ui/react';

// Utilidad para formatear la fecha de creación
const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const TicketItem = ({ ticket, onDelete, onEdit }) => {
  const { id, name, status, difficulty, createdAt, gif } = ticket;
  const formattedDate = formatDate(createdAt);

  // Función para asignar color basado en la dificultad
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Baja':
        return 'green';
      case 'Media':
        return 'yellow';
      case 'Alta':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Función para asignar color basado en el estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'Nuevo':
        return 'blue';
      case 'Iniciado':
        return 'orange';
      case 'Cerrado':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      padding="4" 
      borderWidth="1px" 
      borderRadius="lg" 
      marginBottom="4"
      alignItems="center"
      backgroundColor="white"
      fontSize="20px"
    >
      <Text fontSize="20px">{id}</Text>

      {/* Línea vertical separadora */}
      <Box height="40px" width="1px" backgroundColor="gray.300" mx={2} />

      <Text fontSize="20px">{name}</Text>

      {/* Línea vertical separadora */}
      <Box height="40px" width="1px" backgroundColor="gray.300" mx={2} />

      <Text fontSize="20px">
        <Tag colorScheme={getStatusColor(status)} padding="5px 20px" borderRadius="full" fontSize="20px">
          {status}
        </Tag>
      </Text>

      <Text fontSize="20px">
        <Tag colorScheme={getDifficultyColor(difficulty)} padding="5px 20px" borderRadius="full" fontSize="20px" marginLeft="2">
          {difficulty}
        </Tag>
      </Text>

      {gif && (
        <Image src={gif} alt="Ticket GIF" boxSize="50px" marginLeft="2" />
      )}

      {/* Línea vertical separadora */}
      <Box height="40px" width="1px" backgroundColor="gray.300" mx={2} />

      <Text fontSize="20px">{formattedDate}</Text>

      {/* Botón para editar, solo si la función onEdit está disponible */}
      {onEdit && (
        <Button onClick={() => onEdit(ticket)} colorScheme="blue" size="sm" marginLeft="2">
          Editar
        </Button>
      )}

      {/* Botón para eliminar, solo si la función onDelete está disponible */}
      {onDelete && (
        <Button onClick={() => onDelete(ticket.id)} colorScheme="red" size="sm" marginLeft="2">
          Eliminar
        </Button>
      )}
    </Box>
  );
};

export default TicketItem;
