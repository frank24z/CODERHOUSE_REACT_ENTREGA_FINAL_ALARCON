import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Login from "./components/Login";
import CrearHotel from "./components/CrearHotel";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  const [usuario, setUsuario] = useState(() => sessionStorage.getItem("usuario") || "");
  const [nombreHotel, setNombreHotel] = useState(() => sessionStorage.getItem("nombreHotel") || "");
  const [vista, setVista] = useState("todo");

  useEffect(() => {
    if (usuario) sessionStorage.setItem("usuario", usuario);
    if (nombreHotel) sessionStorage.setItem("nombreHotel", nombreHotel);
  }, [usuario, nombreHotel]);

  const manejarLogin = (nombre) => {
    setUsuario(nombre);
    sessionStorage.setItem("usuario", nombre);
  };

  const manejarCrearHotel = (hotel) => {
    setNombreHotel(hotel);
    sessionStorage.setItem("nombreHotel", hotel);
  };

  const handleLogout = () => {
    setUsuario("");
    setNombreHotel("");
    sessionStorage.clear();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        {usuario && nombreHotel && (
          <Navbar
            usuario={usuario}
            nombreHotel={nombreHotel}
            onLogout={handleLogout}
            setVista={setVista}
          />
        )}
        <Routes>
          <Route
            path="/login"
            element={
              usuario ? (
                <Navigate to={nombreHotel ? "/home" : "/crear-hotel"} replace />
              ) : (
                <Login onLogin={manejarLogin} />
              )
            }
          />
          <Route
            path="/crear-hotel"
            element={
              usuario && !nombreHotel ? (
                <CrearHotel onCrearHotel={manejarCrearHotel} />
              ) : (
                <Navigate to={nombreHotel ? "/home" : "/login"} replace />
              )
            }
          />
          <Route
            path="/home"
            element={
              usuario && nombreHotel ? (
                <Home
                  usuario={usuario}
                  nombreHotel={nombreHotel}
                  onLogout={handleLogout}
                  vista={vista}
                  setVista={setVista}
                />
              ) : (
                <Navigate to={usuario ? "/crear-hotel" : "/login"} replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
