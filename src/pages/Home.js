import React, { useState } from 'react';
import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar/Sidebar';
import TicketItem from '../components/TicketItem/TicketItem';
import TicketCard from '../components/TicketCard/TicketCard'; // Nuevo componente para las tarjetas
import TicketModal from '../components/TicketModal/TicketModal'; // Nuevo componente para el modal
import { addTicket } from '../store/ticketsSlice'; 

const Home = ({ onLogout }) => {
  const dispatch = useDispatch();
  const username = localStorage.getItem('user') || 'Invitado'; 
  const tickets = useSelector((state) => state.tickets) || []; // Asegúrate de que sea un array vacío
  const [isOpen, setIsOpen] = useState(false);

  // Manejo del modal
  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  // Agregar nuevo ticket
  const handleAddTicket = (newTicket) => {
    dispatch(addTicket(newTicket)); 
  };

  // Cálculos de tickets
  const totalTickets = tickets.length;
  const startedTickets = tickets.filter(ticket => ticket.status === 'Iniciados').length;
  const finishedTickets = tickets.filter(ticket => ticket.status === 'Finalizados').length;

  // Tickets creados hoy
  const today = new Date().toISOString().split('T')[0];
  const newTickets = tickets.filter(ticket => ticket.createdAt.startsWith(today)).length;

  // Últimos tickets
  const recentTickets = tickets.slice(-2);
  
  // Formato de la fecha
  const dateFormatter = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedDate = dateFormatter.format(new Date());

  return (
    <Flex>
      <Sidebar username={username} onOpenModal={onOpenModal} onLogout={onLogout} />
      <Box 
        marginLeft="300px" 
        padding="0 130px"
        flex="1" 
        height="100vh" // Establece el alto a 100vh
        backgroundColor="#f0f0f0" // Cambia a tu color de fondo deseado
      >
        <Box marginTop="50" display="flex" alignItems="center" flexDirection="column">
          <Text fontSize="1.5em"> {formattedDate}</Text>
          <Text fontSize="3em" marginTop="2">Hola, {username}</Text>
        </Box>
        
        <Grid templateColumns="repeat(4, 1fr)" gap={4} marginTop="4">
          <TicketCard title="Total de Tickets" value={totalTickets} />
          <TicketCard title="Tickets Nuevos" value={newTickets} />
          <TicketCard title="Tickets Iniciados" value={startedTickets} />
          <TicketCard title="Tickets Finalizados" value={finishedTickets} />
        </Grid>

        <Box marginTop="8">
          <Text fontSize="lg" fontWeight="bold">Últimos Tickets Creado:</Text>
          {recentTickets.length === 0 ? (
            <Text>No hay tickets recientes.</Text>
          ) : (
            recentTickets.map((ticket) => (
              <TicketItem 
                key={ticket.id}
                ticket={ticket}
              />
            ))
          )}
        </Box>

        <TicketModal isOpen={isOpen} onClose={onCloseModal} onAddTicket={handleAddTicket} />
      </Box>
    </Flex>
  );
};

export default Home;
