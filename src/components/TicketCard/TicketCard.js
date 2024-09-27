import React from 'react';
import { Card, CardHeader, CardBody, Text, CardFooter } from '@chakra-ui/react';
import ticketIcon from '../../assets/icons/ticket-icon.png';

const TicketCard = ({ title, value }) => {
  return (
    <Card height={'max-content'} display="flex" alignItems="center">
      <CardHeader
        height="max-content" 
        display="flex" 
        alignItems="center"
        pb={0} // Sin padding en la parte inferior
      >
        <img 
          src={ticketIcon} 
          alt="Ticket Icon" 
          style={{ width: '100px', height: 'auto' }} 
        />
      </CardHeader>
      <CardBody flex={0} p={0} mt="calc(var(--chakra-space-4) * -2)"> {/* Usando calc para el margen superior */}
        <Text fontSize="8em" textAlign="center">{value}</Text> {/* Centra el texto si es necesario */}
      </CardBody>
      <CardFooter pb="10px" pt={0} fontSize={25}>{title}</CardFooter>
    </Card>
  );
};

export default TicketCard;
