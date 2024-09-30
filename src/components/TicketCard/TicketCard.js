import React from 'react';
import { Card, CardHeader, CardBody, Text, CardFooter } from '@chakra-ui/react';
import ticketIcon from '../../assets/icons/ticket-icon.png';

const TicketCard = ({ title, value }) => (
  <Card
    height="max-content"
    display="flex"
    alignItems="center"
    bg="white"
    boxShadow="lg"
    borderRadius="md"
    border="1px solid"
    borderColor="gray.200"
    p="6"
  >
    <CardHeader display="flex" alignItems="center" justifyContent="center" pb={0}>
      <img src={ticketIcon} alt="Ticket Icon" style={{ width: '60px', height: 'auto' }} />
    </CardHeader>
    <CardBody flex={0} p={0} mt="-10px">
      <Text fontSize="5xl" fontWeight="bold" textAlign="center" color="gray.800">
        {value}
      </Text>
    </CardBody>
    <CardFooter pb="10px" pt={0} fontSize="lg" textAlign="center" color="gray.600">
      {title}
    </CardFooter>
  </Card>
);

export default TicketCard;
