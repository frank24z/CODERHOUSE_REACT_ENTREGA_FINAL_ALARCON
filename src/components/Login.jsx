import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin, usuarioGuardado }) {
  const [nombre, setNombre] = useState(usuarioGuardado || '');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioGuardado) {
      setNombre(usuarioGuardado);
    }
  }, [usuarioGuardado]);

  const manejarLogin = () => {
    if (!nombre.trim()) {
      setError('Debe ingresar su nombre.');
      return;
    }
    setError('');
    onLogin(nombre.trim());
    navigate('/crear-hotel'); 
  };

  return (
    <div className="card-container">
      <h2>Usuario</h2>
      <input
        type="text"
        placeholder="Ingrese su nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      {error && <div className="error-message">{error}</div>}
      <button onClick={manejarLogin}>Ingresar</button>
    </div>
  );
}

export default Login;
