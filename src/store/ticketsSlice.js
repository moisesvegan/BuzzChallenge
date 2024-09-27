import { createSlice } from '@reduxjs/toolkit';

const loadTicketsFromLocalStorage = () => {
  const storedTickets = localStorage.getItem('tickets');
  return storedTickets ? JSON.parse(storedTickets) : [];
};

const saveTicketsToLocalStorage = (tickets) => {
  localStorage.setItem('tickets', JSON.stringify(tickets));
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: loadTicketsFromLocalStorage(), // Cargar tickets desde localStorage
  reducers: {
    addTicket: (state, action) => {
      const existingIndex = state.findIndex(ticket => ticket.id === action.payload.id);
      if (existingIndex >= 0) {
        state[existingIndex] = action.payload; // Actualiza el ticket si ya existe
      } else {
        state.push(action.payload); // Agrega un nuevo ticket
      }
      saveTicketsToLocalStorage(state); // Guardar en localStorage
    },
    deleteTicket: (state, action) => {
      const newState = state.filter(ticket => ticket.id !== action.payload);
      saveTicketsToLocalStorage(newState); // Guardar en localStorage
      return newState;
    },
  },
});

export const { addTicket, deleteTicket } = ticketsSlice.actions;

export default ticketsSlice.reducer;
