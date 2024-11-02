// src/services/huespedService.js
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Crear un nuevo huésped
export const crearHuesped = async (huespedData) => {
  try {
    await addDoc(collection(db, "huespedes"), huespedData);
    console.log("Huésped creado con éxito");
  } catch (error) {
    console.error("Error al crear el huésped:", error);
  }
};

// Obtener todos los huéspedes
export const obtenerHuespedes = async () => {
  const snapshot = await getDocs(collection(db, "huespedes"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Actualizar un huésped
export const actualizarHuesped = async (id, nuevosDatos) => {
  try {
    const docRef = doc(db, "huespedes", id);
    await updateDoc(docRef, nuevosDatos);
    console.log("Huésped actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el huésped:", error);
  }
};

// Eliminar un huésped
export const eliminarHuesped = async (id) => {
  try {
    const docRef = doc(db, "huespedes", id);
    await deleteDoc(docRef);
    console.log("Huésped eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar el huésped:", error);
  }
};
