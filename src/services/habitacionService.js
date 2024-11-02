// src/services/habitacionService.js
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Crear una nueva habitación
export const crearHabitacion = async (habitacionData) => {
  try {
    await addDoc(collection(db, "habitaciones"), habitacionData);
    console.log("Habitación creada con éxito");
  } catch (error) {
    console.error("Error al crear la habitación:", error);
  }
};

// Obtener todas las habitaciones
export const obtenerHabitaciones = async () => {
  const snapshot = await getDocs(collection(db, "habitaciones"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Actualizar una habitación
export const actualizarHabitacion = async (id, nuevosDatos) => {
  try {
    const docRef = doc(db, "habitaciones", id);
    await updateDoc(docRef, nuevosDatos);
    //console.log("Habitación actualizada con éxito");
  } catch (error) {
    //console.error("Error al actualizar la habitación:", error);
  }
};

// Eliminar una habitación
export const eliminarHabitacion = async (id) => {
  try {
    const docRef = doc(db, "habitaciones", id);
    await deleteDoc(docRef);
   // console.log("Habitación eliminada con éxito");
  } catch (error) {
    //console.error("Error al eliminar la habitación:", error);
  }
};
