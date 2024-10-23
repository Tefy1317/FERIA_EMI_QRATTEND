// src/Registro.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [dpi, setDpi] = useState('');
  const [foto, setFoto] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [errorLocation, setErrorLocation] = useState('');

  const referenciaLat = 14.587836;
  const referenciaLon = -90.5532401;
  const maxDistance = 50;

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
          if (isInRange(lat, lon, referenciaLat, referenciaLon, maxDistance)) {
            setErrorLocation('');
          } else {
            setErrorLocation('Estás fuera del área permitida para registrar asistencia.');
          }
        },
        (error) => {
          setErrorLocation('No pudimos obtener tu ubicación.');
        }
      );
    } else {
      setErrorLocation('Tu navegador no soporta la geolocalización.');
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const isInRange = (lat1, lon1, lat2, lon2, maxDistance) => {
    return getDistance(lat1, lon1, lat2, lon2) <= maxDistance;
  };

  const enviarAsistencia = async (e) => {
    e.preventDefault();

    if (errorLocation) {
      alert('No puedes registrar asistencia: ' + errorLocation);
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('carnet', carnet);
    formData.append('dpi', dpi);
    formData.append('foto', foto);
    formData.append('latitud', location.lat);
    formData.append('longitud', location.lon);

    try {
      const response = await axios.post('http://localhost:5000/asistencia', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Asistencia registrada: ' + response.data.status);
    } catch (error) {
      alert('Hubo un error al registrar la asistencia');
    }
  };

  return (
    <div className="container">
      <h1>QRATTEND</h1>
      <p>Aplicación web para la asistencia</p>
      <form onSubmit={enviarAsistencia}>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Carnet"
          value={carnet}
          onChange={(e) => setCarnet(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="DPI"
          value={dpi}
          onChange={(e) => setDpi(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setFoto(e.target.files[0])}
          required
        />
        <button type="button" onClick={getLocation}>Obtener ubicación</button>
        <button type="submit">Enviar</button>
        <p>Latitud: {location.lat}</p>
        <p>Longitud: {location.lon}</p>
        {errorLocation && <p className="error-message">{errorLocation}</p>}
      </form>
    </div>
  );
}

export default Registro;
