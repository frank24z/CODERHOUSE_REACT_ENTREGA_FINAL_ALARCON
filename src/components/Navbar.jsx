import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import hotelLogo from "../assets/logo.png";

function Navbar({ usuario, nombreHotel, onLogout, setVista }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/home" onClick={() => setVista("todo")}>
          <img src={hotelLogo} alt="Logo Hotel" className="navbar-logo-img" />
        </Link>
        <span>{nombreHotel}</span>
      </div>
      <div className="navbar-right">
        <button className="btn-habitaciones" onClick={() => setVista("habitaciones")}>
          Habitaciones
        </button>
        <button className="btn-huespedes" onClick={() => setVista("huespedes")}>
          Huéspedes
        </button>
        <span>Bienvenido, {usuario}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Salir
        </button>
      </div>
    </div>
  );
}

export default Navbar;
