import React, { useState, useMemo } from 'react';
import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar/Sidebar';
import TicketItem from '../components/TicketItem/TicketItem';
import TicketCard from '../components/TicketCard/TicketCard';
import TicketModal from '../components/TicketModal/TicketModal';
import { addTicket } from '../store/ticketsSlice';

const Home = ({ onLogout }) => {
  const dispatch = useDispatch();
  const username = localStorage.getItem('user') || 'Invitado';
  const tickets = useSelector((state) => state.tickets) || [];
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  const handleAddTicket = (newTicket) => {
    dispatch(addTicket(newTicket));
  };

  const { totalTickets, newTickets, startedTickets, finishedTickets, recentTickets } = useMemo(() => {
    const newTickets = tickets.filter(ticket => ticket.status === 'Nuevo').length;
    const startedTickets = tickets.filter(ticket => ticket.status === 'Iniciado').length;
    const finishedTickets = tickets.filter(ticket => ticket.status === 'Cerrado').length;
    return {
      totalTickets: tickets.length,
      newTickets,
      startedTickets,
      finishedTickets,
      recentTickets: tickets.slice(-2),
    };
  }, [tickets]);

  const formattedDate = useMemo(() => {
    const dateFormatter = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return dateFormatter.format(new Date());
  }, []);

  return (
    <Flex>
      <Sidebar username={username} onOpenModal={onOpenModal} onLogout={onLogout} />
      <Box ml="300px" p="30px" flex="1" h="100vh" bg="#f4f4f4">
        <Box textAlign="center">
          <Text fontSize="1.5em" color="gray.500">{formattedDate}</Text>
          <Text fontSize="3xl" fontWeight="bold" color="gray.700">Hola, {username}</Text>
        </Box>

        <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={6}>
          <TicketCard title="Total Tickets" value={totalTickets} />
          <TicketCard title="Tickets Nuevos" value={newTickets} />
          <TicketCard title="Tickets Iniciados" value={startedTickets} />
          <TicketCard title="Tickets Cerrados" value={finishedTickets} />
        </Grid>

        <Box mt={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.700">Últimos tickets creados</Text>
          <Box>
            {recentTickets.length === 0 ? (
              <Text>No hay tickets recientes.</Text>
            ) : (
              recentTickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket} />
              ))
            )}
          </Box>
        </Box>

        <TicketModal isOpen={isOpen} onClose={onCloseModal} onAddTicket={handleAddTicket} />
      </Box>
    </Flex>
  );
};

export default Home;
