import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Control() {
  const [asistentes, setAsistentes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/asistencia')
      .then(response => {
        setAsistentes(response.data); 
      })
      .catch(error => {
        console.error('Error obteniendo la lista de asistentes:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Control de Asistencia</h1>
      <p>Total de asistentes: {asistentes.length}</p>
      <ul>
        {asistentes.map((asistente, index) => (
          <li key={index}>
            <p><strong>Nombre:</strong> {asistente.nombre}</p>
            <p><strong>Carnet:</strong> {asistente.carnet}</p>
            <p><strong>DPI:</strong> {asistente.dpi}</p>
            <p><strong>Latitud:</strong> {asistente.latitud}</p>
            <p><strong>Longitud:</strong> {asistente.longitud}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Control;
