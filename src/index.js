import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './store/ticketsSlice';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';


const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
);
