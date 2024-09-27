import React, { useState } from 'react';
import { Box, Text, Select, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { addTicket } from '../store/ticketsSlice'; 
import Sidebar from '../components/Sidebar/Sidebar';
import TicketItem from '../components/TicketItem/TicketItem';
import TicketForm from '../components/TicketForm/TicketForm'; 

const Tickets = () => {
  const tickets = useSelector((state) => state.tickets);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false); 
  const [currentTicket, setCurrentTicket] = useState(null); 
  const username = localStorage.getItem('user') || 'Invitado';

  const filteredTickets = tickets.filter(ticket => {
    const matchesFilter = 
      filter === 'Todos' || 
      ticket.status === filter; // Cambiado de difficulty a status
    const matchesSearch = 
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ticket.id.toString().includes(searchTerm) || 
      new Date(ticket.createdAt).toLocaleDateString().includes(searchTerm);

    return matchesFilter && matchesSearch;
  });

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
      <Box  
        marginLeft="300px" 
        padding="0 130px"
        flex="1" 
        height="100vh" 
        backgroundColor="#f0f0f0"
      >
        <Text fontSize="2xl" fontWeight="bold" marginBottom="4">Lista de Tickets</Text>
        
        <Box display="flex" flexDirection="row" gap={10}>
          <Input
            width="25%"
            backgroundColor="white"
            placeholder="Buscar por nombre, ID o fecha"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            marginBottom="4"
          />
          <Select 
            width="25%" 
            backgroundColor="white" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            marginBottom="4"
          >
            <option value="Todos">Todos</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Iniciados">Iniciado</option>
            <option value="Cerrado">Cerrado</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </Select>
        </Box>

        {filteredTickets.length === 0 ? (
          <Text>No hay tickets disponibles.</Text>
        ) : (
          filteredTickets.map((ticket) => (
            <TicketItem 
              key={ticket.id}  
              ticket={ticket} 
              onEdit={handleEditTicket} 
            />
          ))
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentTicket ? 'Editar Ticket' : 'Crear Nuevo Ticket'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TicketForm 
              onClose={onCloseModal} 
              onAddTicket={handleAddTicket} 
              ticket={currentTicket} 
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Tickets;
