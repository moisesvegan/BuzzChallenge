import React, { useState, useMemo } from 'react';
import { Box, Text, Select, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image, Flex } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addTicket } from '../store/ticketsSlice';
import Sidebar from '../components/Sidebar/Sidebar';
import TicketItem from '../components/TicketItem/TicketItem';
import TicketForm from '../components/TicketForm/TicketForm';
import ticketIcon from '../assets/icons/ticket-icon.png';
import { FiSearch, FiFilter } from 'react-icons/fi';

const Tickets = () => {
  const tickets = useSelector((state) => state.tickets);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const username = localStorage.getItem('user') || 'Invitado';

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesFilter = filter === 'Todos' || ticket.status === filter || ticket.difficulty === filter;
      const matchesSearch = ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toString().includes(searchTerm) ||
        new Date(ticket.createdAt).toLocaleDateString().includes(searchTerm);
      return matchesFilter && matchesSearch;
    });
  }, [tickets, filter, searchTerm]);

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => {
    setCurrentTicket(null);
    setIsOpen(false);
  };

  const handleAddTicket = (newTicket) => {
    dispatch(addTicket(newTicket));
    onCloseModal();
  };

  const handleEditTicket = (ticket) => {
    setCurrentTicket(ticket);
    onOpenModal();
  };

  return (
    <Box display="flex">
      <Sidebar username={username} onOpenModal={onOpenModal} />
      <Box ml="300px" p="0 50px" flex="1" h="100vh" bg="#f9f9f9">
        <Box display="flex" alignItems="center" my={6}>
          <Image src={ticketIcon} alt="Ticket Icon" boxSize="40px" mr={4} />
          <Text fontSize="2xl" fontWeight="bold">MIS TICKETS</Text>
        </Box>

        <Box display="flex" flexDirection="row" gap={4} mb={6}>
          <Flex alignItems="center" bg="white" borderRadius="md" p={2} w="50%">
            <FiSearch size={20} color="#A0AEC0" />
            <Input
              placeholder="Buscar por nombre, ID o fecha"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              border="none"
              ml={2}
            />
          </Flex>

          <Flex alignItems="center" bg="white" borderRadius="md" p={2} w="25%">
            <FiFilter size={20} color="#A0AEC0" />
            <Select border="none" value={filter} onChange={(e) => setFilter(e.target.value)} ml={2}>
              <option value="Todos">Todos</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Iniciado">Iniciado</option>
              <option value="Cerrado">Cerrado</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </Select>
          </Flex>
        </Box>

        {filteredTickets.length === 0 ? (
          <Text>No hay tickets disponibles.</Text>
        ) : (
          filteredTickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} onEdit={handleEditTicket} />
          ))
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent maxW="130vh" h="60vh">
          <ModalHeader display="flex" alignItems="center">
            <Image src={ticketIcon} alt="Ticket Icon" boxSize="20px" mr={2} />
            {currentTicket ? 'Editar Ticket' : 'Crear Nuevo Ticket'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TicketForm onClose={onCloseModal} ticket={currentTicket} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Tickets;
