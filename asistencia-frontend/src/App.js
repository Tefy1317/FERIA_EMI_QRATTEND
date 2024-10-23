import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Registro from './Registro';
import Control from './Control';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>QRATTEND</h1>
        <nav>
          <Link to="/" className="nav-button">Registro de Asistencia</Link>
          <Link to="/control" className="nav-button">Control de Asistencia</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Registro />} />
          <Route path="/control" element={<Control />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
