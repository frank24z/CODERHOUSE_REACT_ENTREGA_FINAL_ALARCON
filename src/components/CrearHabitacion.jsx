import React, { useState, useEffect } from 'react';
import { crearHabitacion, obtenerHabitaciones } from '../services/habitacionService';

const CrearHabitacion = ({ setHabitaciones }) => {
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('Single');
  const [estado] = useState('Limpia + Libre');
  const [mensaje, setMensaje] = useState('');
  const [habitaciones, setHabitacionesLocales] = useState([]);

  useEffect(() => {
    const fetchHabitaciones = async () => {
      const data = await obtenerHabitaciones();
      setHabitacionesLocales(data);
    };
    fetchHabitaciones();
  }, []);

  const handleCrearHabitacion = async () => {
    if (!numero) {
      setMensaje('Por favor ingresa un número de habitación.');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    if (habitaciones.some(h => h.numeroID === numero)) {
      setMensaje('El número de habitación ya existe.');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    const habitacionData = {
      numeroID: numero,
      tipo,
      estado,
    };

    const nuevaHabitacion = await crearHabitacion(habitacionData);
    if (nuevaHabitacion) {
      setHabitacionesLocales((prev) => [...prev, nuevaHabitacion]);
      setHabitaciones((prev) => [...prev, nuevaHabitacion]); // Actualizar el estado principal
      setMensaje('Habitación creada con éxito.');
    } else {
      setMensaje('Error al crear la habitación.');
    }
    
    setNumero('');
    setTipo('Single');
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div>
      <h2>Crear Habitación</h2>
      {mensaje && <div className="mensaje">{mensaje}</div>}
      <input
        type="text"
        placeholder="Número"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="Single">Single</option>
        <option value="Doble">Doble</option>
        <option value="Suite">Suite</option>
      </select>
      <button onClick={handleCrearHabitacion}>Agregar Habitación</button>
    </div>
  );
};

export default CrearHabitacion;
