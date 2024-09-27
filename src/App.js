import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tickets from './pages/Tickets'; // Importar componente de Tickets
import Login from './pages/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Home onLogout={handleLogout} />} />
            <Route path='/tickets' element={<Tickets />} /> {/* Ruta para Tickets */}
          </>
        ) : (
          <Route path='*' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
