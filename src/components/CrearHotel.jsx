import React, { useState } from 'react';

function CrearHotel({ onCrearHotel }) {
  const [nombreHotel, setNombreHotel] = useState('');
  const [error, setError] = useState('');

  const manejarCrearHotel = () => {
    if (!nombreHotel) {
      setError('Debe ingresar el nombre del hotel.');
      return;
    }
    setError('');
    onCrearHotel(nombreHotel);
  };

  return (
    <div className="card-container">
      <h2>Crear Hotel</h2>
      <input
        type="text"
        placeholder="Nombre del Hotel"
        value={nombreHotel}
        onChange={(e) => setNombreHotel(e.target.value)}
      />
      {error && <div className="error-message">{error}</div>}
      <button onClick={manejarCrearHotel}>Crear</button>
    </div>
  );
}

export default CrearHotel;
