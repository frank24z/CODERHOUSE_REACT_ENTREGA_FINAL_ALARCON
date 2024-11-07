import { db } from '../config/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const logDev = (message) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
};

export const crearHuesped = async (huespedData) => {
  try {
    const docRef = await addDoc(collection(db, "huespedes"), huespedData);
    logDev("Huésped creado con éxito");
    return { id: docRef.id, ...huespedData }; 
  } catch (error) {
    console.error("Error al crear el huésped:", error);
    return null; 
  }
};

export const obtenerHuespedes = async () => {
  try {
    const snapshot = await getDocs(collection(db, "huespedes"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener huéspedes:", error);
    return []; 
  }
};


export const actualizarHuesped = async (id, nuevosDatos) => {
  try {
    const docRef = doc(db, "huespedes", id);
    await updateDoc(docRef, nuevosDatos);
    logDev("Huésped actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el huésped:", error);
  }
};

export const eliminarHuesped = async (id) => {
  try {
    const docRef = doc(db, "huespedes", id);
    await deleteDoc(docRef);
    logDev("Huésped eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar el huésped:", error);
  }
};
