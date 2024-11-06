import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CrearHabitacion from "./CrearHabitacion";
import CrearHuesped from "./CrearHuesped";
import Navbar from "./Navbar";
import { obtenerHabitaciones } from "../services/habitacionService";
import { obtenerHuespedes } from "../services/huespedService";
import limpiaLibre from "../assets/limpia+libre.webp";
import limpiaOcupada from "../assets/limpia+ocupada.webp";
import suciaLibre from "../assets/sucia+libre.webp";
import suciaOcupada from "../assets/sucia+ocupada.webp";
import "./../index.css";

const obtenerImagenEstado = (estado) => {
  switch (estado) {
    case "Limpia + Libre":
      return limpiaLibre;
    case "Limpia + Ocupada":
      return limpiaOcupada;
    case "Sucia + Libre":
      return suciaLibre;
    case "Sucia + Ocupada":
      return suciaOcupada;
    default:
      return limpiaLibre;
  }
};

const HuespedCard = ({ huesped }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "HUESPED",
    item: huesped,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const convertirTimestamp = (timestamp) => {
    if (timestamp && typeof timestamp.toDate === "function") {
      return timestamp.toDate().toLocaleDateString();
    }
    return timestamp ? timestamp.toString() : "";
  };

  return (
    <div ref={drag} className="huesped-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <p>Nombre: {huesped.nombre}</p>
      <p>Check-In: {convertirTimestamp(huesped.checkIn)}</p>
      <p>Check-Out: {convertirTimestamp(huesped.checkOut)}</p>
      <p>Acompañantes: {huesped.acompanantes}</p>
    </div>
  );
};

const HabitacionCard = ({ habitacion, index, onDropHuesped, setHabitaciones }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "HUESPED",
    drop: (item) => onDropHuesped(item, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="habitacion-card" style={{ borderColor: isOver ? "green" : "transparent" }}>
      <div className="estado-imagen-container">
        <img src={obtenerImagenEstado(habitacion.estado)} alt={`Estado ${habitacion.estado}`} className="estado-imagen" />
      </div>
      <div className="info-habitacion">
        <p>Número: {habitacion.numeroID}</p>
        <p>Tipo: {habitacion.tipo}</p>
        <p>Estado: {habitacion.estado}</p>
        {habitacion.huesped && (
          <div className="huesped-en-habitacion">
            <p>Huésped: {habitacion.huesped.nombre}</p>
          </div>
        )}
        <select
          value={habitacion.estado}
          onChange={(e) =>
            setHabitaciones((prev) =>
              prev.map((h, i) => (i === index ? { ...h, estado: e.target.value } : h))
            )
          }
        >
          <option value="Limpia + Libre">Limpia + Libre</option>
          <option value="Limpia + Ocupada">Limpia + Ocupada</option>
          <option value="Sucia + Libre">Sucia + Libre</option>
          <option value="Sucia + Ocupada">Sucia + Ocupada</option>
        </select>
        {habitacion.huesped && (
          <button onClick={() => onDropHuesped(null, index)}>Check-out</button>
        )}
      </div>
    </div>
  );
  
};

function Home({ usuario, nombreHotel, onLogout, vista = "todo", setVista }) {
  const [habitaciones, setHabitaciones] = useState([]);
  const [huespedes, setHuespedes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const habs = await obtenerHabitaciones();
      const huesps = await obtenerHuespedes();
      setHabitaciones(habs);
      setHuespedes(huesps);
    };
    fetchData();
  }, []);

  const onDropHuesped = (huesped, habitacionIndex) => {
    if (huesped) {
      setHuespedes((prev) => prev.filter((h) => h.nombre !== huesped.nombre));
      setHabitaciones((prev) =>
        prev.map((h, i) =>
          i === habitacionIndex ? { ...h, estado: "Limpia + Ocupada", huesped } : h
        )
      );
    } else {
      setHabitaciones((prev) =>
        prev.map((h, i) =>
          i === habitacionIndex ? { ...h, estado: "Sucia + Libre", huesped: null } : h
        )
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar usuario={usuario} nombreHotel={nombreHotel} onLogout={onLogout} setVista={setVista} />
      <div className="home-container">
        {vista === "todo" && (
          <div className="sidebar-container">
            <CrearHabitacion setHabitaciones={setHabitaciones} />
            <CrearHuesped setHuespedes={setHuespedes} />
          </div>
        )}
        {(vista === "todo" || vista === "habitaciones") && (
          <div className="habitaciones-container">
            <h2>Habitaciones</h2>
            {habitaciones.map((habitacion, index) => (
              <HabitacionCard
                key={index}
                habitacion={habitacion}
                index={index}
                onDropHuesped={onDropHuesped}
                setHabitaciones={setHabitaciones}
              />
            ))}
          </div>
        )}
        {(vista === "todo" || vista === "huespedes") && (
          <div className="huespedes-container">
            <h2>Huéspedes</h2>
            {huespedes.map((huesped, index) => (
              <HuespedCard key={index} huesped={huesped} />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default Home;
