import React, { useState } from 'react';
import { crearHuesped } from '../services/huespedService';

const CrearHuesped = () => {
  const [nombre, setNombre] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [acompanantes, setAcompanantes] = useState(0);
  const [mensajeExito, setMensajeExito] = useState('');

  const handleCrearHuesped = async () => {
    const huespedData = {
      nombre,
      checkIn,
      checkOut,
      acompanantes,
    };
    await crearHuesped(huespedData);
    setNombre('');
    setCheckIn('');
    setCheckOut('');
    setAcompanantes(0);
    setMensajeExito('Huésped creado con éxito');

    // Oculta el mensaje después de 3 segundos
    setTimeout(() => {
      setMensajeExito('');
    }, 3000);
  };

  return (
    <div>
      <h2>Crear Huésped</h2>
      {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
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
