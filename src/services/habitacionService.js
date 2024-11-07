import { db } from '../config/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const logDev = (message) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
};

export const crearHabitacion = async (habitacionData) => {
  try {
    const docRef = await addDoc(collection(db, "habitaciones"), habitacionData);
    logDev("Habitación creada con éxito");
    return { id: docRef.id, ...habitacionData }; 
  } catch (error) {
    console.error("Error al crear la habitación:", error);
    return null; 
  }
};

export const obtenerHabitaciones = async () => {
  try {
    const snapshot = await getDocs(collection(db, "habitaciones"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    return []; 
  }
};


export const actualizarHabitacion = async (id, nuevosDatos) => {
  try {
    const docRef = doc(db, "habitaciones", id);
    await updateDoc(docRef, nuevosDatos);
    logDev("Habitación actualizada con éxito");
  } catch (error) {
    console.error("Error al actualizar la habitación:", error);
  }
};

export const eliminarHabitacion = async (id) => {
  try {
    const docRef = doc(db, "habitaciones", id);
    await deleteDoc(docRef);
    logDev("Habitación eliminada con éxito");
  } catch (error) {
    console.error("Error al eliminar la habitación:", error);
  }
};
