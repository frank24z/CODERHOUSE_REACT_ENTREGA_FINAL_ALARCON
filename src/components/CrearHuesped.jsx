import React, { useState } from 'react';
import { crearHuesped } from '../services/huespedService';

const CrearHuesped = () => {
  const [nombre, setNombre] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [acompanantes, setAcompanantes] = useState(0);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const handleCrearHuesped = async () => {
    if (nombre.trim() === '') {
      setMensajeError('El nombre del huésped es obligatorio.');
      setTimeout(() => setMensajeError(''), 3000);
      return;
    }
    if (acompanantes < 0 || acompanantes > 10) {
      setMensajeError('El número de acompañantes debe estar entre 0 y 10.');
      setTimeout(() => setMensajeError(''), 3000);
      return;
    }

    const huespedData = {
      nombre,
      checkIn,
      checkOut,
      acompanantes,
    };

    const result = await crearHuesped(huespedData);
    if (result) {
      setNombre('');
      setCheckIn('');
      setCheckOut('');
      setAcompanantes(0);
      setMensajeExito('Huésped creado con éxito');

      setTimeout(() => {
        setMensajeExito('');
      }, 3000);
    } else {
      setMensajeError('Error al crear el huésped.');
      setTimeout(() => setMensajeError(''), 3000);
    }
  };

  return (
    <div>
      <h2>Crear Huésped</h2>
      {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
      {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
      <input
        type="text"
        placeholder="Nombre del huésped"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />
      <input
        type="number"
        placeholder="Acompañantes"
        value={acompanantes}
        onChange={(e) => setAcompanantes(Number(e.target.value))}
        min="0"
        max="10"
      />
      <button onClick={handleCrearHuesped}>Agregar Huésped</button>
    </div>
  );
};

export default CrearHuesped;
