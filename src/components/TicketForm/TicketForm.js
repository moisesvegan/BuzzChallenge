import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTicket, deleteTicket } from '../../store/ticketsSlice';
import { Box, Button, Image, Text, Flex } from '@chakra-ui/react';
import TicketInput from './TicketInput';
import TicketSelect from './TicketSelect';
import TicketTextarea from './TicketTextarea';
import { fetchGif, gifKeywords } from '../GifUtils/gifUtils';

const TicketForm = ({ onClose, ticket, isReadOnly }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: ticket?.name || '',
    email: ticket?.email || '',
    difficulty: ticket?.difficulty || '',
    description: ticket?.description || '',
    status: ticket?.status || 'Nuevo',
    gif: ticket?.gif || ''
  });

  useEffect(() => {
    if (ticket) {
      setFormData({ ...ticket });
    }
  }, [ticket]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'difficulty' || name === 'status') {
      const keyword = gifKeywords[value];
      if (keyword) {
        fetchGif(keyword).then((gifUrl) => setFormData((prevData) => ({ ...prevData, gif: gifUrl })));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = ticket?.id || `#BUZZ-${Date.now().toString().slice(-3)}`;
    const newTicket = { ...formData, id, createdAt: ticket?.createdAt || new Date().toISOString() };
    dispatch(addTicket(newTicket));
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteTicket(ticket.id));
    onClose();
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="90%" p="6" mt="4" display="flex" flexDirection="column" gap="4">
      <Flex justify="space-between" gap="6">
        <Box flex="1">
          <TicketInput name="name" placeholder="Nombre" value={formData.name} onChange={!isReadOnly && handleInputChange} isReadOnly={isReadOnly} required />
          <TicketInput name="email" placeholder="Email" value={formData.email} onChange={!isReadOnly && handleInputChange} isReadOnly={isReadOnly} required type="email" />
          <TicketTextarea name="description" placeholder="Descripción" value={formData.description} onChange={!isReadOnly && handleInputChange} isReadOnly={isReadOnly} required />
        </Box>

        <Box flex="1">
          <TicketSelect name="difficulty" placeholder="Dificultad" value={formData.difficulty} onChange={!isReadOnly && handleInputChange} options={['Baja', 'Media', 'Alta']} isReadOnly={isReadOnly} />
          <TicketSelect name="status" placeholder="Estado" value={formData.status} onChange={!isReadOnly && handleInputChange} options={['Nuevo', 'Iniciado', 'Cerrado']} isReadOnly={isReadOnly} />

          <Box mt="4" borderWidth="1px" borderRadius="md" display="flex" justifyContent="center" alignItems="center" height="150px" bg="#F7FAFC">
            {formData.gif ? <Image src={formData.gif} alt="GIF preview" maxH="100%" /> : <Text>Previsualización del GIF</Text>}
          </Box>
        </Box>
      </Flex>

      {!isReadOnly && (
        <Flex mt="4" justifyContent="flex-start" gap="4">
          <Button colorScheme="teal" type="submit">{ticket ? 'Actualizar Ticket' : 'Crear Ticket'}</Button>
          {ticket && <Button colorScheme="red" onClick={handleDelete}>Eliminar Ticket</Button>}
        </Flex>
      )}
    </Box>
  );
};

export default TicketForm;
