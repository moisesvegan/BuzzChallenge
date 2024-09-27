import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import TicketForm from '../TicketForm/TicketForm';

const TicketModal = ({ isOpen, onClose, ticket, isReadOnly }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width="130vh" maxWidth="130vh" height="60vh">
        <ModalHeader>{isReadOnly ? 'Detalles del Ticket' : 'Crear Nuevo Ticket'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TicketForm onClose={onClose} ticket={ticket} isReadOnly={isReadOnly} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TicketModal;
