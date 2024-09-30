import React from 'react';
import { Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import TicketForm from '../TicketForm/TicketForm';
import ticketIcon from '../../assets/icons/ticket-icon.png'; // Asegúrate de que la ruta sea correcta

const TicketModal = ({ isOpen, onClose, ticket, isReadOnly }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width="110vh" maxWidth="110vh">
        <ModalHeader display="flex" alignItems="center">
          <Image 
            src={ticketIcon} 
            alt="Ticket Icon" 
            width="30px"
            height="20px"
            marginRight="8px"
          />
          {isReadOnly ? 'Detalles del Ticket' : 'NUEVO TICKET'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TicketForm onClose={onClose} ticket={ticket} isReadOnly={isReadOnly} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TicketModal;
