import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CrearHotel = ({ onCrearHotel }) => {
  const [nombreHotel, setNombreHotel] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCrearHotel = () => {
    if (!nombreHotel.trim()) {
      setError('Debe ingresar el nombre del hotel.');
      return;
    }
    setError('');
    onCrearHotel(nombreHotel.trim());
    navigate('/home');
  };

  return (
    <div className="card-container">
      <h2>Crear Hotel</h2>
      <input
        type="text"
        placeholder="Nombre del hotel"
        value={nombreHotel}
        onChange={(e) => setNombreHotel(e.target.value)}
      />
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleCrearHotel}>Crear Hotel</button>
    </div>
  );
};

export default CrearHotel;
