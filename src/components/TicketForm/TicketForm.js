import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTicket, deleteTicket } from '../../store/ticketsSlice';
import { Box, Button, Image } from '@chakra-ui/react';
import TicketInput from '../TicketForm/TicketInput';
import TicketSelect from '../TicketForm/TicketSelect';
import TicketTextarea from '../TicketForm/TicketTextarea';
import { gifKeywords, fetchGif } from '../gifUtils/gifUtils';

const TicketForm = ({ onClose, ticket, isReadOnly }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: ticket?.name || '',
    email: ticket?.email || '',
    difficulty: ticket?.difficulty || '',
    description: ticket?.description || '',
    status: ticket?.status || 'Iniciado',
    gif: ticket?.gif || ''
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        name: ticket.name,
        email: ticket.email,
        difficulty: ticket.difficulty,
        description: ticket.description,
        status: ticket.status,
        gif: ticket.gif || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        difficulty: '',
        description: '',
        status: 'Nuevo',
        gif: ''
      });
    }
  }, [ticket]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'difficulty' || name === 'status') {
      const keyword = gifKeywords[value];
      if (keyword) {
        fetchGif(keyword).then((gifUrl) =>
          setFormData((prevData) => ({ ...prevData, gif: gifUrl }))
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = ticket?.id || `#BUZZ-${String(Date.now()).slice(-3)}`;
    const createdAt = ticket?.createdAt || new Date().toISOString();
    dispatch(addTicket({ ...formData, id, createdAt }));
    onClose();
  };

  const handleDelete = () => {
    if (ticket) {
      dispatch(deleteTicket(ticket.id));
      onClose();
    }
  };

  return (
    <Box 
      display="flex"
      width="100%"
      flexDirection="column"
      height="50vh" // Cambiar a auto para permitir que el contenido crezca
      justifyContent="space-between" 
      as="form" 
      onSubmit={handleSubmit} 
      marginBottom="4"
    >
      <Box display="flex" flexDirection="row" gap="10px" justifyContent="space-between">
        <Box width="50%">
          <TicketInput
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={isReadOnly ? undefined : handleInputChange}
            required
            isReadOnly={isReadOnly}
          />
          <TicketInput
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={isReadOnly ? undefined : handleInputChange}
            type="email"
            required
            isReadOnly={isReadOnly}
          />
          <TicketTextarea
            height="30vh" // Aquí se aplica la altura deseada
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={isReadOnly ? undefined : handleInputChange}
            required
            isReadOnly={isReadOnly}
          />
        </Box>
        <Box width="50%">
          <TicketSelect
            name="difficulty"
            placeholder="Dificultad"
            value={formData.difficulty}
            onChange={isReadOnly ? undefined : handleInputChange}
            options={['Baja', 'Media', 'Alta']}
            isReadOnly={isReadOnly}
          />
          <TicketSelect
            name="status"
            placeholder="Estado"
            value={formData.status}
            onChange={isReadOnly ? undefined : handleInputChange}
            options={['Nuevo', 'Iniciado', 'Cerrado']}
            isReadOnly={isReadOnly}
          />
          {formData.gif && (
            <Box marginBottom="2">
              <Image src={formData.gif} alt="Selected GIF" boxSize="100px" />
            </Box>
          )}
        </Box>
      </Box>

      {!isReadOnly && (
        <>
          <Button colorScheme="teal" type="submit">
            {ticket ? 'Actualizar Ticket' : 'Crear Ticket'}
          </Button>
          {ticket && (
            <Button colorScheme="red" onClick={handleDelete} marginLeft="4">
              Eliminar Ticket
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default TicketForm;
