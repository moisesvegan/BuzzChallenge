import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTicket } from '../../store/ticketsSlice'; 
import TicketItem from '../TicketItem/TicketItem';
import { Box, Heading, Text } from '@chakra-ui/react'; // Uso de Chakra UI

const TicketList = () => {
  const { tickets } = useSelector((state) => state.tickets); // Desestructuración del estado
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTicket(id)); // Maneja la eliminación de un ticket
  };

  const handleEdit = (ticket) => {
    console.log('Editar ticket', ticket.id); // Puedes integrar la lógica de edición más tarde
  };

  return (
    <Box padding="4" borderWidth="1px" borderRadius="lg" boxShadow="md"> {/* Caja contenedora */}
      <Heading as="h2" size="lg" marginBottom="4">Lista de Tickets</Heading>
      
      {/* Mostrar mensaje si no hay tickets */}
      {tickets.length === 0 ? (
        <Text>No hay tickets disponibles.</Text>
      ) : (
        tickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            onDelete={() => handleDelete(ticket.id)}  // Llamada a la función de eliminar
            onEdit={() => handleEdit(ticket)}        // Llamada a la función de editar
          />
        ))
      )}
    </Box>
  );
};

export default TicketList;
